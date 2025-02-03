"use client";

import React, { useEffect, useState } from "react";
import event1 from "~/public/img/event.png";
import event2 from "~/public/img/event1.png";
import event3 from "~/public/img/event2.png";
import event4 from "~/public/img/event3.png";
import { PiDeviceMobileSpeaker } from "react-icons/pi";
import { PiMonitor } from "react-icons/pi";
import { IoCarOutline } from "react-icons/io5";
import { PiStorefrontLight } from "react-icons/pi";
import { PiHouseLineLight } from "react-icons/pi";
import { PiTShirtLight } from "react-icons/pi";
import EventsHeroSection from "@/components/events/events-hero-section";
import { Card } from "@/components/ui/card";
import EventCard from "@/components/events/event-card";
import { DescriptionCard } from "@/components/events/footer-cards";
import astraDb from "@/lib/astraDatabase";

const events = [
  {
    id: "1",
    image: event1,
    title: "95 sitting capicity hall",
    description:
      "Ideal for birthdays, seminars, and weddings receptions; Includes a small stage and great lake view.",
    location: "India",
    roomCount: 3,
    elevator: "Yes",
  },
  {
    id: "2",
    image: event2,
    title: "60 sitting capicity hall",
    description:
      "Great area for small parties and family gatherings. Space for small bar.",
    location: "India",
    roomCount: 5,
    elevator: "Yes",
  },
  {
    id: "3",
    image: event3,
    title: "300 seater amphitheatre",
    description:
      "Perfect for corporate events and reunions; Dining area and spacious dance floor.",
    location: "India",
    roomCount: 2,
    elevator: "No",
  },
  {
    id: "4",
    image: event4,
    title: "150 seater banquet hall",
    description:
      "Ideal for large presentations; Tiered seating, spacious stage, and high-quality sound and lighting.",
    location: "India",
    roomCount: 1,
    elevator: "N/A",
  },
];

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
    title: "Personal Services and Branding ",
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

function Events() {
  const [first10Vendors, setFirst10Vendors] = useState([]);

  const vendors = astraDb.collection("vendors");

  useEffect(() => {
    async function fetchVendors() {
      const data = await vendors
        .find(
          {},
          {
            limit: 5,
          },
        )
        .toArray();
      // @ts-expect-error first10vedors
      setFirst10Vendors(data);
    }

    fetchVendors();
  }, [vendors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(first10Vendors);
    }
  }, [first10Vendors]);

  return (
    <section className="w-full bg-[#FFFFFF]">
      <EventsHeroSection />
      <div className="grid grid-cols-1 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:px-5 xl:gap-10 xl:px-10 2xl:gap-4">
        <div className="col-span-1 hidden h-full lg:flex">
          <Card className="mx-auto h-full lg:w-full xl:w-[80%]">div</Card>
        </div>
        <div className="col-span-2 w-full">
          <div className="satoshi mx-auto my-3 flex w-full items-center justify-between border-b border-[#E5EFFF] py-3 sm:max-w-lg md:max-w-2xl lg:max-w-full">
            <h1 className="text-xl font-medium text-[#333333]">
              Catergory goes here
            </h1>
            <div className="flex items-center gap-x-3">
              <span>previous</span>
              <span>next</span>
            </div>
          </div>

          {/* cards */}
          <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-2 lg:gap-5 lg:p-0 xl:gap-10 2xl:grid-cols-3 2xl:gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-full px-4 py-10 xl:px-16">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5 xl:gap-10 2xl:grid-cols-3">
          {eventDetails.map((event) => (
            <DescriptionCard
              key={event.id}
              id={event.id}
              counts={event.counts}
              title={event.title}
              name={event.name}
              icon={event.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
