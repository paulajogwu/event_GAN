import * as z from "zod";


export const EditPasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }) // Minimum length
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Uppercase letter
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Lowercase letter
            .regex(/\d/, { message: "Password must contain at least one number" }), // Number
        newPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" }) // Minimum length
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Uppercase letter
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Lowercase letter
            .regex(/\d/, { message: "Password must contain at least one number" }) // Number
            .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }), // Special character
        rptPassword: z.string().min(1, { message: "Please confirm your password" }), // Non-empty confirmation
    })
    .refine((data) => data.newPassword === data.rptPassword, {
        message: "Passwords do not match",
        path: ["rptPassword"], // Error will be displayed at rptPassword
    });
