import { getServiceByLookupId, getServiceById } from "@/server/service";
import { protectedProcedure, publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const getServiceByLookupIdProcedure = publicProcedure
    .input(z.string().describe("Service ID"))
    .query(async ({ input }) => {
        const service = await getServiceByLookupId(input)
        return {
            success: true,
            service
        };
    });

export const getVendorServicesProcedure = protectedProcedure
    .input(z.object({
        vendorId: z.string().describe("Vendor ID"),
        showFullService: z.boolean().describe("Show full service").optional().default(false)
    }))
    .query(async ({ ctx, input }) => {
        const services = await ctx.db.service.findMany({
            where: {
                vendorId: input.vendorId
            },
            select: {
                id: true,
                name: true,
                price: input.showFullService,
                pricingModel: input.showFullService,
                status: input.showFullService,

            }
        });

        return {
            success: true,
            services
        };
    });


export const getServiceByIdProcedure = publicProcedure
    .input(z.string().describe("Service ID"))
    .query(async ({ input }) => {
        const service = await getServiceById(input)
        return {
            success: true,
            service
        };
    });

