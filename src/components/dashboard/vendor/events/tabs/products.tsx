"use client";

import EventCard from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiGrid41, CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoFilterOutline, IoListOutline } from "react-icons/io5";
import event1 from "~/public/img/event.png";
import event2 from "~/public/img/event1.png";
import event3 from "~/public/img/event2.png";
import event4 from "~/public/img/event3.png";
import noProductImage from "~/public/img/vendor/products.svg";
import { IoAddOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/trpc/react";
import { Product } from "@prisma/client";
import SkeletonLoader from "@/components/common/skeletonLoader/Loader";

interface EventCardProps {
  id: string;
  image: StaticImageData;
  title: string;
  description?: string;
  location: string;
  roomCount: number;
  elevator: string;
}

export const events = [];

function Products() {
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<string>("grid");

  const handleListorGridView = (view: string) => {
    setView(view);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data, isLoading } = api.service.getProductsByUserId.useQuery();

  const products = data ?? [];

  return (
    <>
      <div className="satoshi flex max-h-full max-w-full items-center justify-between gap-x-10 overflow-x-auto border-b py-4">
        <div className="flex items-center gap-x-4">
          <h1 className="whitespace-nowrap text-base font-medium text-[#475467]">
            Products : {products ? products.length : 0}
          </h1>

          <div className="relative flex w-full items-center">
            <Input
              type="text"
              className="w-[12rem] rounded-md border border-[#D0D5DD] pl-7 text-[#667085] placeholder:text-[#667085]"
              placeholder="Search here..."
              value={search}
              onChange={() => handleSearch}
            />
            <span className="absolute left-2 top-[0.6rem]">
              <CiSearch size={20} color="#667085" />
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-[#344054 flex items-center gap-x-2 rounded-md border border-[#D0D5DD]">
                <IoFilterOutline size={20} /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
              <DropdownMenuCheckboxItem>Date Created</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Order (asc)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Order (dsc)</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-0 border-r border-gray-300 pr-2">
            <Button
              onClick={() => handleListorGridView("grid")}
              size={"icon"}
              className={`${view === "grid" ? "bg-[#F2F4F7]" : ""} rounded-r-none border border-[#D0D5DD]`}
            >
              <CiGrid41 size={20} />
            </Button>

            <Button
              onClick={() => handleListorGridView("list")}
              size={"icon"}
              className={`${view === "list" ? "bg-[#F2F4F7]" : ""} rounded-l-none border border-[#D0D5DD]`}
            >
              <IoListOutline size={20} />
            </Button>
          </div>
          <Link href={`/dashboard/products/new`}>
            <Button className="flex items-center gap-x-2 rounded-md border border-[#D0D5DD] text-sm text-[#344054]">
              <IoIosAddCircleOutline size={19} /> Add product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-5 md:grid-cols-2 md:gap-10 md:px-6 lg:grid-cols-2 lg:gap-4 lg:px-1 xl:grid-cols-3">
        {isLoading ? (
          <SkeletonLoader
            count={3}
            containerStyle="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-8"
            loaderStyle="w-full bg-gray-400 h-[210px]"
          />
        ) : products?.length == 0 ? (
          <NoProducts />
        ) : (
          products?.map((product: Product) => (
            <EventCard
              key={product.id}
              event={{
                id: product.id,
                image: product.images[0] ?? "/img/placeholder.png",
                title: product.name,
                description: product.description ?? "",
              }}
              imageStyle="h-[14rem] object-cover object-center"
              iconColor="#001B3F"
              hideGridButton={true}
              buttonStyle="bg-[#001B3F] hover:bg-slate-800 text-white"
            />
          ))
        )}
      </div>
    </>
  );
}

export default Products;

export function NoProducts() {
  return (
    <div className="col-span-full flex max-h-full max-w-full flex-col items-center justify-center pb-10">
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <div>
          <Image
            src={noProductImage}
            alt="no product image"
            height={150}
            width={150}
            className="my-3 object-cover"
          />
        </div>
        <h1 className="text-base font-medium text-[#101828]">
          No products found
        </h1>
        <p className="max-w-sm text-center text-sm text-[#475467]">
          Click “add new product” button to get started in adding your first
          product to your store
        </p>
        <div className="flex items-center gap-x-3">
          <Link href={"/"}>
            <Button className="rounded-lg border border-[#D0D5DD] bg-[#FFFFFF] px-5 py-[0.6rem] text-base text-[#344054] shadow">
              Learn more
            </Button>
          </Link>
          <Link href={"/dashboard/products/new"}>
            <Button className="flex items-center justify-center gap-x-2 rounded-lg border border-[#004AAD] bg-[#004AAD] px-5 py-[0.6rem] text-base text-white shadow duration-200 hover:bg-blue-800">
              <IoAddOutline size={21} /> New product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
