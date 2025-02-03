import { z } from "zod";
import { VendorCategorySchema } from "~/prisma/generated/zod";

export const ZUpdateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  countryOfResidence: z.string(),
  stateOfResidence: z.string(),
  profilePhoto: z.string().nullable(),
});
export const ZVendorOnboardingSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  category: VendorCategorySchema,
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  description: z.string().min(1, "Description is required"),
});

export const ZEditPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
      }),

    rptPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.rptPassword, {
    message: "Passwords must match",
    path: ["rptPassword"], // Error path for the repeated password field
  });


export const ZUploadImageSchema = z.object({
  images: z
    .array(
      z.object({
        preview: z.string().url(),
      }),
    )
    .optional(),
});