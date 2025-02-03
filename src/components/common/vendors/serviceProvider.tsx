import React from "react";

// import Placeholder from "~/public/img/placeholder.png";
// import LocationIcon from "~/public/img/vendor/icons/location.svg";
// import ElevatorsIcon from "~/public/img/vendor/icons/elevators.svg";
import RoomIcon from "~/public/img/vendor/icons/room.svg";
import { Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Service as PrismaService } from "@prisma/client";
import picsumPhoto from "~/public/img/piscum-photo.jpg";

interface ServiceWithPriceRange extends PrismaService {
  lowerPriceRange?: number; // Or string, based on your needs
  upperPriceRange?: number;
}

const ServiceProvider = ({ name }: ServiceWithPriceRange) => {
  return (
    <div className="satoshi w-full max-w-[457px] overflow-hidden rounded-xl border border-[#E5EFFF]">
      <div className="relative h-[240px]">
        <Image
          src={picsumPhoto}
          alt="listing image"
          fill
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-y-3 bg-white p-2 md:p-3">
        <p className="text-xl font-medium text-[#333333]">{name}</p>
        {/* <p className="text-xs font-medium text-[#666666]">{description}</p> */}
        {/* <p className="text-sm font-medium text-[#666666]">
          {" "}
          ${lowerPriceRange} - ${upperPriceRange}
        </p> */}

        <div className="flex w-full items-center justify-between gap-x-2 border-t border-t-[#E5EFFF] pt-3">
          {/* <div className="flex w-full items-center justify-center gap-x-1 bg-[#E5EFFF] px-2 py-[11.5px]">
            <Image src={LocationIcon} alt="" />
            <p className="text-sm font-medium text-[#4C4C4C]">India</p>
          </div>
          <div className="flex w-full items-center justify-center gap-x-1 bg-[#E5EFFF] px-2 py-[11.5px]">
            <Image src={ElevatorsIcon} alt="" />
            <p className="text-sm font-medium text-[#4C4C4C]">Elevators</p>
          </div> */}
          <div className="flex w-full items-center justify-center gap-x-1 bg-[#E5EFFF] px-2 py-[11.5px]">
            <Image src={RoomIcon} alt="" />
            {/* <p className="text-sm font-medium text-[#4C4C4C]">
              Capacity {lowerCapacity} - {upperCapacity}
            </p> */}
          </div>
        </div>

        <div className="flex items-center gap-x-5">
          <Button className="bg_blue_gradient w-full py-6 text-sm text-white">
            View Details
          </Button>
          <div className="rounded-lg border border-[#CCE0FF] px-4 py-[14.5px]">
            <Heart color="#136ADF" size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
