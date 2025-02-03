import Link from "next/link";
import { CiCalendarDate, CiMicrophoneOn } from "react-icons/ci";
import { LiaAngleRightSolid } from "react-icons/lia";
import { TbSend, TbSpeakerphone } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function QuickLinksCard() {
  const quickLinks = [
    {
      name: "View Upcoming Bookings",
      path: "/dashboard/events",
      icon: <CiCalendarDate size={25} />,
      linkTo: "",
    },
    {
      name: "Add New Product",
      path: "/dashboard/products/new",
      icon: <CiMicrophoneOn size={25} />,
      linkTo: "Add a new product",
    },
    // {
    //   name: "Track Payments",
    //   path: "/",
    //   icon: <TbSend size={25} />,
    //   linkTo: "Track current payments",
    // },
    {
      name: "Update Profile",
      path: "/dashboard/profile",
      icon: <TbSpeakerphone size={25} />,
      linkTo: "Complete personal informations",
    },
  ];

  return (
    <Card className="satoshi h-auto w-full rounded-b-md rounded-t-none bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-[#101928]">
          Quick Links
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 px-2 pt-2 sm:px-5">
        {quickLinks.map((link, id) => (
          <Link
            href={link.path}
            key={id}
            className="relative flex w-full items-center gap-x-3 border-b border-gray-50 px-1 py-2 duration-300 hover:bg-gray-100"
          >
            <div className="flex items-center justify-center rounded-full bg-[#F0F2F5] p-3 text-black">
              {link.icon}
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-medium text-[#101928]">
                {link.name}
              </h1>
              <p className="text-xs text-[#475367]">{link.linkTo}</p>
            </div>
            <span className="absolute right-0 top-4">
              <LiaAngleRightSolid size={25} />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export default QuickLinksCard;
