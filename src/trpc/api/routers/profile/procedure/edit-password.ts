import { protectedProcedure } from "@/trpc/api/trpc";
import bcrypt from "bcryptjs";
import { ZEditPasswordSchema } from "../schema";

export const editPasswordProcedure = protectedProcedure
  .input(ZEditPasswordSchema)
  .mutation(async ({ ctx, input }) => {
    const { newPassword, rptPassword } = input;
    const userId = ctx.session?.user?.id;

    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    if (newPassword !== rptPassword) {
      throw new Error("Passwords do not match.");
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await ctx.db.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Password updated successfully.",
    };
  });
