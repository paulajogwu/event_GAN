import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { fCurrency } from "@/lib/format-number";
import { Roles } from "@prisma/client";
// import Image from 'next/image';
import Link from "next/link";
import React from "react";
import { PiCaretRightBold } from "react-icons/pi";
import { TbCalendarPlus } from "react-icons/tb";
import dayjs from "dayjs";

export interface UpcomingEventCardProps {
  title: string;
  description: string;
  tags: string[];
  date?: string;
  price?: number;
  rate?: string;
  id?: number | string;
  cardLink: string;
  status?: string;
  location?: string;
}

function UpcomingEventCard({
  title,
  description,
  tags,
  date,
  price,
  rate,
  location,
  status,
  cardLink,
}: UpcomingEventCardProps) {
  return (
    <Card className="satoshi rounded-[10px] border-[#F0F2F5] bg-[#FFFFFF] px-4 2xl:px-6">
      <CardHeader className="flex flex-row items-center justify-between px-0 py-3">
        <div className="relative h-10 w-10">
          {/* <Avatar className=' h-full w-full'>
                        <AvatarImage sizes='60' src={profilePicture} />
                        <AvatarFallback>O</AvatarFallback>
                    </Avatar> */}
        </div>
        <div className="flex items-center justify-center gap-x-2 rounded-full bg-[#E7F6EC] px-4 py-1 text-center text-xs font-bold text-[#036B26]">
          <TbCalendarPlus size={19} color="#036B26" fill="#036B26" />{" "}
          {status !== "TEMP"
            ? dayjs(date).format("DD MMM YYYY")
            : fCurrency(price)}
        </div>
      </CardHeader>
      <Link href={`${cardLink}`}>
        <CardContent className="satoshi flex w-full items-center justify-between px-0">
          <div className="flex flex-col gap-y-1">
            <h1 className="line-clamp-2 text-xl font-bold text-[#101928]">
              {title}
            </h1>
            <p className="line-clamp-2 text-xs font-medium text-[#667185]">
              {location}
            </p>
            <p className="line-clamp-2 text-xs font-medium text-[#667185]">
              {description}
            </p>
          </div>
          <span>
            <PiCaretRightBold color="#F44E2A" size={25} />
          </span>
        </CardContent>
      </Link>
      <div className="mx-auto h-[1px] w-full bg-[#F0F2F5]" />
      <CardFooter className="flex items-center justify-between gap-x-3 px-0 py-3">
        <div className="flex items-center text-xs text-[#667185]">
          <p className="line-clamp-1">{tags.join(", ")}</p>
        </div>
        {rate && (
          <div className="text-base font-bold text-[#0F973D]">{rate}%</div>
        )}
        {status && (
          <div
            className={`text-sm font-bold capitalize text-[#0F973D] ${status === "completed" && "text-[#0F973D]"}`}
          >
            {status}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default UpcomingEventCard;
