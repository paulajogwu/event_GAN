import { protectedProcedure } from '@/trpc/api/trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';


export const getMessagesProcedure = protectedProcedure
    .input(z.object({
        roomId: z.string()
    }))
    .query(async ({ ctx, input }) => {
        const { roomId } = input;
        const { db } = ctx;

        try {
            const serializedMessages = await db.message.findMany({
                where: {
                    conversationId: roomId
                },
                select: {
                    text: true,
                    id: true
                }
            });

            return serializedMessages;
        } catch (error) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch messages',
            });
        }
    });


export const getRecentChatRoomsProcedure = protectedProcedure
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
                    },
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


