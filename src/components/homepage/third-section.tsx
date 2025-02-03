import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import searchImage from "~/public/img/search.svg";

function ThirdSection() {
  return (
    <section className="mx-auto mt-8 flex items-center justify-center py-9 lg:max-w-[84%] md:h-[400px]">
      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:px-10 h-full ">
        <div className="satoshi flex max-w-full flex-col justify-center gap-6">
          {[
            "Describe Event",
            "AI Crafts Plan",
            "Choose a plan",
            "Watch the magic happen",
          ].map((item, i) => (
            <div
              key={i}
              className={`${i === 0 ? "bg-[#F7FBFF]" : null} flex w-full items-center gap-x-3 rounded-[10px] border border-[#E5EFFF] p-5 shadow-sm`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#CCE0FF] bg-[#F7FAFF] text-[#136ADF]">
                {i + 1 < 10 ? `0${i + 1}` : i + 1}
              </div>
              <p className="satoshi text-[16px] font-bold text-[#4C4C4C]">{item}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border flex flex-col justify-center border-[#E5EFFF] bg-gradient-to-br from-[#FFFFFF] via-[#FFFEFB] to-[#DCEBFF] px-10 py-2 shadow-md">
          <div className="flex flex-col py-4">
            <Image
              src={searchImage}
              alt={"Search Image"}
              height={100}
              width={100}
              className="object-cover"
            />
          </div>
          <div className="satoshi flex flex-col text-left">
            <h1 className="py-2 text-lg font-semibold text-[#333333]">
              Describe Event
            </h1>
            <p className="py-2 text-sm font-medium text-[#666666]">
              EventGizmo simplifies event planning to its essence—your vision.
              With just one click on "Plan Event," you're invited to share your
              event idea.
            </p>
          </div>
          <Link
            href={"/"}
            className="satoshi mt-4 flex items-center text-lg font-bold text-[#06080A] gap-x-3 md:justify-start"
          >
            Get Started
            <span>
              <IoArrowForwardCircleOutline size={19} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ThirdSection;
