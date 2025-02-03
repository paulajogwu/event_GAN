"use client";

import UsersChat from "@/components/chats/users.chat";
import { useValidateTab } from "@/components/common/redirectTab";
import TabsBtn from "@/components/common/tabsBtn";
import ServiceInfoBox, {
  VendorInfoBox,
  VendorInfoBoxProps,
} from "@/components/dashboard/admin/events/service/serviceInfoBox";
import DetailsCard from "@/components/events/event-details/details-card";
import VendorDisputes from "@/components/events/event-details/vendorDisputes";
import Loading from "@/components/loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fCurrency } from "@/lib/format-number";
import { api } from "@/trpc/react";
import { Service, Vendor } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

export interface VendorWithServices {
  id: string; // VendorId
  vendor: Vendor;
  services: Service[];
}

interface Params {
  params: {
    id: string;
  };
}

function AiPlanedEvents({ params }: Params) {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "Event Overview";
  const tabVariants = [
    {
      tab: "Event Overview",
      tabName: "Event Overview",
      name: "Event Overview",
      tabCount: undefined,
    },
    // { tab: 'Timeline & Schedule', tabName: 'Timeline & Schedule', name: "Timeline & Schedule", tabCount: undefined },
    {
      tab: "Disputed",
      tabName: "Disputed",
      name: "Disputed",
      tabCount: undefined,
    },
    { tab: "Chat", tabName: "Chat", name: "Chat", tabCount: undefined },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `/user/events/${params.id}`, // Pass the route to redirect to if invalid
  });

  const { data, isLoading, error } = api.event.getEvent.useQuery(params?.id);
  console.log("Events Data", data);

  const { mutateAsync: deleteEventService } =
    api.service.deleteEventService.useMutation();

  const [lookupId, setLookupId] = useState<string | null>(null);
  const [vendor, setVendor] = useState<VendorInfoBoxProps["vendor"] | null>(
    null,
  );

  const servicesQuery = api.event.getServiceListWithVendor.useQuery(
    params?.id,
    {
      enabled: !!params?.id,
    },
  );

  const eventServices = servicesQuery?.data?.services || [];

  const dedupedVendorServices = useMemo(() => {
    const groupedMap = new Map<string, VendorWithServices>();

    eventServices.forEach(({ service }) => {
      if (service.vendor) {
        const vendorId = service.vendor.id;
        if (!groupedMap.has(vendorId)) {
          groupedMap.set(vendorId, {
            id: vendorId,
            vendor: service.vendor,
            services: [],
          });
        }
        groupedMap.get(vendorId)!.services.push(service);
      }
    });

    return groupedMap;
  }, [eventServices]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  const cards = [
    // { name: "Capacity", value: data?.event?.completionRate },
    { name: "Guest count", value: data?.event?.guestCount },
    { name: "Type", value: data?.event?.type },
    { name: "Price", value: fCurrency(data?.event?.totalPrice) },
  ];

  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      {/* main content */}
      <div className="col-span-2 mb-6">
        <div>
          <h1 className="py-4 text-2xl font-bold text-[#000000]">
            {data?.event?.name}
          </h1>
          <p className="pb-3 text-sm text-[#667185]">
            {data?.event?.description}
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

        {currentTab === "Event Overview" && (
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
                <CardContent className="flex items-center px-0 pb-0 pt-7">
                  <h1 className="text-xl font-semibold text-[#101928]">
                    {card.value}
                  </h1>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {currentTab === "Event Overview" && (
          <DetailsCard
            description={data?.event?.description}
            eventServices={eventServices}
            isVendorsLoading={servicesQuery.isLoading}
            onLookupIdChange={(id, vendor) => {
              setLookupId(id);
              setVendor(vendor);
            }}
          />
        )}
        {/* {currentTab === "Calender" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )} */}
        {currentTab === "Disputed" && <VendorDisputes eventId={params.id} />}
        {currentTab === "Chat" && (
          <UsersChat eventId={params.id} vendorsMap={dedupedVendorServices} />
        )}
      </div>
      <div className="col-span-1">
        <div className="relative">
          <div className="sticky top-[10rem] space-y-6">
            {lookupId && vendor && (
              <VendorInfoBox
                vendor={vendor}
                id={lookupId}
                onRemove={(id) => {
                  const lookupIdentity = lookupId;
                  setLookupId(null);
                  setVendor(null);
                  deleteEventService({
                    eventId: id,
                    serviceId: lookupIdentity,
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiPlanedEvents;
