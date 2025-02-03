"use client";

import TabsBtn from "@/components/common/tabsBtn";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useValidateTab } from "@/components/common/redirectTab";
import SkeletonLoader from "@/components/common/skeletonLoader/Loader";
import { api } from "@/trpc/react";
import PlanedEvent from "@/components/dashboard/admin/events/plan-event-cards";

function UpComingEvents() {
  const tabVariants = [
    { tab: "All Events", tabName: "All Events", name: "All Events", count: 9 },
    {
      tab: "Completed",
      tabName: "Completed",
      name: "Completed",
      count: undefined,
    },
  ];

  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "All events";
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `/dashboard/events`,
  });

  const {
    data,
    isLoading: eventsLoading,
    error,
  } = api.event.getVendorEventsById.useQuery();
  console.log("Event data", data);

  const events = data ?? [];

  return (
    <section className="satoshi pb-10">
      <div>
        <h1 className="py-4 text-2xl font-bold text-[#000000]">My Events</h1>
        <p className="pb-3 text-sm text-[#667185]">
          Build stronger relationships with customers
        </p>
        <div className="satoshi mb-4 flex w-full min-w-full flex-1 items-center overflow-x-auto px-7">
          {tabVariants.map((tab, id) => (
            <TabsBtn
              key={id}
              tabCount={undefined}
              tabName={tab.tabName}
              name={tab.name}
              tab={currentTab}
              activeColor="border-[#004AAD] text-[#004AAD]"
              notActiveColor="text-[#344054]"
            />
          ))}
        </div>
        {currentTab === "All Events" && (
          <>
            {eventsLoading && (
              <SkeletonLoader
                count={6}
                containerStyle="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-8"
                loaderStyle="w-full bg-gray-400 h-[210px]"
              />
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                // @ts-expect-error TODO: fix this
                <PlanedEvent key={event.id} event={event} />
              ))}
            </div>
          </>
        )}
        {currentTab === "Completed" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}
      </div>
    </section>
  );
}

export default UpComingEvents;
