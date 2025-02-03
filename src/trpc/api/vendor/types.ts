import { z } from "zod";
const DaySchema = z.object({}).catchall(z.any());

export const AvailabilitySchema = z.object({
  days: z.object({
    Sundays: DaySchema,
    Mondays: DaySchema,
    Tuesdays: DaySchema,
    Wednesdays: DaySchema,
    Thursdays: DaySchema,
    Fridays: DaySchema,
    Saturdays: DaySchema,
  }),
  hours: z.tuple([z.number().min(0).max(23), z.number().min(0).max(23)]),
  meetingDurations: z.array(z.any()),
  tz: z.string().default("America/Tijuana"),
});

export type Availability = z.infer<typeof AvailabilitySchema>;

declare global {
  namespace PrismaJson {
    type AvailabilityMetaType = Availability;
  }
}

export const ZSignupVendorMutationSchema = z.object({
  businessName: z.string().min(1),
  category: z.string().min(1),
  selectCountry: z.string().min(1),
  state: z.string().min(1),
  price: z.string().min(1),
  description: z.string().min(1),
  priceModel: z.string().min(1),
  serviceName: z.string().min(1),
  consumable: z.boolean(),
  embeddedLookupId: z.string().min(1),
  onRent: z.boolean(),
  images: z
    .array(
      z.object({
        preview: z.string().url(),
      }),
    )
    .optional(),
});
