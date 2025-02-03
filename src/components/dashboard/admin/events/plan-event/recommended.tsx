"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { DrafPlanQuery } from "./plan-event-form";
import PlanedEvent, { DraftEvent } from "../plan-event-cards";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import { AIEventResponseMock } from "@/components/events/plan-events/data";
import SkeletonLoader from "@/components/common/skeletonLoader/Loader";
import { GeneratedEventType } from "@/lib/open_ai";
import { EventOutput, FinalEventOutput } from "@/mongodb/types";
import dayjs from "dayjs";

const mydata = {
  success: true,
  plan: {
    plan1: {
      type: "Wedding",
      status: "Ongoing",
      description:
        "Our Annual Company Retreat is a 34-day conference designed to bring together employees from all departments to celebrate our achievements",
      name: "Wedding Plan 1",
      id: "1",
      guestCount: 100,
      totalPrice: 20000,
      location: "Beach",
      completionRate: "80%",
      serviceIDs: [
        { name: "Catering", description: "" },
        { name: "Decor", description: "" },
      ],
    },
    plan2: {
      type: "Corporate Event",
      status: "Completed",
      description:
        "Our Annual Company Retreat is a 34-day conference designed to bring together employees from all departments to celebrate our achievements",
      name: "Corporate Plan 1",
      id: "2",
      guestCount: 50,
      totalPrice: 10000,
      location: "Hotel",
      completionRate: "100%",
      serviceIDs: [
        { name: "Venue", description: "" },
        { name: "Catering", description: "" },
      ],
    },
    plan3: {
      type: "Birthday",
      status: "Pending",
      description:
        "Our Annual Company Retreat is a 34-day conference designed to bring together employees from all departments to celebrate our achievements",
      name: "Birthday Plan 1",
      id: "3",
      guestCount: 30,
      totalPrice: 5000,
      location: "Park",
      completionRate: "50%",
      serviceIDs: [
        { name: "DJ", description: "" },
        { name: "Cake", description: "" },
      ],
    },
  },
  planWithProviders: [],
  message: "Plans fetched successfully",
  executionTime: 1500,
};

export type MappedDraftEvents = [number, EventOutput];
export type SessionStorageDraftPlanQuery =
  | (DrafPlanQuery & { eventsData?: MappedDraftEvents[] })
  | null;

const EventRecommended = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("id");
  const [value, setValue] = useSessionStorage<SessionStorageDraftPlanQuery>(
    `plan-event-query-${sessionId}`,
    null,
  );
  const {
    mutateAsync: generateEventPlan,
    data: eventData,
    isPending,
  } = api.ai.generateEventPlan.useMutation({
    onSuccess: async ({ message, services }) => {
      toast({
        variant: "default",
        title: "🎉 Event Plan Generated",
        description: message,
        className: "bg-white border",
      });

      const mapArr: MappedDraftEvents[] =
        services?.plans?.map((data: EventOutput, idx: number) => [idx, data]) ??
        [];

      setValue({
        eventsData: mapArr,
        eventDescription: value?.eventDescription ?? ("" as string),
        eventLocation: value?.eventLocation ?? ("" as string),
        eventType: value?.eventType ?? ("" as string),
        budget: value?.budget ?? ("" as string),
        attendee: value?.attendee ?? ("" as string),
        eventLocationZip: value?.eventLocationZip ?? ("" as string),
        createdAt: value?.createdAt ?? ("" as string),
        id: value?.id ?? ("" as string),
        startDate: dayjs(value?.startDate).toISOString(),
        endDate: dayjs(value?.endDate).toISOString(),
      });
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
    trpc: {
      abortOnUnmount: true,
    },
  });

  useEffect(() => {
    if (value) {
      if (!value?.eventsData) {
        generateEventPlan(value);
      }
    }
  }, []);

  const plansArray =
    (sessionId === value?.id && value?.eventsData
      ? value?.eventsData?.map((data) => data[1])
      : eventData?.services?.plans) ?? [];
  console.log(value);
  console.log("EventData", plansArray);

  const allData =
    process.env.NODE_ENV === "development" ? AIEventResponseMock : plansArray;
  return (
    <section>
      <div className="satoshi py-3">
        <h1 className="py-2 text-2xl font-bold text-[#301212]">
          {isPending
            ? "Generating Event Plan"
            : "Congrats, here are your event plan"}
        </h1>
        <p className="text-sm font-medium text-[#667185]">
          {isPending
            ? "This usually takes about 2 mins"
            : "Please select one or more plan"}
        </p>
      </div>

      {isPending && (
        <SkeletonLoader
          count={3}
          containerStyle="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-8"
          loaderStyle="w-full bg-gray-400 h-[210px]"
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {plansArray?.map((event: EventOutput, idx: number) => (
          <DraftEvent
            key={`${event.name.substring(0, 3)}-${idx}`}
            queryString={`?id=${sessionId}`}
            event={event}
            draftIndex={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default EventRecommended;
