import { ZUpdateProfileSchema } from "../schema";
import { protectedProcedure } from "@/trpc/api/trpc";

export const updateProfileProcedure = protectedProcedure
  .input(ZUpdateProfileSchema)
  .mutation(async ({ ctx, input }) => {
    const {
      firstName,
      lastName,
      countryOfResidence,
      stateOfResidence,
      profilePhoto,
    } = input;

    const userId = ctx.session.user.id;
    console.log("userId", userId);

    if (!userId) {
      throw new Error("User ID not found");
    }

    const updatedUser = await ctx.db.user.update({
      where: { id: userId },
      data: {
        name: `${firstName} ${lastName}`,
        country: countryOfResidence,
        state: stateOfResidence,
        image: profilePhoto,
      },
    });

    console.log("updatedUserrrrrr", updatedUser);
    return {
      success: true,
      message: "User profile updated successfully.",
    };
  });
