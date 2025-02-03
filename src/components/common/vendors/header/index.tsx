"use client";

import React from "react";
import { Logo } from "../../logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Stars from "~/public/img/vendor/stars.svg";
// import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const VendorHeader = () => {
  const path = usePathname();
  return (
    <header
      style={{
        boxShadow: "0px 1px 3px 0px #0F224714",
      }}
      className={` ${path === "/plan" && "hidden"} mx-auto flex w-full max-w-[1104px] items-center justify-between rounded-3xl border border-[#E3E8F0] bg-white py-[13px] pl-3 pr-[21.5px] sm:pl-[40px]`}
    >
      <div className="flex items-center gap-x-3 divide-x divide-[#C7CDD9]">
        <Logo className="max-w-[132px]" />
        <span className="hidden px-3 text-sm font-medium text-[#939EB3] md:flex">
          Support center
        </span>
      </div>
      <div className="flex w-full max-w-[400px] items-center justify-between gap-x-5">
        <NavigationMenu>
          <NavigationMenuList className="hidden gap-x-3 md:flex">
            <NavigationMenuItem>
              {/* <Link href="/" passHref> was throwing errors */}
              <NavigationMenuLink href="/" className="text-sm text-[#0F2247]">
                Home
              </NavigationMenuLink>
              {/* </Link> */}
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Link href={"/user/"}>
          <Button className="bg_blue_gradient gap-x-2 text-sm text-white">
            Plan an event
            <Image src={Stars} alt="stars icon" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default VendorHeader;
