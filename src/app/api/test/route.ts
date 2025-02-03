import { sendNewOrderEmail } from "@/lib/mail";

export async function POST(request: Request) {

    const { id } = await request.json()
    await sendNewOrderEmail(id)
    return new Response(JSON.stringify({ message: "sent" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });


}