"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { TbMessage2 } from "react-icons/tb";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MobileNav } from "./sidebar";
import { LiaAngleDownSolid } from "react-icons/lia";

function Header() {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const { data } = useSession();
  const isVendor = data?.user?.role === "VENDOR";

  const handleOPenDrawer = () => {
    setOpenDropdown((dropdown) => !dropdown);
  };
  return (
    <header className="sticky right-0 top-0 z-[50] max-h-[119px] w-full bg-[#FFFFFF] shadow-sm">
      <div className="shadow-2 flex w-full items-center justify-between gap-x-3 px-3 py-5 md:px-6 2xl:px-11">
        <MobileNav />
        <div className="flex w-full items-center justify-end gap-x-4 md:max-w-full">
          {/* <div className="relative flex flex-grow items-center md:max-w-sm">
            <Input
              type="text"
              placeholder="Search here...."
              className="w-full rounded-lg border border-gray-300 bg-white py-5 pl-8 text-sm text-[#667085] placeholder:text-[#667085]"
            />
            <span className="absolute left-2 top-3">
              <CiSearch size={20} color={"#667085"} fontSize={400} />
            </span>

          </div> */}
          <div>
            <Link href={"/chats"} className="">
              <Button className="flex h-fit w-fit items-center justify-center rounded-full bg-transparent shadow-none">
                <TbMessage2 size={28} color="black" />
              </Button>
            </Link>
          </div>
          <DropdownMenu open={openDropdown} onOpenChange={handleOPenDrawer}>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="relative h-11 w-11">
                  <Image
                    src={data?.user?.image ?? ""}
                    fill
                    alt=""
                    className="h-full w-full rounded-full object-cover object-center"
                  />
                </div>
                <span>
                  <IoIosArrowDown
                    size={23}
                    color="#667185"
                    className={`${openDropdown && "rotate-180 duration-100"}`}
                  />
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="satoshi flex w-full max-w-2xl flex-col gap-2 bg-white p-4">
              <div>
                <h1 className="text-base font-medium text-[#101928]">
                  {data?.user.name}
                </h1>
                <p className="text-xs text-[#475367]">{data?.user.email}</p>
              </div>
              <DropdownMenuItem className="bg-white p-2 text-sm hover:bg-gray-200">
                My Events
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-white p-2 text-sm hover:bg-gray-200">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-white p-2 text-sm hover:bg-gray-200">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div></div>
      </div>
      {/* </div> */}
    </header>
  );
}

export default Header;
