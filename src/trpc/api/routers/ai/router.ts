import { createTRPCRouter } from "../../trpc";
import { craftEventPlanProcedure } from "./procedure/craft-event";
import { getJsonFromPlanProcedure } from "./procedure/get-json-from-plan";

export const aiRouter = createTRPCRouter({
    generateEventPlan: craftEventPlanProcedure,
    getJsonFromPlan: getJsonFromPlanProcedure,

})