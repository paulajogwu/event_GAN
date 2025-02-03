"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import React from "react";

const VendorDisputes = ({ eventId }: { eventId: string }) => {
  const { data: services, isLoading } =
    api.event.getDisputedEventService.useQuery({ eventId });

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (services?.length === 0) {
    return <div>No disputes found</div>;
  }

  return (
    <div>
      {services?.map((service, id) => (
        <CardContent key={id} className={`flex flex-col gap-4`}>
          <div className="satoshi flex cursor-pointer items-center justify-between border-b border-[#F7F9FC] bg-white px-6 py-3.5 duration-200 hover:bg-gray-100">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <Avatar className="relative border">
                  <AvatarImage
                    src={service.service.embeddedLookupId}
                    alt="user image"
                  />
                  <AvatarFallback className="font-bold uppercase">
                    {service.service.name?.slice(0, 2)}
                  </AvatarFallback>
                  <span className="absolute bottom-0 right-1 z-50 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
                </Avatar>
              </div>
              <div>
                <h1 className="pb-1 text-xs font-medium text-[#667185]">
                  <span
                    className={cn(
                      "text-xs font-normal",
                      service.status === "PENDING"
                        ? "text-[#FFBA3B]"
                        : service.status === "ACCEPTED"
                          ? "text-[#7CB518]"
                          : service.status === "COMPLETED"
                            ? "text-primary"
                            : "text-red-500",
                    )}
                  >
                    {/* service?.status=== "PENDING" 
                     service?.status=== "PENDING" */}
                    {service.status === "PENDING"
                      ? "(Pending transaction)"
                      : service.status === "ACCEPTED"
                        ? "(Transaction accepted)"
                        : service.status === "COMPLETED"
                          ? "(Transaction completed)"
                          : "(Transaction rejected)"}
                  </span>
                </h1>
                <p className="text-sm font-medium text-[#101928]">
                  {service.service.name}
                </p>
              </div>
            </div>
          </div>

          {service.status === "PENDING" && (
            <div className="flex space-x-4 px-4">
              <Button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">
                Accept
              </Button>
              <Button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600">
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      ))}
    </div>
  );
};

export default VendorDisputes;
