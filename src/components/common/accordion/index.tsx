import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconType } from "react-icons/lib";

interface AccordionItemProps {
  id: React.Key;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: (id: React.Key) => void;
  titleStyle?: string;
  OpenIcon?: React.ReactNode;
  CloseIcon?: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  isOpen,
  onClick,
  titleStyle = "text-base uppercase text-[#191F33] font-medium",
  OpenIcon = <IoIosArrowUp size={20} color="#636A80" />, // Default icon when open
  CloseIcon = <IoIosArrowDown size={20} color="#636A80" />, // Default icon when closed
}) => {
  return (
    <div className="satoshi border-b border-[#EBEEF7]">
      <div
        className="flex cursor-pointer items-center justify-between p-4"
        onClick={() => onClick(id)}
      >
        <h2 className={titleStyle}>{title}</h2>
        {/* Conditionally render icons */}
        {isOpen ? OpenIcon : CloseIcon}
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ${isOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
