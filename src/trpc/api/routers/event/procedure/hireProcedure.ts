import { protectedProcedure } from "@/trpc/api/trpc";
import { z } from "zod";

const hireInputSchema = z.object({
    eventTitle: z.string().min(1, "Event title is required"),
    description: z.string().min(10, "Please provide more details"),
    location: z.string().min(1, "Location is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    budget: z.number().min(1, "Budget is required"),
    attendee: z.string().min(1, "Expected attendees is required"),
    dateRange: z.object({
        from: z.date(),
        to: z.date(),
    }),
    vendorId: z.string(),
    selectedServices: z.array(z.string()),
});

export const hireProcedure = protectedProcedure
    .input(hireInputSchema)
    .mutation(async ({ ctx, input }) => {
        const { db, session } = ctx;

        // Create the event
        const event = await db.event.create({
            data: {
                name: input.eventTitle,
                description: input.description,
                location: input.location,
                guestCount: Number(input.attendee),
                type: "HIRE", // You might want to add this to your EventStatusEnum
                userId: session.user.id,
                totalPrice: Number(input.budget),
                startDate: input.dateRange.from,
                endDate: input.dateRange.to,
                eventService: {
                    createMany: {
                        data: input.selectedServices.map((serviceId) => ({
                            serviceId,
                        }))
                    }
                },
                status: 'PENDING'
            },
        });

        // Create event services
        // await db.eventService.createMany({
        //   data: input.selectedServices.map((service) => ({
        //     eventId: event.id,
        //     serviceId: service.id,

        //   })),
        // });

        return {
            success: true,
            message: "Event created successfully",
            event,
        };
    });
