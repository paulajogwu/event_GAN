import Stripe from 'stripe';
import { db } from './db';
import ServiceOrderEmail from '@/emails/vendors/ServiceOrderEmail';
import { sendNewOrderEmail } from '@/lib/mail';

export const stripe = new Stripe(process.env.STRIPE_SK ?? "");


export const confirmStripePayment = async (payment_intent: string) => {
    try {

        const intent = await stripe.paymentIntents.retrieve(payment_intent)

        return ({ status: intent.status, metadata: intent.metadata, amount: intent.amount });

    } catch (err) {
        console.log(err);
        throw err
    }
}

export const confirmPaymentAndBookEvent = async (payment_intent: string) => {
    try {

        const details = await confirmStripePayment(payment_intent);

        if (!details.metadata?.eventId) {
            return details
        }

        const event = await db.event.findFirstOrThrow({
            where: {
                id: details.metadata.eventId
            }
        });

        if (event.status !== "ONGOING") {
            return ({
                ...details,
                event,
                message: "Event has already been booked"
            })
        }

        await db.event.update({
            where: {
                id: event.id
            },
            data: {
                status: "ONGOING"
            }
        })

        sendNewOrderEmail(event)

        return ({
            ...details,
            event,
            message: "Event booked successfully"
        })



    } catch (err) {
        console.log(err);
        throw err
    }
}