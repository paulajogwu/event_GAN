import { z } from "zod";
import { protectedProcedure } from "../../../trpc";

export const getVendorInfoAndServices = protectedProcedure
    .input(z.object({
        vendorId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const vendor = await ctx.db.vendor.findUnique({
            where: { id: input.vendorId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
                services: true,
            }
        });

        if (!vendor) {
            throw new Error("Vendor not found");
        }

        return {
            userInfo: vendor.user,
            services: vendor.services,
        };
    });
