import { createTRPCRouter } from "../trpc";
import { confirmPaymentAndBookProcedure, confirmPaymentProcedure } from "./procedures/paymentsProcedures";

export const paymentRouter = createTRPCRouter({
    confirmPayment: confirmPaymentProcedure,
    confirmPaymentAndBook: confirmPaymentAndBookProcedure
})
