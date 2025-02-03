import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { readServices } from "@/server/service";
import { productCreationSchema, serviceCreationSchema } from "./Zschema";

export const getServicesByUserId = publicProcedure
    .input(z.string().describe("User ID"))
    .query(async ({ input }) => {
        const services = await readServices(input);
        console.log(services)
        return services
    });

export const readServicesByUserId = publicProcedure
    .input(z.string().describe("User ID"))
    .query(async ({ input }) => {
        const services = await readServices(input);
        console.log(services)
        return services
    });


export const createServiceMutation = protectedProcedure
    .input(serviceCreationSchema)
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        const vendor = await ctx.db.vendor.findUnique({
            where: {
                userId: userId
            },
            include: {
                user: {
                    select: {
                        state: true,
                        country: true,
                        zipCode: true
                    }
                }
            }
        });

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        // Generate a 24-digit UUID for embeddedLookupId
        const embeddedLookupId = crypto.randomUUID().replace(/-/g, '').slice(0, 24);

        // Create service with embedded server
        const response = await fetch(new URL("service", process.env.EMBEDDING_SERVER_URL).toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...input,
                embeddedLookupId: embeddedLookupId,
                vendorId: vendor.id,
                vendor: {
                    category: vendor.category,
                    state: vendor?.user.state,
                    country: vendor?.user.country,
                    zipCode: vendor?.user.zipCode
                }
            })
        });

        const service = await response.json();

        // Create service and its discounts in a transaction
        const createdService = await ctx.db.service.create({
            data: {
                name: input.name,
                price: parseFloat(input.price),
                pricingModel: input.pricingModel,
                embeddedLookupId,
                vendorId: vendor.id,
                tags: input.tags || [],
                discounts: {
                    create: input.discounts.map(discount => ({
                        type: discount.type,
                        threshold: discount.threshold ? parseFloat(discount.threshold) : null,
                        discount: parseFloat(discount.discount),
                        isPercentage: discount.isPercentage
                    }))
                }
            },
            include: {
                discounts: true
            }
        });

        await ctx.db.user.update({
            where: { id: userId },
            data: {
                onboardingStatus: "STEP_3",
            },
        });

        return {
            message: "Congratulations, your service has been submitted for review successfully",
            service: createdService
        };
    });

export const createProductMutation = protectedProcedure
    .input(productCreationSchema)
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        // Generate a 24-digit UUID for embeddedLookupId
        const embeddedLookupId = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
        const vendor = await ctx.db.vendor.findFirst({
            where: {
                userId: userId
            },
        })

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        await ctx.db.product.create({
            data: {
                ...input,
                embeddedLookupId: embeddedLookupId,
                vendorId: vendor.id,
                status: "PUBLIC"
            }
        })

        return {
            message: "Congratulations, your product has been submitted for review successfully"
        };
    });

export const getProductsByUserId = protectedProcedure
    .input(z.string().describe("User ID").optional())
    .query(async ({ ctx, input }) => {
        const userId = input ?? ctx.session.user.id;

        const vendor = await ctx.db.vendor.findFirst({
            where: {
                userId: userId
            },
        });

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        const products = await ctx.db.product.findMany({
            where: {
                vendorId: vendor.id
            },
        });

        return products;
    });


export const getVendorsbyEmbeddingLookupId = protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
        const vendors = await ctx.db.service.findMany({
            where: {
                embeddedLookupId: {
                    in: input
                }
            },
            include: {
                vendor: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                country: true,
                                state: true,
                                name: true
                            }
                        }
                    }
                },
            }
        });

        if (!vendors) {
            throw new Error("vendors not found");
        }

        return vendors;
    });


export const deleteEventService = protectedProcedure
    .input(z.object({
        eventId: z.string(),
        serviceId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const { eventId, serviceId } = input;

        const deletedEventService = await ctx.db.eventService.delete({
            where: {
                eventId_serviceId: {
                    eventId: eventId,
                    serviceId: serviceId
                }
            }
        });

        if (!deletedEventService) {
            throw new Error("EventService not found or already deleted");
        }

        return { success: true, message: "EventService deleted successfully" };
    });


export const countPendingEventServices = protectedProcedure
    .query(async ({ ctx }) => {
        const userId = ctx.session.user.id;

        const count = await ctx.db.eventService.count({
            where: {
                service: {
                    vendor: {
                        userId: userId
                    }
                },
                status: "PENDING"
            }
        });

        return count;
    });


export const servicesRouter = createTRPCRouter({
    getServicesByUserId,
    readServicesByUserId,
    createServiceMutation,
    createProductMutation,
    getProductsByUserId,
    getVendorsbyEmbeddingLookupId,
    deleteEventService,
    countPendingEventServices
})