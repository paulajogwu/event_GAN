import React from "react";
import handWithPhone from "~/public/img/hand.png";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import circleImage1 from "~/public/img/avatar1.png";
import circleImage2 from "~/public/img/avatar2.png";
import circleImage3 from "~/public/img/avatar3.png";
import circleImage4 from "~/public/img/avatar4.png";

function FifthSection() {
  const avatarImage = [
    { image: circleImage1, position: "top-1/2 right-2 left-[21rem]" },
    { image: circleImage2, position: "top-2 right-2 md:left-[20rem] " },
    { image: circleImage3, position: "top-2 left-3" },
    { image: circleImage4, position: "bottom-10 left-3" },
  ];
  return (
    <section className="mx-auto mb-10 mt-8 flex items-center left  justify-center border border-[#FFBA3B1F] bg-gradient-to-r from-[#FFFEFB] to-[#F7FFDE] py-9 lg:w-[84%]">
      <div className="mx-auto grid w-full grid-cols-1 gap-10 px-4 md:grid-cols-2 lg:px-10">
        <div className="satoshi flex max-w-full flex-col justify-between">
          <div>
          <h1 className="py-3 text-3xl font-extrabold text-black sm:text-4xl md:text-5xl">
            Seamless and Efficient <br className="hidden lg:block" />
            <span className="text-[#FFBA3B]">Vendor Communication</span>
          </h1>
          <p className="satoshi text-lg py-3 text-[#363F52] font-bold ">
            Easily plan any event with our step-by-step guide from concept to
            execution.
          </p>
          </div>
          <Link
            href={"/"}
            className="mt-4 flex items-center font-bold text-lg gap-x-3 text-[#FFBA3B] md:justify-start"
          >
            Get Started
            <span>
              <IoArrowForwardCircleOutline size={19} />
            </span>
          </Link>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-[25rem] w-full">
            <Image
              src={handWithPhone}
              alt="image"
              height={300}
              width={300}
              className="object-cover"
            />
          </div>
          {avatarImage.map((image, id) => (
            <div key={id} className={`${image.position} absolute z-50`}>
              <Image
                src={image.image}
                alt="image"
                height={60}
                width={60}
                className="rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FifthSection;
