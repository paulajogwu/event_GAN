"use client";

import PlanedEvent from "@/components/dashboard/admin/events/plan-event-cards";
import { api } from "@/trpc/react";
import React from "react";
import { useSession } from "next-auth/react";
import SkeletonLoader from "@/components/common/skeletonLoader/Loader";

function AiPlanedEvents() {
  const { data: session } = useSession();
  const { data: userId } = api.event.getUserIdByEmail.useQuery(
    session?.user?.email ?? "",
  );
  const {
    data: events,
    isLoading: eventsLoading,
    error,
  } = api.event.getEventsByUserId.useQuery(userId ?? "");

  if (error) {
    return <h1>Error {error.message}</h1>;
  }

  if (!eventsLoading && events?.events.length === 0) {
    return <h1>No events found</h1>;
  }

  return (
    <section>
      <div className="satoshi py-3">
        <h1 className="py-2 text-2xl font-bold text-[#301212]">My events</h1>
        <p className="text-sm font-medium text-[#667185]">
          Your upcoming events
        </p>
      </div>
      {eventsLoading && (
        <SkeletonLoader
          count={6}
          containerStyle="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-8"
          loaderStyle="w-full bg-gray-400 h-[210px]"
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-8">
        {events?.events.map((event: any) => (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          <PlanedEvent key={event?.id} event={event} role="USER" />
        ))}
      </div>
    </section>
  );
}

export default AiPlanedEvents;
