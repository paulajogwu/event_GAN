"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GrElevator } from "react-icons/gr";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdOutlineBedroomParent } from "react-icons/md";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface EventCardProps {
  imageStyle?: string;
  buttonStyle?: string;
  iconColor?: string;
  hideGridButton?: boolean;
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

function EventCard({
  event,
  imageStyle = "h-[14rem]",
  buttonStyle = "bg-gradient-to-r from-[#136ADF] to-[#3B8EFD]",
  iconColor = "#136ADF",
  hideGridButton = false,
}: EventCardProps) {
  const [favorite, setFavorite] = useState<boolean>(true);

  // const handleFavoriteEvent = async () => {
  //   setFavorite(!favorite);
  // };

  const gridsBtn = [
    { icon: <CiLocationOn size={20} />, name: event.location },
    { icon: <GrElevator size={20} />, name: event.elevator },
    {
      icon: <MdOutlineBedroomParent size={20} />,
      name: `${event.roomCount} Rooms`,
    },
  ];
  return (
    <>
      <Card className="satoshi mx-auto w-full rounded-xl border border-[#E5EFFF] bg-[#FFFFFF] shadow-sm sm:max-w-lg">
        <CardContent className="flex w-full flex-col p-0">
          <div className={`relative ${imageStyle} w-full`}>
            <Image
              src={event.image}
              fill
              alt="event_image"
              priority
              className="h-full w-full rounded-t-xl object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-y-3 px-3 py-3 lg:px-6 xl:p-4 2xl:px-3">
            <CardHeader className="border-b border-[#E5EFFF] p-0">
              <CardTitle className="text-xl font-medium text-[#333333]">
                {event.title}
              </CardTitle>
              <div className="line-clamp-2 pb-2 text-[#666666]">
                <blockquote className="line-clamp-2 text-[#666666]">
                  {event.description}
                </blockquote>
              </div>
            </CardHeader>
            <div
              className={`${hideGridButton === true && "hidden"} grid grid-cols-2 gap-2 text-[#4C4C4C] sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-2`}
            >
              {gridsBtn.map((btn, id) => (
                <div
                  key={id}
                  className={` ${id === 2 && "col-span-full sm:col-span-1 md:col-span-full lg:col-span-full xl:col-span-1 2xl:col-span-full"} flex items-center justify-center gap-x-2 rounded border-[#E5EFFF] bg-[#F7FAFF] px-3 py-2.5 text-sm`}
                >
                  {btn.icon}
                  <p>{btn.name}</p>
                </div>
              ))}
            </div>
            {/* <div className='flex items-center justify-between w-full gap-x-3'>
              <Link href={`/dashboard/events/${event.id}`} className='flex-1 '>
                <Button
                  className={`flex items-center w-full  justify-center rounded-md py-3.5 px-5 ${buttonStyle} text-white text-sm font-medium`}>
                  View Details
                </Button>
              </Link>

              <Button
                onClick={() => handleFavoriteEvent()}
                className="flex w-14 items-center justify-center rounded-lg border-[#CCE0FF]  bg-[#FAFCFF] p-4"
              >
                {favorite ? (
                  <IoIosHeartEmpty size={25} color={iconColor} />
                ) : (
                  <IoMdHeart fill={iconColor} size={25} />
                )}
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default EventCard;
