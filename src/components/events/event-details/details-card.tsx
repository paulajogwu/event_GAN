import { VendorInfoBoxProps } from "@/components/dashboard/admin/events/service/serviceInfoBox";
import ReviewVendor from "@/components/dashboard/vendor/profile/modals/review-vendor";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { EventService, Service, Vendor } from "@prisma/client";
import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";

interface DetailsCardProps {
  description: string | undefined;

  eventServices: (EventService & {
    service: Service & {
      vendor: Vendor;
    };
  })[];
  isVendorsLoading: boolean;
  onLookupIdChange?: (id: string, vendor: VendorInfoBoxProps["vendor"]) => void;
}

function DetailsCard({
  description,
  isVendorsLoading,
  eventServices,
  onLookupIdChange,
}: DetailsCardProps) {
  const [lookupId, setLookupId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <Card className="rounded-[10px] border border-[#E4E7EC] bg-[#FFFFFF] py-[9px]">
        <CardContent className="satoshi">
          <CardTitle className="text-xl font-bold text-[#101928]">
            Description
          </CardTitle>
          <CardDescription className="text-sm font-medium text-[#667185]">
            {description}
          </CardDescription>
        </CardContent>
      </Card>

      {isVendorsLoading ? (
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

      <Card className="overflow-hidden rounded-[10px] border border-[#EDEDF2] bg-[#FFFFFF]">
        {eventServices.map(({ service, status }, id) => (
          <CardContent
            key={id}
            onClick={() => {
              setLookupId(service.embeddedLookupId);
              onLookupIdChange &&
                onLookupIdChange(
                  service.embeddedLookupId,
                  // @ts-expect-error vendor is not fully defined
                  service.vendor,
                );
            }}
            className={`satoshi flex cursor-pointer items-center hover:bg-gray-100 ${lookupId === service.embeddedLookupId ? "bg-gray-100" : "bg-white"} justify-between border-b border-[#F7F9FC] px-6 py-3.5 duration-200`}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10">
                <Avatar className="relative border">
                  <AvatarImage
                    src={service.embeddedLookupId}
                    alt="user image"
                  />
                  <AvatarFallback className="font-bold uppercase">
                    {(service?.vendor?.businessName ?? service.name)?.slice(
                      0,
                      2,
                    )}
                  </AvatarFallback>
                  <span className="absolute bottom-0 right-1 z-50 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
                </Avatar>
              </div>
              <div>
                <h1 className="pb-1 text-xs font-medium text-[#667185]">
                  <span
                    className={cn(
                      "text-xs font-normal",
                      status === "PENDING"
                        ? "text-[#FFBA3B]"
                        : status === "ACCEPTED"
                          ? "text-[#7CB518]"
                          : status === "COMPLETED"
                            ? "text-primary"
                            : "text-red-500",
                    )}
                  >
                    {status === "PENDING"
                      ? "(Pending transaction)"
                      : status === "ACCEPTED"
                        ? "(Transaction accepted)"
                        : status === "COMPLETED"
                          ? "(Transaction completed)"
                          : "(Transaction rejected)"}
                  </span>
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-[#101928]">
                      {service.name} -{" "}
                      {service.pricingModel === "HOURLY_RATE"
                        ? `$${service.price}/hour`
                        : service.pricingModel === "PER_PERSON"
                          ? `$${service.price}/person`
                          : `$${service.price}`}
                    </h4>
                    <p className="text-xs font-medium text-gray-600">
                      Vendor: <strong>{service?.vendor?.businessName}</strong>
                    </p>
                  </div>

                  {status === "COMPLETED" && (
                    <div className="ml-2">
                      <ReviewVendor
                        vendorId={service.vendor.id}
                        vendorName={service.vendor.businessName ?? ""}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`relative h-5 w-5`}>
              <LiaAngleRightSolid />
            </div>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}

export default DetailsCard;
