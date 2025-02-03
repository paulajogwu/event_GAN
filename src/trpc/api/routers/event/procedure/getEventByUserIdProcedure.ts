import {
  getEventsByUserId,
  getVendorEventsAndServiceById,
  getVendorEventsById
} from "@/server/event";
import { protectedProcedure, publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";

export const getEventsByUserIdProcedure = publicProcedure
  .input(z.string().describe("User ID"))
  .query(async ({ input }) => {
    const events = await getEventsByUserId(input);
    return {
      success: true,
      events,
    };
  });

export const getVendorEventsByUserIdProcedure = protectedProcedure.query(async ({ ctx }) => {

  const events = await getVendorEventsById(ctx.session.user.id);

  return events;
});

export const getVendorEventsAndServiceByUserIdProcedure = protectedProcedure.query(async ({ ctx }) => {

  const events = await getVendorEventsAndServiceById(ctx.session.user.id);

  return events;
});
// export const getVendorEventsListByIdProcedure = publicProcedure
//   .input(z.string().describe("User ID"))
//   .query(async ({ input }) => {
//     const events = await getVendorEventsListById(input);
//     console.log(events);
//     return events;
//   });
