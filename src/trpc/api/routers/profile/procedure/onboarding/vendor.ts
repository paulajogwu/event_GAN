
import { protectedProcedure } from "@/trpc/api/trpc";
import { ZUploadImageSchema, ZVendorOnboardingSchema } from "../../schema";

export const vendorOnboardingProcedure = protectedProcedure
    .input(ZVendorOnboardingSchema)
    .mutation(async ({ ctx, input }) => {
        const {
            businessName,
            category,
            country,
            state,
            description,
            zipCode,
        } = input;

        const userId = ctx.session.user.id;
        console.log("userId", userId);

        if (!userId) {
            throw new Error("User ID not found");
        }

        await ctx.db.vendor.upsert({
            where: { userId: userId },
            update: {
                businessName,
                category,
                description,
                user: {
                    update: {
                        country,
                        state,
                        zipCode,
                    }
                }
            },
            create: {
                businessName,
                category,
                description,

                user: {
                    create: {
                        country,
                        state,
                        zipCode,
                    }
                }
            }
        });

        ctx.db.user.update({
            where: { id: userId },
            data: {
                onboardingStatus: "STEP_2",
            },
        });

        return {
            success: true,
            message: "Profile updated successfully.",
        };
    });

// procedure to add images to vendor
export const vendorImageProcedure = protectedProcedure
    .input(ZUploadImageSchema)
    .mutation(async ({ ctx, input }) => {

        ctx.db.vendor.update({
            where: {
                userId: ctx.session.user.id,
            },
            data: {
                images: input.images?.map(({ preview }) => preview) ?? [],
            },
        });

        ctx.db.user.update({
            where: { id: ctx.session.user.id },
            data: {
                onboardingStatus: "COMPLETED",
            },
        });



        return {
            success: true,
            message: "Profile updated successfully.",
        };
    });