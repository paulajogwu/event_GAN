"use client";

import React, { useState } from "react";
import { AccordionItem } from "../common/accordion";
import { LuMinusCircle } from "react-icons/lu";
import { SlPlus } from "react-icons/sl";

function Faqs() {
  const [openId, setOpenId] = useState<React.Key | null>(1);

  const handleToggle = (id: React.Key) => {
    setOpenId(openId === id ? null : id);
  };

  const accordionItems = [
    {
      id: 1,
      title: "Is there a free trial available?",
      descripton: ` Yes, you can try us for free for 30 days. If you want, we’ll
              provide you with a free, personalized 30-minute onboarding call to
              get you up and running as soon as possible.`,
    },
    {
      id: 2,
      title: "Can I change my plan later?",
      descripton: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis porro quisquam non nihil laboriosam, nostrum voluptate ex animi`,
    },
    {
      id: 3,
      title: "What is your cancellation policy?",
      descripton:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis porro quisquam non nihil laboriosam, nostrum voluptate ex animi",
    },
    {
      id: 4,
      title: "Can other info be added to an invoice?",
      descripton:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis porro quisquam non nihil laboriosam, nostrum voluptate ex animi",
    },
    {
      id: 5,
      title: "How does billing work?",
      descripton:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis porro quisquam non nihil laboriosam, nostrum voluptate ex animi",
    },
    {
      id: 6,
      title: "How do I change my account email?",
      descripton:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque veritatis porro quisquam non nihil laboriosam, nostrum voluptate ex animi",
    },
  ];
  return (
    <div className="h-full w-full px-4 py-5">
      <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-5 lg:flex-row">
        <div className="flex w-full flex-col">
          <div className="satoshi mb-4 w-fit rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#FFFEF8] to-[#EBF2FF] px-5 py-2 text-sm font-bold text-[#4C4C4C] shadow">
            <p>FAQ</p>
          </div>
          <h1 className="md:line-height py-3 text-4xl font-bold text-[#001B3F] sm:text-4xl md:text-5xl lg:text-[49.6px]">
            Answers to our <br />
            <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
              frequently asked <br /> questions
            </span>{" "}
          </h1>
        </div>

        <div className="w-full">
          {accordionItems.map((items) => (
            <AccordionItem
              key={items.id}
              id={items.id}
              title={items.title}
              OpenIcon={<LuMinusCircle size={20} color="#004AAD" />}
              CloseIcon={<SlPlus size={20} color="#004AAD" />}
              isOpen={items.id === openId}
              onClick={handleToggle}
              titleStyle="text-[#333333] satoshi font-bold text-[18px]"
            >
              <p className="dm_sans text-[19px] font-normal text-[#4B4C4C]">
                {items.descripton}
              </p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
