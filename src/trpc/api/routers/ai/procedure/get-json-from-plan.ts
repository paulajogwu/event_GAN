
import { publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";
import { generateServicesJson } from "@/lib/open_ai";

export const getJsonFromPlanProcedure = publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
        const providers = await generateServicesJson(input);
        console.log(providers);
        return {
            success: true,
            providers: providers,
            message:
                `${providers.length} Provider(s) recommended`,
        };
    });


