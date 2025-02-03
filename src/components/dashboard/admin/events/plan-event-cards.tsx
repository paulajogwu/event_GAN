import UpcomingEventCard from "@/components/events/upcoming-events/events-card";
import { useUserSession } from "@/components/hooks/client/userSession";
import { GeneratedEventType } from "@/lib/open_ai";
import { EventOutput } from "@/mongodb/types";
import { Roles } from "@prisma/client";
import React from "react";

function PlanedEvent({
  event,
  recommended,
  role,
  queryString,
}: {
  event: GeneratedEventType & { id: string; createdAt?: string };
  recommended?: boolean;
  role?: Roles;
  queryString?: string;
}) {
  return (
    <UpcomingEventCard
      title={event.name}
      description={event.description}
      tags={[]}
      price={event.totalPrice}
      location={event.location}
      date={event?.createdAt}
      rate={""}
      id={event.id}
      cardLink={
        recommended
          ? `/user/plan-event/recommended/${event.id}${queryString}`
          : role === "USER"
            ? `/user/events/${event.id}`
            : `/dashboard/events/${event.id}`
      }
    />
  );
}

export function DraftEvent({
  event,
  queryString,
  draftIndex,
}: {
  event: EventOutput;
  queryString?: string;
  draftIndex: number;
}) {
  return (
    <UpcomingEventCard
      title={event.name}
      description={event.description}
      tags={event.services.map((service) => service.tags.join(", "))}
      price={event.totalPrice}
      location={event.location}
      rate={""}
      status={"TEMP"}
      cardLink={`/user/plan-event/recommended/${draftIndex}${queryString}`}
    />
  );
}

export function PublishedEvent({
  event,
}: {
  event: GeneratedEventType & { id: string };
}) {
  return (
    <UpcomingEventCard
      title={event.name}
      description={event.description}
      tags={event.serviceIDs.map((service) => service.name)}
      price={event.totalPrice}
      rate={""}
      id={event.id}
      cardLink={`/user/plan-event/recommended/${event.id}`}
    />
  );
}

export default PlanedEvent;
