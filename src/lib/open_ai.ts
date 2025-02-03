import { craftEventSchema } from '@/trpc/api/routers/ai/schema';
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";
const openAi = new OpenAI({
    apiKey: process.env.OpenAi_API_KEY,

});


export const generatedEventSchema = z.object({
    name: z.string(),
    description: z.string(),
    guestCount: z.number(),
    type: z.string(),
    totalPrice: z.number(),
    location: z.string(),
    id: z.string(),
    completionRate: z.string(),
    status: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    serviceIDs: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
        })
    ),
})

const generatedEventsSchema = z.object({ plan1: generatedEventSchema, plan2: generatedEventSchema, plan3: generatedEventSchema });

export type GeneratedEvent = z.infer<typeof generatedEventsSchema>
export type GeneratedEventType = z.infer<typeof generatedEventSchema>

export const craftEventPlan = async (prompt: z.infer<typeof craftEventSchema>) => {
    const eventPlanningPrompt = `${JSON.stringify(prompt)}`;

    try {
        const response = await openAi.chat.completions.create({
            model: "gpt-4o-2024-08-06",
            messages: [
                { role: "system", content: "Extract the event information, Generate 3 detailed plans including services needed to achieve the event." },
                { role: 'user', content: eventPlanningPrompt }],
            max_tokens: 1000,
            temperature: 0.7,
            response_format: zodResponseFormat(generatedEventsSchema, "event")
        });

        console.log(response.choices)

        const plan = response.choices?.[0]?.message?.content ?? "";

        const data = JSON.parse(plan)


        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data;
    } catch (error) {
        console.error('Error generating event plan:', error);
        throw error;
    }
}

export const generateServicesJson = async (plan: string) => {
    try {
        // Extract services from the event plan
        const servicesPrompt = `Based on the following event plan, provide a JSON array of services needed for the event. (RESULT MUST BE JSON ARRAY) Each service should be an object with 'name' and 'description' properties:
    
            ${plan}`;

        const servicesResponse = await openAi.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [

                { role: 'user', content: servicesPrompt }
            ],
            response_format: { type: 'json_object' },
            max_tokens: 500,
            temperature: 0.7,
        });

        const servicesJson = servicesResponse.choices?.[0]?.message?.content?.trim() ?? '[]';
        // const services = JSON.parse(servicesJson);

        // Combine event plan and services in the response
        return JSON.parse(servicesJson) as { name: string; description: string }[];

    } catch (error: unknown) {
        console.error('Error generating services JSON:', error);
        throw error;
    }
}

export default openAi;
