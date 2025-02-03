import React from "react";
import bgGradient from "~/public/img/bg-gradient.png";
import { BsStars } from "react-icons/bs";
import { Button } from "../ui/button";
import Link from "next/link";

function HeroSection() {
  return (
    <section
      className="flex h-[45rem] w-full flex-col items-center justify-center rounded-b-[30px] px-4"
      style={{
        backgroundImage: `url(${bgGradient.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center">
        <div className="satoshi mb-4 rounded-full bg-gradient-to-r from-[#FFFFFF] via-[rgb(255,254,248)] to-[#EBF2FF] px-5 py-2 text-sm font-bold text-[#4C4C4C] shadow">
          <p>Event planning, but way too simple 😊</p>
        </div>
        <div className="text-center">
          <h1 className="md:line-height py-3 text-4xl font-bold text-[#001B3F] sm:text-4xl md:text-5xl lg:text-[71.5px]">
            Plan a whole event with just
            <br className="hidden lg:block" /> a click,
            <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
              no middle man.
            </span>
          </h1>
          <p className="dm_sans py-5 text-sm font-normal text-[#4B4C4C] md:text-xl">
            Get an all round budget and booking for vendors, locations in one
            search.
            <br className="hidden md:flex" />
            Join our waitlist to be the first to use the AI tool and get latest
            updates.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:flex-row md:gap-8">
          <Link href={"/user/"}>
            <Button className="flex items-center gap-x-2 rounded-lg bg-gradient-to-r from-[#136ADF] to-[#237DF6] px-4 py-3.5 text-center text-[#FFFFFF]">
              Plan an Event <BsStars size={18} color="white" />
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button
              variant="outline"
              className="flex gap-x-2 rounded-lg border-2 border-[#1F5BD1] px-4 py-3.5 text-center text-blue-500"
            >
              Vendor sign-in
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
