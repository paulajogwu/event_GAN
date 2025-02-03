import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { FiCompass } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import bgDots from "~/public/img/white-bg-dots.png";
import CreateEvents, { CreateEventsProps } from "./plan-event-form";
import { v4 as uuidv4 } from "uuid";
import { useUserServerSession } from "@/components/hooks/server/userSession";

async function PlanEvents() {
  const id = uuidv4();
  const user = await useUserServerSession();
  return (
    <section className="mx-auto flex max-w-[852px] flex-1 flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col gap-5">
        <Card className="dm_sans relative w-full overflow-hidden rounded-xl bg-[#004AAD] px-3 sm:p-4">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${bgDots.src})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              opacity: 0.2,
              zIndex: 1,
            }}
          />
          <div className="relative z-10">
            <CardHeader className="px-0">
              <CardTitle className="py-2 text-lg text-white">
                Welcome <span className="text-[#FFBA3B]">{user?.name}</span>,
              </CardTitle>
              <CardDescription className="text-2xl font-medium text-white">
                Create, manage and plan <br /> events of all scale.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 py-3">
              {/* <div className="flex w-full flex-wrap items-center gap-5">
                <Link href={"/plan"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFBA3B] px-5 py-3 text-sm text-white hover:bg-yellow-600">
                    <FiCompass size={20} /> Plan an event
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFFFFF] px-5 py-3 text-sm text-black hover:bg-gray-100">
                    <IoAddSharp size={20} /> View vendors
                  </Button>
                </Link>
              </div> */}
            </CardContent>
          </div>
        </Card>

        {/* plan event form */}

        <CreateEvents id={id} />
      </div>
    </section>
  );
}

export default PlanEvents;
