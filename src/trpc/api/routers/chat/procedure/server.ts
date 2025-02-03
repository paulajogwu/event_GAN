
import { createTRPCRouter, protectedProcedure, pusherProcedure } from '@/trpc/api/trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { UTApi } from 'uploadthing/server';
import { env } from '@/env';
import { zfd } from "zod-form-data";

export const postMessageProcedure = pusherProcedure
    .input(z.object({
        text: z.string(),
        roomId: z.string(),
        attachment: z.object({
            url: z.string(),
            name: z.string(),
            type: z.string(),
        }).optional(),
    })).mutation(async ({ ctx, input }) => {


        const text = input.text;
        const roomId = input.roomId;
        const attachment = input?.attachment;

        // const { text, roomId } = input;
        const { pusherServer, db } = ctx;

        try {
            // Trigger a pusher event named "incoming-message"
            await pusherServer.trigger(roomId, "incoming-message", JSON.stringify({ text, roomId, senderId: ctx.session.user.id, attachment }));

            // Insert the message into the database
            await db.message.create({
                data: {
                    text,
                    conversationId: roomId,
                    senderId: ctx.session.user.id,
                    attachment: attachment ? JSON.stringify(attachment) : null,
                }
            });

            return { success: true };
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to post message',
            });
        }
    });


export const getVendorRecentChatRoomsProcedure = protectedProcedure
    .query(async ({ ctx }) => {
        const { db, session } = ctx;

        try {
            const recentChatRooms = await db.conversation.findMany({
                where: {
                    eventServices: {
                        some: {
                            service: {
                                vendor: {
                                    userId: session.user.id
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                },
                take: 10,
            });

            return recentChatRooms;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch recent chat rooms',
            });
        }
    });


export const getChatRoomProcedure = protectedProcedure
    .input(z.object({

        eventId: z.string().optional(),
        serviceId: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {

        const { db } = ctx;

        try {
            const conversation = await db.conversation.findFirstOrThrow({
                where: {
                    eventServices: {
                        some: {
                            eventId: input?.eventId,
                            serviceId: input?.serviceId
                        }
                    }
                },
                include: {
                    messages: true
                }
            });

            return conversation;
        } catch (error) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Failed to fetch chat room not found',
            });
        }
    });


export const getMessagesProcedure = protectedProcedure
    .input(z.object({
        roomId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const { roomId } = input;
        const { db } = ctx;


        try {
            const messages = await db.message.findMany({
                where: {
                    conversationId: roomId
                }
            });

            return messages;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch messages',
            });
        }
    });


export const getParticipantsProcedure = protectedProcedure
    .input(z.object({
        roomId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const { roomId } = input;
        const { db } = ctx;

        try {
            const participants = await db.conversation.findMany({
                where: {
                    id: roomId
                },

            });

            return participants;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch participants',
            });
        }
    });


export const createChatRoomProcedure = protectedProcedure
    .input(z.object({
        eventId: z.string(),
        serviceIds: z.array(z.string())
    }))
    .mutation(async ({ ctx, input }) => {
        const { eventId, serviceIds } = input;
        const { db } = ctx;

        const event = await db.eventService.findMany({
            where: {
                AND: [
                    { eventId: eventId },
                    { serviceId: { in: serviceIds } }
                ]
            }
        });
        if (!event || event.length === 0) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Event not found',
            });
        }

        try {
            const conversation = await db.conversation.create({
                data: {
                    eventServices: {
                        connect: event.map(service => ({ id: service.id }))
                    }
                }
            });

            return conversation;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create chat room',
            });
        }
    });


// pusher authentication
export const pusherAuthProcedure = protectedProcedure
    .input(z.object({
        channelName: z.string(),
        socketId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        const { channelName, socketId } = input;
        const { pusherServer, session } = ctx;

        try {
            const presenceData = {
                user_id: session.user.id,
                user_info: {
                    name: session.user.name
                }
            };

            const auth = pusherServer.authorizeChannel(socketId, channelName, presenceData);

            return auth;
        }
        catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to authenticate pusher',
            });
        }
    });


export const chatServerRouter = createTRPCRouter({
    postMessage: postMessageProcedure,
    getRecentChatRooms: getVendorRecentChatRoomsProcedure,
    getChatRoom: getChatRoomProcedure,
    getMessages: getMessagesProcedure,
    getParticipants: getParticipantsProcedure,
    createChatRoom: createChatRoomProcedure,
    pusherAuth: pusherAuthProcedure,
});