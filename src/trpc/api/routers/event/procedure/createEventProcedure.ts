
import { createEventFromAi } from "@/server/event";
import { protectedProcedure } from "@/trpc/api/trpc";
import { createEventSchema } from "../schema";


export const createEventProcedure = protectedProcedure
    .input(createEventSchema)
    .mutation(async ({ input }) => {
        const event = await createEventFromAi(input);

        return ({
            result: event,
            success: true,
            message: "Event created successfully"
        })
    });
