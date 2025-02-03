"use client";

import { useState } from "react";
import { AboutBusiness } from "./formSteps/step1";
import bgGradient from "~/public/img/blue-bg-grad.png";
import { twMerge } from "tailwind-merge";
import Stepper from "@/components/events/plan-events/mobileStepper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AddService } from "./formSteps/step2";
import { EditAvailability } from "./formSteps/step3";
import AddImages from "./formSteps/step4";
import Header from "./header";
import { SlEarphonesAlt } from "react-icons/sl";
import Link from "next/link";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

const vendorSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  category: z.string().min(1, "Category is required"),
  selectCountry: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  price: z.string().min(1, "Price is required"),
  description: z.string().min(1, "Description is required"),
  priceModel: z.string().min(1, "Price model is required"),
  serviceName: z.string().min(1, "Service name is required"),
  consumable: z.boolean().default(true),
  // nonConsumable: z.boolean().default(false),
  onRent: z.boolean().default(false),
  images: z
    .array(
      z.object({
        preview: z.string().url(), // URL for the preview of the image
      }),
    )
    .optional(), // Optional in case no images are uploaded yet
  availability: z
    .object({
      timeFrom: z.string().min(1, "Start time is required"), // String with at least 1 character
      timeTo: z.string().min(1, "End time is required"), // String with at least 1 character
    })
    .refine((data) => data.timeFrom < data.timeTo, {
      message: "'timeFrom' should be before 'timeTo'",
      path: ["timeFrom"],
    }),
    discountTiers: z.array(
      z.object({
        threshold: z.string().min(1, "Guest count is required"),
        rate: z.string().min(1, "Discount rate is required"),
      }),
    ),
    serviceType: z.enum(["Consumable", "Non-consumable"]),
});

function VendorOnboarding() {
  const [formSteps, setFormSteps] = useState(1);
  const steps = [
    { name: "Describe your business", id: 1 },
    { name: "Add a service", id: 2 },
    // { name: "Edit availability", id: 3 },
    { name: "Upload images", id: 3 },
  ];
  const stepIds = steps.map((step) => step.id);

  const handleSteps = (number: number) => {
    setFormSteps(number);
  };

  const disableBtn = true;
  const handleNextStep = () => {
    if (formSteps >= 3) disableBtn;
    setFormSteps(formSteps + 1);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgGradient.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="mx-auto min-h-full w-full rounded-b-[30px]"
      >
        <div className="mx-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl">
          <div className="relative flex w-full items-center">
            <Header
              handleNextStep={handleNextStep}
              disableBtn={formSteps === 4}
            />
          </div>
          <div className="flex h-full w-full flex-1 items-start py-10">
            <div className="hidden h-full w-[30%] flex-col justify-start lg:flex">
              <div className="flex max-w-full flex-col gap-6 p-2">
                {steps.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => handleSteps(item.id)}
                    className={twMerge(
                      `flex w-full items-center gap-x-3 rounded-[10px] border border-[#E5EFFF] bg-white p-5`,
                      formSteps === i + 1 && "border-[#E5EFFF] bg-[#FBF9F3]",
                    )}
                  >
                    <div
                      className={twMerge(
                        "flex h-9 w-9 items-center justify-center rounded-full border border-[#CCE0FF] bg-[#F7FAFF] text-[#136ADF]",
                        formSteps === i + 1 &&
                          "border-[#FFBA3B2B] text-[#FFBA3B]",
                      )}
                    >
                      {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </div>
                    <p className="satoshi text-base font-bold text-[#4C4C4C]">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex flex-1 flex-col overflow-y-auto">
              <main className="w-full flex-grow justify-start">
                <div className="flex max-w-screen-md flex-col justify-start p-3 sm:px-4 md:justify-center md:px-6 2xl:max-w-[80%] 2xl:px-10">
                  <Stepper
                    stepsCount={stepIds}
                    currentStep={formSteps}
                    handleStep={handleSteps}
                    completedSteps={[]}
                  />
                  {formSteps === 1 && (
                    <AboutBusiness handleNextStep={handleNextStep} />
                  )}

                  {formSteps === 2 && (
                    <AddService
                      handleNextStep={handleNextStep}
                      handleSteps={handleSteps}
                    />
                  )}

                  {/* {formSteps === 3 && (
                    <EditAvailability
                      handleNextStep={handleNextStep}
                      handleSteps={handleSteps}
                    />
                  )} */}

                  {formSteps === 3 && (
                    <AddImages
                      handleNextStep={handleNextStep}
                      handleSteps={handleSteps}
                      disableBtn={formSteps === 3}
                    />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
        <div className="flex max-h-fit items-center justify-center gap-2 bg-white py-5 text-center">
          <Link href={"/help"} className="flex items-center gap-x-3">
            {" "}
            <SlEarphonesAlt color="black" size={25} /> Help center
          </Link>
        </div>
      </div>
    </>
  );
}

export default VendorOnboarding;
