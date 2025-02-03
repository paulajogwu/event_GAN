import { protectedProcedure } from "@/trpc/api/trpc";
import { ZSignupVendorMutationSchema } from "../types";
import { PricingModel, VendorCategory } from "@prisma/client";

export const submitVendorOnboardingProcedure = protectedProcedure
  .input(ZSignupVendorMutationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    // Create the vendor
    const newVendor = await ctx.db.vendor.create({
      data: {
        id: userId, // Assuming you're using the user ID for the vendor ID
        businessName: input?.businessName,
        category: input?.category as VendorCategory,
        description: input?.description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log("newVendor", newVendor);
    return {
      success: true,
      message: "Vendor created successfully.",
    };
  });
