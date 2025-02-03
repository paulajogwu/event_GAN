import { craftEventPlan } from "@/lib/open_ai";
import { craftEventSchema } from "@/trpc/api/routers/ai/schema";
import { z } from "zod";

export async function POST(request: Request) {
    const { prompt } = await request.json() as { prompt: z.infer<typeof craftEventSchema> };

    try {
        const plan = await craftEventPlan(prompt);
        return new Response(JSON.stringify(plan), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to generate event plan' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}