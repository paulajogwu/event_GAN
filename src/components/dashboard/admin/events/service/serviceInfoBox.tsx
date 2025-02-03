import React from "react";
import SkeletonLoader from "@/components/common/skeletonLoader/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import { PricingModel, Vendor } from "@prisma/client";
import Link from "next/link";
import { Country, State } from "country-state-city";

type Props = {
  id: string;
};

const ServiceInfoBox = ({ id }: Props) => {
  const serviceQuery = api.event.getServiceByLookupId.useQuery(id);
  const service = serviceQuery.data?.service;
  if (serviceQuery.isLoading) {
    return (
      <SkeletonLoader
        count={1}
        containerStyle="grid grid-cols-1 gap-4 pb-5 w-full"
        loaderStyle="bg-gray-300 w-full h-32 shadow-lg"
      />
    );
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {service && (
        <>
          <h2 className="text-xl font-bold">{service?.name}</h2>
          {/* <p className="text-gray-600">{service?.description}</p> */}
          {/* Add more details here */}
        </>
      )}
    </div>
  );
};

export type VendorInfoBoxProps = {
  vendor: Partial<Vendor> & {
    user: {
      id: string;
      name: string;
      country: string;
      state: string;
    };
  };
  onRemove: (vendorId: string) => void;
} & Props;

export const VendorInfoBox = ({ vendor, onRemove }: VendorInfoBoxProps) => {
  const vendorServiceQuery = api.event.getVendorServices.useQuery(
    { vendorId: vendor?.id as string, showFullService: false },
    {
      enabled: !!vendor?.id,
    },
  );
  const services = vendorServiceQuery.data?.services;

  const name = (vendor?.businessName ?? vendor?.user?.name).toLowerCase();
  const slug = `${name.replace(/\s+/g, "-")}-${vendor?.id}`;
  const vendorProfileUrl = `/user/vendors/${slug}`;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex w-full flex-row items-center justify-between px-6">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xl font-bold text-[#101928]">
            {vendor?.businessName}
          </CardTitle>
          <CardDescription className="text-sm text-[#667185]">
            {vendor?.category?.replaceAll("_", " ")}
          </CardDescription>
        </div>
        <Link
          href={vendorProfileUrl}
          target="_blank"
          className="text-base font-medium text-[#004AAD]"
        >
          View Profile
        </Link>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-sm text-gray-500">
            {vendor?.description?.substring(0, 400)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 border-y border-gray-200 py-4">
          <div className="w-full">
            <h4 className="mb-1 font-semibold">Location</h4>
            <p className="text-sm text-gray-500">
              {vendor?.user?.state
                ? State.getStateByCodeAndCountry(
                    vendor?.user?.state,
                    vendor?.user?.country,
                  )?.name
                : ""}
              ,{" "}
              {vendor?.user?.country
                ? Country.getCountryByCode(vendor?.user?.country)?.name
                : ""}
            </p>
          </div>
        </div>
        {services && (
          <div>
            {services?.length > 0 && (
              <>
                <h4 className="mb-2 font-semibold">Services</h4>
                <ul className="space-y-1 text-sm text-gray-500">
                  {services?.map((service) => (
                    <li key={service.id}>{service.name}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <div>
          <h4 className="mb-2 font-semibold">Pricing</h4>
          <p className="text-sm text-gray-500">
            {/* {vendor?. === PricingModel.HOURLY_RATE
              ? `$${vendor?.price}/hour`
              : `$${vendor?.price}/person`} */}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <Button
          variant="ghost"
          className="mx-auto text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => onRemove(vendor?.id as string)}
        >
          Remove vendor
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceInfoBox;
