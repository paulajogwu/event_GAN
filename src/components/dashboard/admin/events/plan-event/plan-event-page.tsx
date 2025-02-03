"use client";

import TabsBtn from "@/components/common/tabsBtn";
import PendingTransactionsCard from "@/components/dashboard/pending-transactions-card";
import { AIEventResponseMock } from "@/components/events/plan-events/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Service, Vendor } from "@prisma/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCompass } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { LiaAngleRightSolid } from "react-icons/lia";
import ServiceInfoBox, {
  VendorInfoBox,
  VendorInfoBoxProps,
} from "../service/serviceInfoBox";
import { fCurrency, fNumber } from "@/lib/format-number";
import { useValidateTab } from "@/components/common/redirectTab";
import { useSessionStorage } from "usehooks-ts";
import { api } from "@/trpc/react";
import { SessionStorageDraftPlanQuery } from "./recommended";
import { EventOutput } from "@/mongodb/types";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";

// ];

interface PlanEventTitleProps {
  id: string;
}

function PlanEventTitle({ id }: PlanEventTitleProps) {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "Service Summary";
  const sessionStorageId = searchParams.get("id");
  const router = useRouter();
  const [data, setData] = useState<EventOutput | null>(null);
  const sessionId = searchParams.get("id");
  const [value, setValue] =
    useSessionStorage<SessionStorageDraftPlanQuery | null>(
      `plan-event-query-${sessionId}`,
      null,
    );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value?.eventsData) {
      setLoading(true);
      const mapped = new Map(value?.eventsData);
      console.log(value?.eventsData);
      const currentEvent = (mapped.get(Number(id)) ??
        null) as EventOutput | null;

      setData(currentEvent);
      setLoading(false);
    }
  }, [value]);

  const [lookupId, setLookupId] = useState<string | null>(null);
  const [vendor, setVendor] = useState<VendorInfoBoxProps["vendor"] | null>(
    null,
  );

  const vendorInfo =
    data?.services.map((service) => service.embeddedLookupId) || [];
  const query = api.service.getVendorsbyEmbeddingLookupId.useQuery(vendorInfo, {
    enabled: vendorInfo.length > 0,
  });

  useEffect(() => {
    if (data?.services?.length) {
      if (data?.services?.length > 0) {
        if (value?.eventsData) {
          const mapped = new Map(value?.eventsData);
          mapped.set(Number(id), data);
          setValue({
            ...value,
            eventsData: Array.from(mapped),
          });

          query.refetch();
        }
      }
    }
  }, [data?.services?.length]);

  const tabVariants = [
    {
      tab: "Service Summary",
      tabName: "Service Summary",
      name: "Service Summary",
      tabCount: undefined,
    },
    // {
    //   tab: "Timeline ",
    //   tabName: "Timeline",
    //   name: "Timeline & Schedule",
    //   tabCount: vendors.length,
    // },
  ];

  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `/user/vendors/${id}`,
  });

  const cards = [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    { name: "Guest Count", value: `${fNumber(data?.guestCount)} Guests` },
    { name: "Event Type", value: data?.type },
    { name: "Price", value: fCurrency(data?.totalPrice) },
  ];

  const isTemp = true;

  // onSuccesss
  //
  const { mutateAsync: createEvent } = api.event.createEvent.useMutation({
    onSuccess(data) {
      router.push(`/user/events/${data.result.event.id}/payment/`);
    },
  });

  const handleCreateEvent = async () => {
    if (data) {
      await createEvent({
        eventDetails: {
          name: data.name,
          description: data.description,
          guestCount: data.guestCount,
          location: data.location,
          type: data?.type,
          completionRate: "0",
          status: "PENDING",
          totalPrice: data.totalPrice,
          startDate: dayjs(data?.startDate).toISOString(),
          endDate: dayjs(data?.endDate).toISOString(),
        },
        serviceLookupIds: data.services.map(
          (service) => service.embeddedLookupId,
        ),
      });
    }
  };
  const renderBookButton = () => {
    if (isTemp) {
      return (
        <div className="flex items-center gap-5 py-16">
          <Button
            onClick={handleCreateEvent}
            className="flex items-center gap-3 rounded-md bg-[#004AAD] px-3 py-2 text-sm text-[#FFFFFF] hover:bg-blue-600"
          >
            <span>
              <FiCompass size={20} />
            </span>{" "}
            Book this plan
          </Button>

          <Link
            href={{
              pathname: `/user/plan-event/recommended/`,
              query: { id: sessionStorageId },
            }}
          >
            <Button className="flex items-center gap-3 rounded-md border border-[#D0D5DD] bg-[#FFFFFF] px-3 py-2">
              <IoAddSharp size={20} /> View other plans
            </Button>
          </Link>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      {/* main content */}
      <div className="col-span-2 mb-6">
        <div className="flex w-full flex-col justify-between sm:flex-row md:items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1 className="py-4 text-2xl font-bold text-[#000000]">
                {data?.name}{" "}
              </h1>

              {renderBookButton()}
            </div>
            <p className="max-w-lg pb-3 text-sm text-[#667185]">
              {data?.description.substring(0, 200)}
            </p>
          </div>
        </div>

        {/* tabs navigator */}

        <div className="my-4 border-b-2">
          <div className="-mb-[3px] flex w-full items-center overflow-x-auto">
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

        {/* Service Summary tab */}
        {query?.isLoading ? (
          <div className="grid grid-cols-1">
            {[1, 2, 3].map((index) => (
              <Card
                key={index}
                className="rounded-lg border border-[#EDEDF2] bg-[#FFFFFF]"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="mb-2 h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-5" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {currentTab === "Service Summary" && (
          <Card className="rounded-lg border border-[#EDEDF2] bg-[#FFFFFF]">
            {query?.data?.map((service, id) => (
              <CardContent
                key={id}
                onClick={() => {
                  setLookupId(service.embeddedLookupId);
                  // @ts-expect-error vendor is not fully defined
                  setVendor(service.vendor);
                }}
                className={`satoshi flex cursor-pointer items-center hover:bg-gray-100 ${lookupId === service.vendorId ? "bg-gray-100" : "bg-white"} justify-between border-b border-[#F7F9FC] px-6 py-3.5 duration-200`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10">
                    <Avatar className="relative border">
                      <AvatarImage
                        src={service.embeddedLookupId}
                        alt="user image"
                      />
                      <AvatarFallback className="font-bold uppercase">
                        {(
                          service.vendor.businessName ??
                          service?.vendor?.user?.name
                        )?.slice(0, 2)}
                      </AvatarFallback>
                      <span className="absolute bottom-0 right-1 z-50 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
                    </Avatar>
                  </div>
                  <div>
                    <p className="pb-1 text-xs font-medium text-[#667185]">
                      {service.name}
                    </p>
                    <h1 className="text-sm font-medium text-[#101928]">
                      {service.vendor.businessName ??
                        service?.vendor?.user?.name}
                    </h1>
                  </div>
                </div>
                <div className={`relative h-5 w-5`}>
                  <LiaAngleRightSolid />
                </div>
              </CardContent>
            ))}
          </Card>
        )}

        {/* timeline */}

        {currentTab === "Timeline" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}

        {/* bottom buttons */}

        {renderBookButton()}
      </div>

      {/* {right content} */}
      <div className="relative flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col">
        <div className="sticky top-[6rem] space-y-6">
          {!isTemp && <PendingTransactionsCard summary={[]} />}
          {lookupId && vendor && (
            <VendorInfoBox
              vendor={vendor}
              id={lookupId}
              onRemove={(id) => {
                const lookupIdentity = lookupId;
                setLookupId(null);
                setVendor(null);
                const indexOfItemToRemove = data?.services?.findIndex(
                  (service) => service.embeddedLookupId == lookupIdentity,
                );
                console.log(indexOfItemToRemove);
                if (typeof indexOfItemToRemove === "number") {
                  const newServices =
                    data?.services?.filter(
                      (_, index) => index !== indexOfItemToRemove,
                    ) || [];
                  console.log(newServices);
                  // @ts-expect-error data is not fully defined
                  setData({
                    ...data,
                    services: newServices,
                  });
                }
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default PlanEventTitle;
