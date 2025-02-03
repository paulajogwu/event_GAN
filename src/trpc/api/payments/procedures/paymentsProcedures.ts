import { confirmStripePayment, confirmPaymentAndBookEvent } from "@/server/stripe_init";
import { publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const confirmPaymentProcedure = publicProcedure
    .input(z.string().describe("payment intent id"))
    .query(async ({ input }) => {
        const confirmation = await confirmStripePayment(input)
        return confirmation;
    });

export const confirmPaymentAndBookProcedure = publicProcedure
    .input(z.string().describe("payment intent id"))
    .query(async ({ input }) => {
        const bookedConfirmation = await confirmPaymentAndBookEvent(input)
        return bookedConfirmation;
    });
