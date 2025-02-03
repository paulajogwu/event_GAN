"use client";

import PendingTransactionsCard, {
  SummaryDetailsProps,
} from "@/components/dashboard/pending-transactions-card";
import QuickLinksCard from "@/components/dashboard/quick-links-card";
import TabsBtn from "@/components/common/tabsBtn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const summaryDetails: SummaryDetailsProps[] = [];

interface UpcomingEventDetailsProps {
  id: string;
  guestTypeCount: string;
  eventType: string;
  campaignsCount: string | number;
}

function UpcomingEventDetails({
  id,
  guestTypeCount,
  eventType,
  campaignsCount,
}: UpcomingEventDetailsProps) {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "Event Overview";
  const router = useRouter();

  const tabVariants = [
    {
      tab: "Event Overview",
      tabName: "Event Overview",
      name: "Event Overview",
      tabCount: 0,
    },
    {
      tab: "Service Summary",
      tabName: "Service Summary",
      name: "Service Summary",
      tabCount: undefined,
    },
    {
      tab: "Timeline & Schedule",
      tabName: "Timeline & Schedule",
      name: "Timeline & Schedule",
      count: undefined,
    },
    {
      tab: "Disputed",
      tabName: "Disputed",
      name: "Disputed",
      count: undefined,
    },
    { tab: "Chat", tabName: "Chat", name: "Chat", count: undefined },
  ];

  // Determine if the selected tab is valid
  const isValidTab = tabVariants.some((tab) => tab.tabName === selectedTabs);

  useEffect(() => {
    if (!isValidTab) {
      // Redirect to the default tab if the current tab is invalid
      router.push(`/dashboard/events/upcoming/${id}`);
    }
  }, [isValidTab, router, id]);

  const currentTab = isValidTab ? selectedTabs : "Event Overview";

  const cards = [
    { name: "Guest Count", value: guestTypeCount },
    { name: "Event Type", value: eventType },
    { name: "Campaigns", value: campaignsCount },
  ];

  const eventItems = [];

  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      {/* main content */}
      <div className="col-span-2 mb-6">
        <div>
          <h1 className="py-4 text-2xl font-bold text-[#000000]">My Events</h1>
          <p className="pb-3 text-sm text-[#667185]">
            Build stronger relationships with customers
          </p>
        </div>

        <div className="my-4 flex w-full items-center overflow-x-auto border-b-2">
          {tabVariants.map((tab) => (
            <TabsBtn
              key={tab.tab}
              tabCount={tab.tabCount}
              tabName={tab.tabName}
              name={tab.name}
              tab={currentTab}
              activeColor="border-[#004AAD] text-[#004AAD]"
              notActiveColor="text-[#344054]"
            />
          ))}
        </div>
        {/* cards */}
        <div className="dm_sans grid grid-cols-1 gap-x-3 gap-y-3 py-10 md:grid-cols-3 md:gap-5">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className={`flex w-full flex-col justify-between rounded-[10px] bg-[#FFFFFF] p-4`}
            >
              <CardHeader className="relative p-0">
                <CardTitle className="flex gap-x-3 text-sm font-medium text-[#344054]">
                  {card.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-7">
                <h1 className="text-2xl font-semibold text-[#101928]">
                  {card.value}
                </h1>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {currentTab === "Event Overview" && <EventDetailsCard eventItems={eventItems} />} */}
        {currentTab === "Service Summary" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}
        {currentTab === "Timeline & Schedule" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}
        {currentTab === "Disputed" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}
      </div>

      {/* {right content} */}
      <div className="flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col">
        <QuickLinksCard />

        <PendingTransactionsCard summary={summaryDetails} />
      </div>
    </section>
  );
}

export default UpcomingEventDetails;
