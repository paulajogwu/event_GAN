import { CiSearch } from "react-icons/ci";
import bgGradient from "~/public/img/bg-gradient.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

function EventsHeroSection() {
  return (
    <div
      className="flex h-[40rem] max-w-full items-center justify-center px-4  rounded-b-[30px]"
      style={{
        backgroundImage: `url(${bgGradient.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center pt-[7rem] md:pt-20">
        <div className="satoshi mx-auto mb-4  text-[#4C4C4C] font-bold max-w-sm rounded-full bg-gradient-to-r from-[#FFFFFF] via-[rgb(255,254,248)] to-[#EBF2FF] px-5 py-2 text-sm shadow">
          Event planning, but way too simple 😊
        </div>
        <div className="mx-auto max-w-screen-lg text-center">
          <h1 className="md:line-height py-3 text-4xl font-bold text-[#001B3F] sm:text-4xl md:text-5xl lg:text-[71px]">
            What are you looking for ?
          </h1>
          <p className="py-5 font-normal text-sm md:text-xl dm_sans">
            Get an all round budget and booking for vendors, locations in one
            search.
            <br />
            Join our waitlist to be the first to use the AI tool and get latest
            updates.
          </p>
        </div>
        <div className="mx-auto mt-5 flex max-w-2xl px-4">
          <div className="w-full items-center hidden lg:flex">
            <Input
              type="text"
              placeholder="Search"
              className="w-[20rem] rounded-l-[10px] rounded-r-none border border-[#E5EFFF] bg-white py-3 text-sm text-black placeholder:text-[#999999] md:py-5"
            />
            <Select>
              <SelectTrigger className="rounded-none w-[10rem] bg-white py-2 border border-[#E5EFFF] md:py-5">
                <p>Category</p>
              </SelectTrigger>
              <SelectContent className="rounded-none bg-white  border">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
            <Button
              size={"sm"}
              className="flex w-full items-center justify-center rounded-b-lg bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] py-3 md:w-auto md:rounded-l-none md:rounded-r-lg md:py-5"
            >
              <CiSearch color="white" fontSize={700} size={18} className="font-bold" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsHeroSection;
