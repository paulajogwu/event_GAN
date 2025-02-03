import { getVendorByID, getVendorProfileByUserID } from "@/server/vendor";
import { protectedProcedure, publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const getVendorProcedure = publicProcedure
    .input(z.string().describe("Vendor By ID"))
    .query(async ({ input }) => {
        const vendor = await getVendorByID(input)
        return {
            success: true,
            vendor
        };
    });

export const getVendorProfileProcedure = protectedProcedure.input(z.string().describe("Vendor By ID")).query(async ({ input, ctx }) => {
    const vendor = await getVendorByID(input)
    return vendor;
});

export const getVendorProfileByUserIDProcedure = protectedProcedure.input(z.string().describe("Vendor By ID").optional()).query(async ({ input, ctx }) => {
    const vendor = await getVendorProfileByUserID(input ?? ctx.session?.user.id)
    return vendor;
});

export const updateVendorImagesProcedure = protectedProcedure.input(z.object({
    imageUrls: z.array(z.string()).describe("Vendor Images"),
})).mutation(async ({ input, ctx }) => {
    const db = ctx.db

    const existingVendor = await db.vendor.findUnique({
        where: {
            userId: ctx.session.user.id
        },
        select: {
            images: true
        }
    });

    const vendor = await db.vendor.update({
        where: {
            userId: ctx.session.user.id
        },
        data: {
            images: [...(existingVendor?.images ?? []), ...input.imageUrls]
        }
    });
    return vendor;
});

