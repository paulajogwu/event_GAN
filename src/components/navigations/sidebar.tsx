"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { SlEarphonesAlt } from "react-icons/sl";
import Logo from "~/public/img/logo/blue-logo.svg";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import UserAvatar from "./user-avatar";
import { useSession } from "next-auth/react";
import { RiChat3Line, RiMenu2Fill } from "react-icons/ri";
import { Roles } from "@prisma/client";
import { FiPenTool } from "react-icons/fi";
import { IoFlashOutline } from "react-icons/io5";
// import { TiFlashOutline } from "react-icons/ti";

export interface SidebarLink {
  name: string;
  path: string;
  icon: JSX.Element;
  count?: number;
}

const userSidebarLinks: (SidebarLink | null)[] = [
  {
    name: "Home",
    path: "/user",
    icon: <GoHome size={21} />,
  },
  {
    name: `Plan Event`,
    path: `/user/plan-event`,
    icon: <FiPenTool size={20} />,
  },
  {
    name: "Vendors",
    path: "/user/search",
    icon: <IoFlashOutline size={20} />,
  },
  {
    name: `My Events`,
    path: `/user/events`,
    icon: <HiOutlineUserGroup size={20} />,
  },
];

const vendorSidebarLinks: (SidebarLink | null)[] = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <GoHome size={21} />,
  },
  {
    name: `Events`,
    path: `/dashboard/events`,
    icon: <HiOutlineUserGroup size={20} />,
  },
  {
    name: "My Products",
    path: "/dashboard/products",
    icon: <HiOutlineSpeakerphone size={20} />,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: <RiChat3Line size={20} />,
  },
];

const getSidebarIcons = ({ role }: { role?: Roles }) => {
  const isUser = role === "USER";
  const sidebarLinks: (SidebarLink | null)[] = isUser
    ? userSidebarLinks
    : vendorSidebarLinks;

  return sidebarLinks;
};

const last3Sidebars = [
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <IoSettingsOutline size={20} />,
  },
  {
    name: "Help Center",
    path: "/dashboard/help-center",
    icon: <SlEarphonesAlt size={20} />,
  },
  {
    name: "Refer family & friends",
    path: "/dashboard/referals",
    icon: <LuShoppingBag size={20} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data } = useSession();

  const isVendor = data?.user?.role === "VENDOR";
  const sidebarLinks = getSidebarIcons({ role: data?.user?.role });
  return (
    <aside
      className={`dm_sans z-9999 absolute left-0 top-0 hidden h-screen w-[17rem] flex-col overflow-y-hidden bg-[#FFFFFF] duration-300 ease-linear lg:static lg:flex lg:translate-x-0`}
    >
      {/* <!-- SIDEBAR LOGO --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link href="/dashboard">
          <Image width={176} height={32} src={Logo} alt="Logo" priority />
        </Link>
      </div>

      <div className="no-scrollbar flex h-screen flex-col justify-between overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-2 px-4 py-4 lg:px-6">
          <ul className="flex flex-col gap-1.5">
            {sidebarLinks
              .slice(0, 5)
              .map((links: SidebarLink | null, id: number) => {
                if (!links) {
                  return null;
                }

                return (
                  <li key={id}>
                    <Link
                      href={links.path}
                      className={`flex items-center justify-between gap-2.5 ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-sm text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={` ${pathname === links.path && "text-orange-500"}`}
                        >
                          {links.icon}
                        </span>
                        {links.name}
                      </div>
                      <span className={`rounded-[10px] bg-[#F8FFED] px-2`}>
                        {links.count}
                      </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4 pb-6">
          <nav className="mt-5 px-4 py-4 lg:px-6">
            <ul className="flex flex-col gap-1.5">
              {last3Sidebars.map((links: SidebarLink, id: number) => (
                <li key={id}>
                  <Link
                    href={links.path}
                    className={`flex items-center gap-2.5 ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-sm text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                  >
                    <span
                      className={` ${pathname === links.path && "text-orange-500"}`}
                    >
                      {links.icon}
                    </span>
                    {links.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <UserAvatar
            userEmail={data?.user?.email ?? ""}
            userName={data?.user?.name ?? ""}
            avatar={data?.user?.image ?? ""}
            hideAvatarText={true}
            hideLogoutBtn={true}
            isVendor={isVendor}
          />
        </div>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { data } = useSession();
  const sidebarLinks = getSidebarIcons({ role: data?.user?.role });
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size={"icon"}>
            <RiMenu2Fill size={25} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="dm_sans z-[9999] flex h-full w-[75%] flex-col overflow-y-auto bg-white"
        >
          <div className="flex items-center justify-between gap-2 py-5 lg:py-6">
            <Link href="/dashboard">
              <Image width={176} height={32} src={Logo} alt="Logo" priority />
            </Link>
          </div>
          <div className="flex h-full flex-col justify-between">
            <nav className="mt-2 py-4">
              <ul className="flex flex-col gap-1.5">
                {sidebarLinks
                  .slice(0, 5)
                  .map((links: SidebarLink | null, id: number) => {
                    if (!links) {
                      return null;
                    }

                    return (
                      <li key={id}>
                        <Link
                          href={links.path}
                          className={`flex items-center gap-2.5 whitespace-nowrap ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-xs text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                        >
                          <SheetClose className="flex w-full items-center justify-between gap-2.5 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={` ${pathname === links.path && "text-orange-500"}`}
                              >
                                {links.icon}
                              </span>
                              {links.name}
                            </div>
                            <span
                              className={`rounded-[10px] bg-[#F8FFED] px-2`}
                            >
                              {links.count}
                            </span>
                          </SheetClose>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>
            <nav className="flex flex-col gap-10 py-6">
              <ul className="flex flex-col gap-1.5">
                {last3Sidebars.map((links: SidebarLink, id: number) => (
                  <li key={id}>
                    <Link
                      href={links.path}
                      className={`flex items-center whitespace-nowrap ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-xs text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                    >
                      <SheetClose className="flex w-full items-center gap-2.5 whitespace-nowrap">
                        <span
                          className={` ${pathname === links.path && "text-orange-500"}`}
                        >
                          {links.icon}
                        </span>
                        {links.name}
                      </SheetClose>
                    </Link>
                  </li>
                ))}
              </ul>
              <UserAvatar
                userEmail={data?.user?.email ?? ""}
                userName={data?.user?.name ?? ""}
                avatar={data?.user?.image ?? ""}
                hideAvatarText={false}
                hideLogoutBtn={false}
              />
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
