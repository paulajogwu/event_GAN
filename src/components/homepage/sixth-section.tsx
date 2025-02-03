import Link from "next/link";
import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import bgImage from "~/public/img/Firefly.png";

function SixthSection() {
  return (
    <section className="mx-auto mb-10 mt-8 flex items-center justify-center rounded-2xl border-2 border-[#4080D70A] bg-gradient-to-r from-[#FFFEFB] to-[#F7FFDE] lg:w-[84%]">
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
          backgroundSize: "cover",
        }}
        className="mx-auto h-full w-full gap-8 px-4 lg:px-10 flex  justify-end"
      >
        <div className=" relative flex h-[27rem] w-full max-w-xl">
          <div className="w-full">
            <h1 className="dm_sans py-3 text-3xl font-bold text-[#1B1F28] sm:text-4xl md:text-5xl">
              Advanced AI Recommendations for {" "}
              <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
                Event Planning
              </span>
            </h1>
            <p className="dm_sans py-3 text-lg font-bold text-[#363F52]">
              Easily plan any event with our step-by-step guide from concept to
              execution.
            </p>
         
          <Link
            href={"/"}
            className="satoshi mt-4 flex items-center gap-x-3 bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-[17.1px] font-bold text-transparent md:justify-start"
          >
            Get Started
            <span>
              <IoArrowForwardCircleOutline size={19} color="#136ADF" />
            </span>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SixthSection;
