import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Stars from "~/public/img/vendor/stars.svg";
import VendorHeader from "./header";
import VendorItem from "./vendorItem";
// import event1 from "~/public/img/event.png";
// import event2 from "~/public/img/event1.png";
// import event3 from "~/public/img/event2.png";
// import event4 from "~/public/img/event3.png";
// import { PiDeviceMobileSpeaker } from "react-icons/pi";
// import { PiMonitor } from "react-icons/pi";
// import { IoCarOutline } from "react-icons/io5";
// import { PiStorefrontLight } from "react-icons/pi";
// import { PiHouseLineLight } from "react-icons/pi";
// import { PiTShirtLight } from "react-icons/pi";

// const events = [
//   {
//     id: "1",
//     image: event1,
//     title: "95 sitting capicity hall",
//     description:
//       "Ideal for birthdays, seminars, and weddings receptions; Includes a small stage and great lake view.",
//     location: "India",
//     roomCount: 3,
//     elevator: "Yes",
//   },
//   {
//     id: "2",
//     image: event2,
//     title: "60 sitting capicity hall",
//     description:
//       "Great area for small parties and family gatherings. Space for small bar.",
//     location: "India",
//     roomCount: 5,
//     elevator: "Yes",
//   },
//   {
//     id: "3",
//     image: event3,
//     title: "300 seater amphitheatre",
//     description:
//       "Perfect for corporate events and reunions; Dining area and spacious dance floor.",
//     location: "India",
//     roomCount: 2,
//     elevator: "No",
//   },
//   {
//     id: "4",
//     image: event4,
//     title: "150 seater banquet hall",
//     description:
//       "Ideal for large presentations; Tiered seating, spacious stage, and high-quality sound and lighting.",
//     location: "India",
//     roomCount: 1,
//     elevator: "N/A",
//   },
// ];

// const eventDetails = [
//   {
//     title: "Venues and Setup",
//     counts: "(69,114)",
//     link: "/events/1",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 1,
//     icon: <PiDeviceMobileSpeaker />,
//   },
//   {
//     title: "Catering and Bar Services",
//     counts: "(69,114)",
//     link: "/events/2",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 2,
//     icon: <PiMonitor />,
//   },
//   {
//     title: "Entertainment and Activities",
//     counts: "(69,114)",
//     link: "/events/3",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 3,
//     icon: <IoCarOutline />,
//   },
//   {
//     title: "Decor and Atmosphere",
//     counts: "(69,114)",
//     link: "/events/4",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 4,
//     icon: <PiStorefrontLight />,
//   },
//   {
//     title: "Logistics and Support Services",
//     counts: "(69,114)",
//     link: "/events/5",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 5,
//     icon: <PiHouseLineLight />,
//   },
//   {
//     title: "Personal Services and Branding ",
//     counts: "(69,114)",
//     link: "/events/6",
//     name: [
//       "Halls",
//       "Tables, Chairs, Tents",
//       "Furniture and Lounge Rentals",
//       "View All",
//     ],
//     id: 6,
//     icon: <PiTShirtLight />,
//   },
// ];

const VendorSearch = () => {
  return (
    <div className="w-full">
      <section
        className="flex w-full flex-col items-center gap-y-4 bg-cover bg-no-repeat pb-[141px] pt-[71px]"
        style={{
          backgroundImage: 'url("/img/vendor/bg.png")',
        }}
      >
        <VendorHeader />
        <div className="flex w-full flex-col items-center gap-y-4">
          <span
            style={{
              background:
                "linear-gradient(96.8deg, #FFFFFF -27.3%, #FFFEF8 20.36%, #EBF2FF 71.58%)",
            }}
            className="rounded-full border border-[#F6F6F6] px-4 py-[10px] text-center text-sm font-bold"
          >
            Event planning, but way too simple 😊
          </span>
          <h1 className="mx-auto max-w-[900px] text-center text-[71px] font-bold leading-[89.38px] text-dark_blue">
            What are you looking for ?
          </h1>

          <p className="mx-auto max-w-[691px] text-center text-[20px] leading-[20px] text-grey_3">
            Get an all round budget and booking for vendors, locations in one
            search. Join our waitlist to be the first to use the AI tool and get
            latest updates.
          </p>

          <div className="flex items-center gap-x-[40px]">
            <Button className="bg_blue_gradient gap-x-2 text-sm text-white">
              Plan an event
              <Image src={Stars} alt="stars icon" />
            </Button>
            <Button
              className="border border-[#1F5BD1] bg-transparent text-sm text-[#1F5BD1]"
              variant="outline"
            >
              Vendor sign-in
            </Button>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center gap-x-[55px] px-[50px]">
        <aside></aside>
        <section className="">
          <div className="">
            <div className="">Category Goes here</div>

            <div className="grid w-full grid-cols-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <VendorItem key={item} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default VendorSearch;
