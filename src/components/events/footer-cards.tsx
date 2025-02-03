import { IoIosArrowForward } from "react-icons/io";
import { Card, CardHeader } from "../ui/card";
import React from "react";

interface DescriptionCardProps {
  title: string;
  counts?: string;
  links?: string;
  name: string[];
  id?: number;
  icon: React.JSX.Element;
}

export const DescriptionCard: React.FC<DescriptionCardProps> = ({
  title,
  counts,
  // links,
  name,
  id,
  icon,
}) => {
    return (
        <Card key={id} className={`satosh ${id === 2 && "shadow-2xl"} border p-3 sm:p-6   border-[#EBEEF7] bg-[#FFFFFF]`}>
            <CardHeader className="flex flex-col gap-3 px-2">
                <div className={`${id === 2 ? "bg-[#F7FBFF]" : "bg-[#E8F7FF99]"} flex items-center justify-between rounded-lg p-2 sm:p-6 gap-x-2 `}>
                    <div className="flex flex-col text-[#001B3F]">
                        <h1 className="text-lg lg:text-base  font-medium">{title}</h1>
                        <p className="text-base">{counts}</p>
                    </div>

          <div
            className={`${id === 2 && "bg-gradient-to-r from-[#136ADF] to-[#3B8EFD] shadow-lg"} flex h-20 w-20 items-center justify-center rounded-md bg-[#FFFFFF] shadow`}
          >
            <span
              className={` ${id === 2 && "text-white"} text-2xl text-[#136ADF]`}
            >
              {icon}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-normal gap-y-4">
          {name.map((n, index) => (
            <div
              className="flex w-full items-center gap-x-2"
              key={`${n}-${index}`}
            >
              <span className="text-[#99DDFF]">
                <IoIosArrowForward size={19} />
              </span>
              <div className="text-xs font-medium text-[#636A80]">
                <span key={index}>{n}</span>
              </div>
            </div>
          ))}
        </div>
      </CardHeader>
    </Card>
  );

};
