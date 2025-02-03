"use client";

import { useState } from "react";
// import { Toaster } from 'sonner'
import DescribeEvents from "./formSteps/step1";
import AiCraftPlan from "./formSteps/step2";
// import EventCard from "../event-card";
// import eventIMage from "~/public/img/event1.png";
import bgGradient from "~/public/img/bg-gradient.png";
import { twMerge } from "tailwind-merge";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import ServiceList from "./formSteps/step3";
import Stepper from "./mobileStepper";
import PlanEventHeader from "./header";

function PlanEvent() {
  const [formSteps, setFormSteps] = useState(1);
  const steps = [
    { name: "Describe Event", id: 1 },
    { name: "AI Crafts Plan", id: 2 },
    { name: "Choose Service Providers", id: 3 },
  ];
  const stepIds = steps.map((step) => step.id); // Extracting the IDs

  const handleSteps = (number: number) => {
    setFormSteps(number);
  };

  const handleNextStep = () => {
    setFormSteps(formSteps + 1);
  };

  const { mutateAsync: generateEventPlan, data: eventData } =
    api.ai.generateEventPlan.useMutation({
      onSuccess: async ({ message }) => {
        toast({
          variant: "default",
          title: "🎉 Event Plan Generated",
          description: message,
          className: "bg-white border",
        });
      },
      onError: ({ message }) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        });
      },
    });

  return (
    <div
      style={{
        backgroundImage: `url(${bgGradient.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen w-full"
    >
      <div className="flex max-w-full items-center">
        <PlanEventHeader />
      </div>
      <div className="flex h-full w-full items-center lg:px-[44px]">
        <div className="hidden h-full w-[30%] flex-col justify-center lg:-mt-[100px] lg:flex">
          <div className="items- flex max-w-full flex-col justify-center gap-6 p-2">
            {steps.map((item, i) => (
              <div
                key={i}
                onClick={() => handleSteps(item.id)}
                className={twMerge(
                  `flex w-full items-center gap-x-3 rounded-[10px] border border-[#E5EFFF] bg-[#E5EFFF] p-5 shadow-sm`,
                  formSteps === i + 1 && "border-[#FBFFE5] bg-[#FBF9F3]",
                )}
              >
                <div
                  className={twMerge(
                    "flex h-9 w-9 items-center justify-center rounded-full border border-[#CCE0FF] bg-[#F7FAFF] text-[#136ADF]",
                    formSteps === i + 1 && "border-[#FFBA3B2B] text-[#FFBA3B]",
                  )}
                >
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}
                </div>
                <p className="satoshi text-[16px] font-bold text-[#4C4C4C]">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <main className="flex-grow">
            <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col justify-start p-3 sm:px-4 md:justify-center md:p-6 2xl:p-10">
              <Stepper
                stepsCount={stepIds}
                currentStep={formSteps}
                handleStep={handleSteps}
                completedSteps={[]} // You can update this with the actual completed steps array
              />

              {formSteps === 1 && (
                <DescribeEvents
                  sumitValues={generateEventPlan}
                  handleStep={() => handleSteps(2)}
                />
              )}
              {/* {formSteps === 2 && (
                <AiCraftPlan
                  plan={eventData?.plan?.plan1.name ?? ""}
                  handleNext={handleNextStep}
                />
              )}
              {formSteps === 3 && <ServiceList plan={eventData?.plan.plan1.name ?? ""} />} */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PlanEvent;
