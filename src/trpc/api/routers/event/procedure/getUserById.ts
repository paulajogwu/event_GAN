import { db } from "@/server/db";
import { publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const getUserIdByEmail = publicProcedure
    .input(z.string().email()) // Input validation with zod
    .query(async ({ input }) => {
        const user = await db.user.findUnique({
            where: {
                email: input, // Find the user by email
            },
            select: {
                id: true, // Only select the id
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user.id; // Return user ID
    })

