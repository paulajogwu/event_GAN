"use client";

// TODO: VENDOR INFO BOX

import TabsBtn from "@/components/common/tabsBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import React from "react";

import { useValidateTab } from "@/components/common/redirectTab";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AcceptOrderModal, RejectOrderModal } from "./acceptRejectModal";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import VendorDisputes from "./vendorDisputes";
import Loading from "@/components/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  calculateServiceCharge,
  calculateServiceTotalCharge,
  cn,
} from "@/lib/utils";
import { fCurrency } from "@/lib/format-number";

interface UpcomingEventDetailsProps {
  id: string;
  capacity?: string;
  priceRange?: string;
  averageRating?: string | number;
}

function EventDetailsCard({ id }: UpcomingEventDetailsProps) {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "Product Overview";

  const {
    data,
    isLoading: isEventLoading,
    isFetching: isEventFetching,
    refetch: refetchEvent,
  } = api.event.getVendorEvent.useQuery(id);
  const { mutateAsync: updateServiceStatus, isPending } =
    api.event.acceptOrRejectEventService.useMutation({
      onSuccess: () => {
        toast({
          title: "Transaction status updated successfully",
          variant: "default",
        });
        refetchEvent();
      },
      onError: (error) => {
        toast({
          title: "Failed to update service status",
          variant: "destructive",
        });
      },
    });

  const event = data?.event;
  const services = data?.services || [];

  const tabVariants = [
    {
      tab: "Product Overview",
      tabName: "Product Overview",
      name: "Product Overview",
      tabCount: undefined,
    },
    // {
    //   tab: "Calender",
    //   tabName: "Calender",
    //   name: "Calender",
    //   tabCount: undefined,
    // },
    {
      tab: "Disputed",
      tabName: "Disputed",
      name: "Disputed",
      tabCount: undefined,
    },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `/dashboard/events/${id}`, // Pass the route to redirect to if invalid
  });

  const cards = [
    { name: "Capacity", value: `${event?.guestCount || 0}` },
    { name: "Event Type", value: event?.type },
  ];

  if (isEventLoading) {
    return <Loading />;
  }
  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      {/* main content */}
      <div className="col-span-2 mb-6">
        <div>
          <h1 className="py-4 text-2xl font-bold text-[#000000]">
            {event?.name}
          </h1>
          <p className="pb-3 text-sm text-[#667185]">
            {event?.description.substring(0, 200)}
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
        {currentTab === "Product Overview" && (
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

        {currentTab === "Product Overview" && (
          // <DetailsCard
          //   description={event?.description}
          //   eventId={id ?? ""}
          //   onLookupIdChange={(id, vendor) => {
          //     setLookupId(id);
          //     setVendor(vendor);
          //   }}
          // />

          <>
            <div className="flex flex-col gap-4">
              {(isPending || isEventLoading || isEventFetching) && (
                <div className="flex min-h-[200px] items-center justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              )}

              {!isPending && !isEventLoading && !isEventFetching && (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Services</CardTitle>
                    <CardDescription>
                      Here are your services that the vendor has requested for
                      this event
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Budget</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <span className="font-medium">
                                  {service.service.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {fCurrency(
                                calculateServiceCharge(
                                  service.service,
                                  event?.guestCount ?? 0,
                                ),
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  service.status === "REJECTED"
                                    ? "destructive"
                                    : "default"
                                }
                                className={cn(
                                  "text-xs capitalize",
                                  service.status === "PENDING"
                                    ? "bg-[#FFBA3B]"
                                    : service.status === "ACCEPTED"
                                      ? "bg-[#7CB518]"
                                      : service.status === "COMPLETED"
                                        ? "bg-primary"
                                        : "bg-red-500",
                                )}
                              >
                                {service.status.toLowerCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {service.status === "PENDING" && (
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="default"
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() =>
                                      updateServiceStatus({
                                        eventServiceId: service.id,
                                        status: "ACCEPTED",
                                      })
                                    }
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() =>
                                      updateServiceStatus({
                                        eventServiceId: service.id,
                                        status: "REJECTED",
                                      })
                                    }
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {service.status === "ACCEPTED" && (
                                <Button
                                  onClick={() =>
                                    updateServiceStatus({
                                      eventServiceId: service.id,
                                      status: "COMPLETED",
                                    })
                                  }
                                  size="sm"
                                  variant="default"
                                >
                                  Mark as Completed
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="flex items-center justify-end">
                      <span className="text-base font-medium text-[#667185]">
                        Total:
                      </span>{" "}
                      <span className="ml-2 text-lg font-medium text-[#101928]">
                        {fCurrency(
                          calculateServiceTotalCharge(
                            services.map((service) => service.service),
                            event?.guestCount ?? 0,
                          ),
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}

        {currentTab === "Calender" && (
          <div>
            <h1 className="text-center text-4xl font-semibold uppercase">
              {currentTab}
            </h1>
          </div>
        )}
        {currentTab === "Disputed" && <VendorDisputes eventId={id} />}
      </div>

      {/* {right content} */}
      <div className="relative h-auto w-full">
        <div className="sticky top-[6rem] flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col"></div>
      </div>
    </section>
  );
}

export default EventDetailsCard;
