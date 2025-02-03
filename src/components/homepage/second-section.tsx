import React from "react";
import reactImage from "~/public/img/rectangle.png";
import Image from "next/image";
import bgDots from "~/public/img/dots.png";
import groupImg from "~/public/img/group-img.jpg";

function SecondSection() {
  return (
    <section className="mx-auto mt-8 flex items-center justify-center py-7 lg:w-[84%]">
      <div className="mx-auto grid w-full grid-cols-1 gap-2 px-4 md:grid-cols-3 lg:px-10">
        <div className="col-span-1 flex w-full h-full  items-center justify-center md:h-[650px]">
          <div className="h-[472px] md:h-full">
            <Image
              src={reactImage}
              alt="image"
              height={500}
              width={500}
              className="h-[30rem] w-full rounded-xl object-cover md:h-full"
            />
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${bgDots.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition:"center"
          }}
          className="relative z-30 mx-auto p-4 md:col-span-2"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FBFDFF] to-[#EBF2FF] opacity-75" />
          <div className="relative">
            <div className="mb-3 w-fit rounded-full bg-gradient-to-r from-[#FFFFFF] via-[rgb(255,254,248)] to-[#EBF2FF] px-5 py-2 text-sm shadow">
              It&apos;s too way simple 😊
            </div>
            <div>
              <h1 className="py-3 text-3xl font-bold text-[#001B3F] sm:text-4xl md:text-5xl">
                Effortless and Intuitive
                <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
                  Event Planning
                </span>
              </h1>
              <p className="py-3 font-medium text-[18.7px] satoshi">
                Easily plan any event with our intuitive step-by-step guide, helping you navigate every stage from initial concept to final execution, ensuring no detail is overlooked.
              </p>
              <div className="flex h-[10rem] items-center justify-end sm:max-w-lg">
                <Image
                  src={groupImg}
                  alt="image"
                  height={600}
                  width={600}
                  className="h-[10rem] w-auto rounded-md object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
