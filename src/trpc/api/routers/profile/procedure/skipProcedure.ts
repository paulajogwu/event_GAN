import { protectedProcedure } from "@/trpc/api/trpc";


export const skipProcedure = protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.user.update({
        where: {
            id: ctx.session.user.id
        },
        data: {
            isNewUser: false
        }
    });

    return {
        success: true,
        message: "User updated successfully"
    };
});
