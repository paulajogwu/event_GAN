"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import searchImg from "~/public/img/undraw_search.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { SearchVendorResult } from "@/trpc/api/routers/search/procedures/searchProcedure";
import { useDebounce } from "use-debounce";
import { Country } from "country-state-city";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface EventCardProps {
  event: {
    id: string;
    image: StaticImageData | string;
    title: string;
    description?: string;
    location?: string;
    roomCount?: number;
    elevator?: string;
  };
}

const countryList = Country.getAllCountries().map((country) => ({
  value: country.isoCode,
  label: country.name,
  icon: (
    <img
      src={`https://flagcdn.com/${country.isoCode.toLowerCase()}.svg`}
      alt={country.name}
      className="inline-block h-4 w-4"
    />
  ),
}));

const VendorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    localStorage.getItem("defaultCountry") ?? "",
  );

  useEffect(() => {
    localStorage.setItem("defaultCountry", selectedCountry);
  }, [selectedCountry]);

  const {
    data: results,
    error,
    isLoading,
  } = api.search.searchVendors.useQuery(
    {
      query: debouncedSearchTerm,
      // country: selectedCountry,
    },
    {
      enabled: debouncedSearchTerm.length > 2,
    },
  );

  const handleSearch = async () => {
    setHasSearched(true);

    if (!searchTerm) {
      return;
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl p-6">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Vendor Event Search
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Search for events to connect with organizers and participate as a
        vendor.
      </p>

      <div className="mx-auto flex max-w-2xl items-center gap-2">
        <div className="flex flex-1 items-center overflow-hidden rounded-md border bg-white shadow-sm transition-all hover:shadow-md">
          <input
            type="text"
            className="flex-1 px-4 py-3 outline-none"
            placeholder="Search events by name or description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          {/* <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[200px] border-0 border-l">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countryList.map((country) => (
                <SelectItem
                  key={country.value}
                  value={country.value}
                  className=""
                >
                  {country.icon}
                  <span className="ml-2">{country.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </div>
      </div>

      <div className="mt-6">
        {/* Loading indicator */}
        {isLoading && (
          <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-3 lg:p-0 xl:gap-10 2xl:grid-cols-3 2xl:gap-4">
            <Skeleton className="h-[200px] w-[300px] bg-gray-600" />
            <Skeleton className="h-[200px] w-[300px] bg-gray-600" />
            <Skeleton className="h-[200px] w-[300px] bg-gray-600" />
          </div>
        )}

        {/* Display event cards if there are results */}
        {!isLoading && results && results.length > 0 && (
          <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-3 lg:p-0 xl:gap-10 2xl:grid-cols-3 2xl:gap-4">
            {results.map((vendor) => (
              <VendorCard key={vendor._id.$oid} vendor={vendor} />
            ))}
          </div>
        )}

        {/* Show initial message if no search term and hasn't searched */}
        {!isLoading && results?.length === 0 && !hasSearched && (
          <div className="mt-8 flex min-h-[40vh] flex-col items-center justify-center">
            <Image
              src={searchImg}
              alt="searchImage"
              className="h-[50px] w-[50px] object-contain"
            />
            <p>Your search results will be listed here.</p>
          </div>
        )}

        {/* Show no results message if search term is entered but no results */}
        {!isLoading && hasSearched && results && results.length === 0 && (
          <p className="mt-8 text-center text-gray-500">
            No vendors found matching "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
};

interface VendorCardProps {
  vendor: SearchVendorResult;
}
const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Card className="satoshi mx-auto w-full rounded-xl border border-[#E5EFFF] bg-[#FFFFFF] shadow-sm sm:max-w-lg">
      <CardContent className="flex w-full flex-col p-0">
        <div className="relative h-[11rem] w-full">
          <Image
            src={vendor.images?.[0] ?? "/img/placeholder.png"}
            fill
            alt="vendor_image"
            priority
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex h-full flex-1 flex-col gap-y-3 self-stretch px-3 py-3 lg:px-6 xl:p-4 2xl:px-3">
          <CardHeader className="flex-1 border-b border-[#E5EFFF] p-0">
            <CardTitle className="text-xl font-medium text-[#333333]">
              {vendor.businessName}
            </CardTitle>
            <div className="line-clamp-2 pb-2 text-[#666666]">
              <blockquote className="line-clamp-2 text-[#666666]">
                {vendor.description}
              </blockquote>
            </div>
          </CardHeader>
          <Link
            href={`/user/vendors/${vendor.businessName}-${vendor._id.$oid}`}
            className="flex-1"
          >
            <Button className="flex w-full items-center justify-center rounded-md bg-slate-800 px-5 py-3.5 text-sm font-medium text-white">
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorPage;
