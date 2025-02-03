import { withServerSession } from "@/server/auth";
import { db } from "@/server/db";
import { stripe } from "@/server/stripe_init";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const session = await withServerSession()

        const { amount, eventId } = await request.json();


        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
            metadata: {
                email: session?.user?.email as string,
                eventId: eventId
            }
        });

        const payment = await db.payment.create({
            data: {
                amount: amount / 100,
                currency: "USD",
                transactionId: paymentIntent.id,
                booking: {
                    create: {
                        eventId: eventId,
                        status: 'PENDING',
                    }
                }
            }
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret, payment });
    } catch (error) {
        console.error("Internal Error:", error);
        // Handle other errors (e.g., network issues, parsing errors)
        return NextResponse.json(
            { error: `Internal Server Error: ${String(error)}` },
            { status: 500 }
        );
    }
}