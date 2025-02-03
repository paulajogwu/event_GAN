import { z } from "zod";
import { generatedEventSchema } from "@/lib/open_ai";

export const createEventSchema = z.object({
    eventDetails: generatedEventSchema.omit({
        id: true,

        serviceIDs: true,
    }),
    serviceLookupIds: z.array(z.string()),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
