import React from "react";
import {
  PiDeviceMobileSpeaker,
  PiHouseLineLight,
  PiMonitor,
  PiStorefrontLight,
  PiTShirtLight,
} from "react-icons/pi";
import { IoArrowForwardCircleOutline, IoCarOutline } from "react-icons/io5";
import { DescriptionCard } from "../events/footer-cards";
import Link from "next/link";

function PopularServices() {
    const eventDetails = [
      {
        title: "Venues and Setup",
        counts: "(69,114)",
        link: "/events/1",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 1,
        icon: <PiDeviceMobileSpeaker />,
      },
      {
        title: "Catering and Bar Services",
        counts: "(69,114)",
        link: "/events/2",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 2,
        icon: <PiMonitor />,
      },
      {
        title: "Entertainment and Activities",
        counts: "(69,114)",
        link: "/events/3",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 3,
        icon: <IoCarOutline />,
      },
      {
        title: "Decor and Atmosphere",
        counts: "(69,114)",
        link: "/events/4",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 4,
        icon: <PiStorefrontLight />,
      },
      {
        title: "Logistics and Support Services",
        counts: "(69,114)",
        link: "/events/5",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 5,
        icon: <PiHouseLineLight />,
      },
      {
        title: "Personal Services and Branding",
        counts: "(69,114)",
        link: "/events/6",
        name: [
          "Halls",
          "Tables, Chairs, Tents",
          "Furniture and Lounge Rentals",
          "View All",
        ],
        id: 6,
        icon: <PiTShirtLight />,
      },
    ];
  
    return (
      <div className="w-full h-full py-5">
        <div className="container mx-auto flex flex-col px-4 xl:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="satoshi text-[32px] font-extrabold text-[#1B1F28] md:text-[49.6px]">
              Popular services
            </h1>
            <Link
              href={""}
              className="flex items-center gap-2 text-[16px] font-medium text-[#4080D7] md:text-[17.16px]"
            >
              Explore marketplace
              <IoArrowForwardCircleOutline size={19} color="#136ADF" />
            </Link>
          </div>
  
          {/* Service cards */}
          <div className="satoshi grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {eventDetails.map((event) => (
              <DescriptionCard
                key={event.id}
                counts={event.counts}
                title={event.title}
                name={event.name}
                icon={event.icon}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  export default PopularServices;
  