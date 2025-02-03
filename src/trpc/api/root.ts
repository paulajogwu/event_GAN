import { postRouter } from "@/trpc/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/trpc/api/trpc";
import { authRouter } from "./routers/auth/router";
import { aiRouter } from "./routers/ai/router";
import { eventRouter } from "./routers/event/router";
import { vendorRouter } from "./vendor/router";
import { paymentRouter } from "./payments/router";
import { servicesRouter } from "./routers/service";
import { profileRouter } from "./routers/profile/router";
import { chatRouter } from "./routers/chat/router";
import { chatServerRouter } from "./routers/chat/procedure/server";
import searchRouter from "./routers/search";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  ai: aiRouter,
  event: eventRouter,
  vendor: vendorRouter,
  payment: paymentRouter,
  service: servicesRouter,
  profile: profileRouter,
  chat: chatRouter,
  chatServer: chatServerRouter,
  search: searchRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
