"use client";

import { AddService } from "@/components/dashboard/vendor/vendor-onboarding/formSteps/step2";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <section className="flex w-full max-w-full flex-col items-center justify-center">
      <Card className="satoshi w-full rounded-[10px] border border-[#E4E7EC] bg-[#FFFFFF] px-6 py-9 lg:max-w-[867px]">
        <AddService
          handleSteps={() => {
            console.log("handleSteps");
          }}
          handleNextStep={() => {
            router.push("/dashboard/profile/");
          }}
        />
      </Card>
    </section>
  );
};

export default Page;
