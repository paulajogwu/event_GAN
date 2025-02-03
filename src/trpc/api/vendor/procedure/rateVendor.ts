import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const rateVendorProcedure = protectedProcedure
    .input(z.object({
        vendorId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
        const { vendorId, rating, comment } = input;
        const userId = ctx.session.user.id;

        // Create or update the rating
        const newRating = await ctx.db.rating.upsert({
            where: {
                vendorId_userId: {
                    vendorId,
                    userId,
                },
            },
            update: {
                rating,
                comment,
            },
            create: {
                vendorId,
                userId,
                rating,
                comment,
            },
        });

        // Update vendor's average rating
        const allRatings = await ctx.db.rating.findMany({
            where: { vendorId },
            select: { rating: true },
        });

        const averageRating = allRatings.reduce((acc, curr) => acc + curr.rating, 0) / allRatings.length;

        await ctx.db.vendor.update({
            where: { id: vendorId },
            data: {
                averageRating,
                totalRatings: allRatings.length,
            },
        });

        return newRating;
    })
