import { z } from "zod";

export const craftEventSchema = z.object({
    eventDescription: z
        .string()
        .min(3, { message: "Event must be at least 2 characters." }),
    // .max(13, { message: "Your event must be at most 13 characters." }),

    eventLocation: z.string().min(1, {
        message: "Location is required",
    }),
    eventType: z.string({
        message: "Please select an event.",
    }).optional(),
    budget: z.string().min(1, {
        message: "Please select a budget.",
    }),
    attendee: z.string().min(1, {
        message: "Please select an expected number of attendee.",
    }),
    eventLocationZip: z.string().min(1, {
        message: "Please select a zip code.",
    }),
    startDate: z.string(),
    endDate: z.string(),
});
