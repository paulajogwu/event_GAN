import { publicProcedure } from "@/trpc/api/trpc";
import { craftEventSchema } from "../schema";
import { craftEventPlan, GeneratedEvent, GeneratedEventType } from "@/lib/open_ai";
import { getServiceProviders } from "@/mongodb";

export const craftEventPlanProcedure = publicProcedure
    .input(craftEventSchema)
    .mutation(async ({ input }) => {
        const startTime = performance.now();

        const plan = await craftEventPlan(input) as unknown as GeneratedEvent;
        const arrayPlan = Object.values(plan) as GeneratedEventType[]

        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Function execution time: ${executionTime} milliseconds`);

        const serviceStartTime = performance.now();
        const services = await getServiceProviders(JSON.stringify(arrayPlan));
        const serviceEndTime = performance.now();
        const serviceExecutionTime = serviceEndTime - serviceStartTime;
        console.log(`getServiceProviders execution time: ${serviceExecutionTime} milliseconds`);

        return {
            success: true,
            plan: arrayPlan,
            services,
            message:
                "Event plan generated successfully",
            executionTime: executionTime
        };
    });

