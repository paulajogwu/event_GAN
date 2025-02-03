import { z } from "zod";
import { ProductUncheckedCreateInputSchema, ServiceUncheckedCreateInputSchema } from "~/prisma/generated/zod";
import { DiscountType, PricingModel } from "@prisma/client";

export const createServiceSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 2 characters." })
            .max(50, { message: "Name must be leass than 50 characters." }),
        description: z
            .string()
            .min(3, { message: "description must be at least 3 characters." })
            .max(250, { message: "Keep this simple of 250 character" }),

        amount: z.string().min(1, { message: "This field is required" }),
        onRent: z.boolean(),
        isConsumable: z.boolean(),
    })

export const serviceCreationSchema = z.object({
    name: z.string().min(1, "Service name is required"),
    tags: z.array(z.string()).optional(),
    serviceType: z.enum(["Consumable", "Non-consumable"]),
    pricingModel: z.nativeEnum(PricingModel),
    price: z.string().refine((val) => !isNaN(parseFloat(val)), {
        message: "Price must be a valid number",
    }),
    discounts: z.array(
        z.object({
            type: z.nativeEnum(DiscountType),
            threshold: z.string().optional(),  // Optional for FLAT_RATE type
            discount: z.string().min(1, "Discount amount is required"),
            isPercentage: z.boolean()
        })
    ).default([])
});

// @ts-expect-error extend exists
export const productCreationSchema = ProductUncheckedCreateInputSchema.extend({
    price: z.coerce.number().min(1, "Price must be a positive number"),
}).omit({
    embeddedLookupId: true,
    vendorId: true,
    eventIDs: true,
    eventService: true,
    status: true,
});