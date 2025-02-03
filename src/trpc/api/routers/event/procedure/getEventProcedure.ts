import { getEventById, getServicesByEventId, getServicesByEventIdWithVendor, getVendorEventById } from "@/server/event";
import { protectedProcedure, publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const getEventProcedure = publicProcedure
    .input(z.string().describe("Event ID"))
    .query(async ({ input }) => {
        const event = await getEventById(input)
        return {
            success: true,
            event
        };
    });

export const getVendorEventProcedure = publicProcedure
    .input(z.string().describe("Event ID"))
    .query(async ({ input, ctx }) => {
        const vendor = await ctx.db.vendor.findFirst({
            where: {
                userId: ctx.session?.user.id
            }
        });

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        const { event, services } = await getVendorEventById(input, vendor.id)
        return {
            success: true,
            event,
            services
        };
    });

// procedure to accept or reject an eventService
export const acceptOrRejectEventServiceProcedure = protectedProcedure
    .input(z.object({
        eventServiceId: z.string().describe("Event Service ID"),
        status: z.enum(["ACCEPTED", "REJECTED", "COMPLETED"]).describe("Status")
    }))
    .mutation(async ({ input, ctx }) => {
        const eventService = await ctx.db.eventService.update({
            where: {
                id: input.eventServiceId
            },
            data: {
                status: input.status
            }
        });

        return eventService
    });

export const getDisputedEventServiceProcedure = protectedProcedure
    .input(z.object({
        eventId: z.string().describe("Event ID")
    }))
    .query(async ({ input, ctx }) => {
        const eventService = await ctx.db.eventService.findMany({
            where: {
                eventId: input.eventId,
                status: "REJECTED"
            },
            include: {
                service: true
            }
        });

        return eventService
    });

export const getServiceListProcedure = protectedProcedure
    .input(z.string().describe("Event ID"))
    .query(async ({ input }) => {
        const services = await getServicesByEventId(input)
        return {
            success: true,
            services
        };
    });

export const getServiceListWithVendorProcedure = protectedProcedure
    .input(z.string().describe("Event ID"))
    .query(async ({ input }) => {
        const services = await getServicesByEventIdWithVendor(input)
        return {
            success: true,
            services
        };
    });
