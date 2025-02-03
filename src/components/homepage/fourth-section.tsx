import React from "react";
import bgImage from "~/public/img/full-img.jpeg";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

function FourthSection() {
  return (
    <section className="mx-auto mb-10 mt-8 flex items-center justify-center py-9 lg:w-[84%] h-[604px]">
      <div className="mx-auto grid w-full grid-cols-2 gap-8 px-4 h-full ">
        <div className="relative col-span-2 flex h-full  max-w-full flex-col">
          <Image
            src={bgImage}
            alt={"bg-image"}
            fill
            // objectFit="cover"
            // objectPosition="center"
            className="h-full w-auto object-center rounded-t-xl object-cover"
          />
          <div className="satoshi absolute bottom-0 w-full bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)] px-4 py-5">
            <h1 className="py-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Comprehensive
              <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
                Vendor Management
              </span>
            </h1>
            <p className="py-3 text-white">
              Easily plan any event with our step-by-step guide from concept to
              execution.
            </p>
            <Link
              href={"/"}
              className="mt-4 flex items-center gap-x-3 text-white md:justify-start"
            >
              Get Started
              <span>
                <IoArrowForwardCircleOutline size={19} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FourthSection;
