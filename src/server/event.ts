import { GeneratedEventType } from "@/lib/open_ai";
import { db } from "./db";
import { withServerSession } from "./auth";
import { CreateEventInput } from "@/trpc/api/routers/event/schema";

export const getEventsByUserId = async (userId: string) => {
  return await db.event.findMany({
    where: {
      userId,
    },
  });
};

export const getEventById = async (id: string) => {
  return await db.event.findFirst({
    where: {
      id,
    },
    include: {
      eventService: {
        include: {
          service: true,
        },
      },
    },
  });
};

export const getVendorEventById = async (id: string, vendorId: string) => {
  const event = await db.event.findFirst({
    where: {
      id,
    },

  });

  const services = await db.eventService.findMany({
    where: {
      eventId: id,
      service: {
        vendorId: vendorId
      }
    },
    include: {
      service: true,
    }
  });

  return {
    event,
    services
  }
};

export const getServicesByEventId = async (id: string,) => {
  return await db.eventService.findMany({
    where: {
      eventId: id,
    },
    include: {
      service: true
    },
  });
};

export const getServicesByEventIdWithVendor = async (id: string) => {
  return await db.eventService.findMany({
    where: {
      eventId: id,
    },
    include: {
      service: {
        include: {
          vendor: true,
        }
      },
    },
  });
};

export const createEventFromAi = async ({ eventDetails, serviceLookupIds }: CreateEventInput) => {
  // const data = omit(event, "id")
  const session = await withServerSession();
  const event = eventDetails;

  const result = await db.$transaction(async (tx) => {
    // Get service IDs from embeddedLookupIds
    const services = await tx.service.findMany({
      where: {
        embeddedLookupId: {
          in: serviceLookupIds
        }
      },
      select: {
        id: true,
        embeddedLookupId: true
      }
    });

    const createdEvent = await tx.event.create({
      data: {
        name: event.name,
        description: event.description,
        location: event.location,
        totalPrice: event.totalPrice,
        guestCount: event.guestCount,
        type: event.type,
        userId: session.user?.id,
        startDate: event.startDate,
        endDate: event.endDate,
        eventService: {
          createMany: {
            data: services.map((service) => ({
              serviceId: service.id
            }))
          }
        }
      },
    });


    return { event: createdEvent };
  }, {
    maxWait: 5000, // 5 seconds max wait to connect to prisma
    timeout: 20000, // 20 seconds
  });

  return result;
}

// export const getVendorEventsById = async (userId: string) => {
//     console.log(userId)
//     return await db.event.findMany({
//         include: {
//             services: true
//         },

//     });
// }

export const getVendorEventsById = async (userId: string) => {

  const vendor = await db.vendor.findFirst({
    where: {
      userId: userId,
    }
  });

  return await db.event.findMany({
    where: {
      eventService: {
        some: {
          service: {
            vendorId: vendor?.id,
          },
        },
      },
    },

  });
};

export const getVendorEventsAndServiceById = async (userId: string) => {

  const vendor = await db.vendor.findFirst({
    where: {
      userId: userId,
    }
  });

  return await db.event.findMany({
    where: {
      eventService: {
        some: {
          service: {
            vendorId: vendor?.id,
          },
        },
      },
    },
    include: {
      eventService: {
        include: {
          service: true
        }
      }
    }

  });
};
