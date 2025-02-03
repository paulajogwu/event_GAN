"use client"; // If you're using Next.js with client-side rendering

import React, { useState } from "react";
import bgImage from "~/public/img/full-img2.jpeg";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

function LastSection() {
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide

  const swipeQuotes = [
    {
      quote: `“I'm already getting calls from people all around the world in  different functions who have heard about Planhat and want to get  onboard.”`,
      by: "Peculiar Keys",
    },
    {
      quote: `“I'm already getting calls from people all around the world in  different functions who have heard about Planhat and want to get  onboard.”`,
      by: "Peculiar Keys",
    },
    {
      quote: `“I'm already getting calls from people all around the world in  different functions who have heard about Planhat and want to get  onboard.”`,
      by: "Peculiar Keys",
    },
  ];

  const totalSlides = swipeQuotes.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <section className="max-w-screen relative mx-auto mt-8 flex items-center justify-center pt-9">
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: "content-box",
        }}
        className="h-full w-full md:h-[25rem] lg:h-[600px]"
      >
        <div className="relative bottom-0 z-10 mx-auto grid h-full w-full grid-cols-1 gap-10 bg-black bg-opacity-50 px-4 pt-16 md:grid-cols-2 lg:px-10 xl:px-36">
          <div className="satoshi flex flex-col justify-end text-white py-6">
            <h1 className="text-4xl font-bold">
              We are changing <br /> the way events <br /> are planned forever.
            </h1>
            <Link
              href={"/"}
              className="mt-4 flex items-center gap-x-3 text-[17.1px] font-bold text-[#FFBA3B]"
            >
              Get Started
              <span>
                <IoArrowForwardCircleOutline size={19} />
              </span>
            </Link>
          </div>
          <div className="flex flex-col items-end justify-end">
            <button onClick={prevSlide} className="mb-2 text-white group"> 
                <BsArrowLeft size={25} />
            </button>
            <div className="carousel w-full max-w-[440px] h-fit max-h-fit">
              {swipeQuotes.map((quote, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {index === currentSlide && (
                    <div className="rounded-md bg-white bg-opacity-75 px-6 py-16 flex flex-col justify-center">
                      <blockquote className="py-3 text-lg font-bold text-black">
                        {quote.quote}
                      </blockquote>
                      <h1 className="font-semibold text-black">{quote.by}</h1>
                      <p className="text-gray-700">Co-founder, Eventgizmo</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={nextSlide} className="mt-2 text-white">
              <BsArrowRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LastSection;
