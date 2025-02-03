import { z } from "zod";

export const generatedEventSchema = z.object({
    description: z.string(),
    guestCount: z.number(),
    type: z.string(),
    location: z.string(),
})


export const serviceSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    pricingModel: z.enum(["FIXED_PRICE", "HOURLY_RATE", "PER_PERSON"]),
    embeddedLookupId: z.string(),
    status: z.enum(["DRAFT", "PUBLIC", "PRIVATE", "SCHEDULED", "ARCHIVED"]).default("PUBLIC"),
    vendorId: z.string(),
    isConsumable: z.boolean(),
    onRent: z.boolean(),
    tags: z.array(z.string()),
});


export const eventOutput = z.object({
    name: z.string(),
    description: z.string(),
    guestCount: z.number(),
    type: z.string(),
    totalPrice: z.number(),
    location: z.string(),
    services: z.array(serviceSchema),
    startDate: z.string(),
    endDate: z.string(),
})

export type EventOutput = z.infer<typeof eventOutput>

export const finalEventOutput = z.object({
    plans: z.array(eventOutput)
})

export type FinalEventOutput = z.infer<typeof finalEventOutput>



export const eventCostingSchema = z.object({ name: z.string().describe("event plan name"), services: z.array(serviceSchema).describe("services associated with a specific plan,") })
