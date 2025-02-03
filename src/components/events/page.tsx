"use client";

import { IoCarOutline } from "react-icons/io5";
import {
  PiDeviceMobileSpeaker,
  PiHouseLineLight,
  PiMonitor,
  PiStorefrontLight,
  PiTShirtLight,
} from "react-icons/pi";
import event1 from "~/public/img/event.png";
import event2 from "~/public/img/event1.png";
import event3 from "~/public/img/event2.png";
import event4 from "~/public/img/event3.png";
import EventCard from "./event-card";
import EventsHeroSection from "./events-hero-section";
import { Accordion } from "./events-sidebar";
import { DescriptionCard } from "./footer-cards";

function Events() {
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
      roomCount: 0,
      elevator: "N/A",
    },
    {
      id: "5",
      image: event3,
      title: "150 seater banquet hall",
      description:
        "Ideal for large presentations; Tiered seating, spacious stage, and high-quality sound and lighting.",
      location: "India",
      roomCount: 2,
      elevator: "N/A",
    },
    {
      id: "6",
      image: event1,
      title: "150 seater banquet hall",
      description:
        "Ideal for large presentations; Tiered seating, spacious stage, and high-quality sound and lighting.",
      location: "India",
      roomCount: 4,
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

  const sellterType = ["Member", "Non Member", "Verified Seller", "Urgents"];
  const venueSetup = [
    "Hall",
    "Tables, Chairs, Tents",
    "Furniture, Lounge Rentals",
    "Tv & Video Accesories",
  ];
  const conditions = ["Any", "New", "Used"];
  const topLocations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  return (
    <section className="w-full bg-[#FFFFFF]">
      <EventsHeroSection />
      <div className="grid grid-cols-1 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:px-5 xl:gap-10 xl:px-10 2xl:gap-4">
        {/* Accordion in the sidebar */}
        <aside className="col-span-1 hidden h-full lg:flex">
          <Accordion
            topLocations={topLocations}
            conditions={conditions}
            sellerTypes={sellterType}
            venueSetup={venueSetup}
          />
        </aside>

        <div className="col-span-2 w-full">
          {/* <div className="w-full flex-1 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button><MdMenuOpen size={20} /></Button>
              </SheetTrigger>
              <SheetContent side={'left'} className="w-full bg-white z-[50]">
                <div className="py-5">
                  <Accordion
                    topLocations={topLocations}
                    conditions={conditions}
                    sellerTypes={sellterType}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div> */}

          <div className="satoshi mx-auto mb-4 flex w-full items-center justify-between border-b border-[#E5EFFF] pb-3 sm:max-w-lg md:max-w-2xl lg:max-w-full">
            <h1 className="pb-3 text-xl font-medium text-[#333333]">
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
