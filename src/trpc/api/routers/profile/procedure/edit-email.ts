import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { protectedProcedure } from "@/trpc/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const updateEmailProcedure = protectedProcedure
  .input(
    z.object({
      email: z.string().email({ message: "Invalid email address" }),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { email } = input;
    const userId = ctx.session.user.id;
    const userExists = await ctx.db.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExists) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "User already exists",
      });
    }

    await ctx.db.user.update({
      where: { id: userId },
      data: { email },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token,
    );

    return {
      success: true,
      message: "Please check your email to verify your account",
    };
  });
