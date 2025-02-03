import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Stars from "~/public/img/vendor/stars.svg";
import VendorHeader from "./header";

const LandingPage = () => {
  return (
    <div className="w-full">
      <section
        className="flex w-full flex-col items-center gap-y-4 bg-cover bg-no-repeat pb-[141px] pt-[71px]"
        style={{
          backgroundImage: 'url("img/vendor/bg.png")',
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
            Plan a whole event with just a click,{" "}
            <span className="text_blue">no middle man.</span>
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
    </div>
  );
};

export default LandingPage;
