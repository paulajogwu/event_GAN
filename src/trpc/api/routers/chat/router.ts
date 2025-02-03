import { createTRPCRouter } from "../../trpc";
import { getMessagesProcedure, getRecentChatRoomsProcedure } from "./procedure";


export const chatRouter = createTRPCRouter({
    getMessages: getMessagesProcedure,
    getRecentChatRooms: getRecentChatRoomsProcedure,

})