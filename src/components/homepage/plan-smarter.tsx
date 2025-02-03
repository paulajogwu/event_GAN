import Link from "next/link";
import planBg from "~/public/img/plan-shad-bg.png";
import { Button } from "../ui/button";
import { BsStars } from "react-icons/bs";

export default function PlanSmart() {
  return (
    <div
      style={{
        backgroundImage: `url(${planBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="dm_sans flex h-[558px] w-full flex-col items-center justify-center rounded-b-[30px] px-4"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col items-center justify-center">
        <h1 className="md:line-height py-3 text-center text-4xl font-bold text-[#001B3F] sm:text-4xl md:text-5xl lg:text-[71.5px]">
          Event{" "}
          <span className="bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] bg-clip-text text-transparent">
            planning
          </span>{" "}
          has never been easier
        </h1>
        <p className="py-2 text-xl text-[#4B4C4C]">
          Get started in seconds - for free
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4 md:flex-row md:gap-8">
          <Link href={"/plan"}>
            <Button className="flex items-center gap-x-2 rounded-lg bg-gradient-to-r from-[#136ADF] to-[#237DF6] px-4 py-3.5 text-center text-[#FFFFFF]">
              Plan an Event <BsStars size={18} color="white" />
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex gap-x-2 rounded-lg border-2 border-[#1F5BD1] px-4 py-3.5 text-center text-blue-500"
          >
            Vendor sign-in
          </Button>
        </div>
      </div>
    </div>
  );
}
