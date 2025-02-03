import { AvailabilitySchema } from "@/trpc/api/vendor/types";
import { Prisma } from "@prisma/client";


export const availabilityValidator = {
    validate: (value: unknown) => {
        try {
            AvailabilitySchema.parse(value);
            return true;
        } catch (error) {
            console.error("Availability validation failed:", error);
            return false;
        }
    },
};
