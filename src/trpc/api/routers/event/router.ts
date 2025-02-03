import { createTRPCRouter } from "../../trpc";
import { createEventProcedure } from "./procedure/createEventProcedure";
import {
  getEventsByUserIdProcedure,
  getVendorEventsAndServiceByUserIdProcedure,
  getVendorEventsByUserIdProcedure,
} from "./procedure/getEventByUserIdProcedure";
import { acceptOrRejectEventServiceProcedure, getDisputedEventServiceProcedure, getEventProcedure, getServiceListProcedure, getServiceListWithVendorProcedure, getVendorEventProcedure } from "./procedure/getEventProcedure";
import {
  getServiceByIdProcedure,
  getServiceByLookupIdProcedure,
  getVendorServicesProcedure,
} from "./procedure/getServiceProcedure";
import { getUserIdByEmail } from "./procedure/getUserById";
import { hireProcedure } from "./procedure/hireProcedure";
export const eventRouter = createTRPCRouter({
  getEvent: getEventProcedure,
  getVendorEvent: getVendorEventProcedure,
  getServiceById: getServiceByIdProcedure,
  getServiceByLookupId: getServiceByLookupIdProcedure,
  getVendorServices: getVendorServicesProcedure,
  getUserIdByEmail: getUserIdByEmail,
  getEventsByUserId: getEventsByUserIdProcedure,
  getVendorEventsById: getVendorEventsByUserIdProcedure,
  getVendorEventsAndServiceById: getVendorEventsAndServiceByUserIdProcedure,
  createEvent: createEventProcedure,
  getServiceList: getServiceListProcedure,
  getServiceListWithVendor: getServiceListWithVendorProcedure,
  acceptOrRejectEventService: acceptOrRejectEventServiceProcedure,
  getDisputedEventService: getDisputedEventServiceProcedure,
  hire: hireProcedure,
});

