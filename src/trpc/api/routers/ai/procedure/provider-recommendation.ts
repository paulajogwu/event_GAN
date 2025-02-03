
import { publicProcedure } from "@/trpc/api/trpc";

import { getServiceProviders } from "@/lib/astraDatabase";
import { z } from "zod";

export const providerRecommendationProcedure = publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
        const plan = await getServiceProviders(input);
        return {
            success: true,
            plan,
            message:
                `${plan.length} Provider(s) recommended`,
        };
    });


getServiceProviders