"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCompass } from "react-icons/fi";
import { GoArrowUp } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";
import { LiaAngleDownSolid } from "react-icons/lia";
import bgDots from "~/public/img/white-bg-dots.png";
import PendingTransactionsCard, {
  SummaryDetailsProps,
} from "../pending-transactions-card";
import QuickLinksCard from "../quick-links-card";
import TabsBtn from "../../common/tabsBtn";
import { DataTable, DataTableDemo } from "./vendor-table";
import { useValidateTab } from "@/components/common/redirectTab";
import { useUserSession } from "@/components/hooks/client/userSession";
//  import EventCard from "@/components/events/event-card";
// import event1 from "~/public/img/event.png";
// import event2 from "~/public/img/event1.png";

const cards = [
  { name: "Ongoing events", value: 3, rate: "27%" },
  { name: "My Revenue", value: "2,103", rate: "56%" },
];

const data: DataTable[] = [
  {
    id: "m5grffccss84i9",
    eventDate: new Date().toDateString(),
    status: "success",
    eventName: {
      heading: "Leading Text",
      text: "description...",
    },
    bidFor: "Canopy and hall",
  },
  {
    id: "m5gr84iwwssde9",
    eventDate: new Date().toDateString(),
    status: "pending",
    eventName: {
      heading: "Leading Text",
      text: "description...",
    },
    bidFor: "Food",
  },
  {
    id: "6654effm5gr84i9",
    eventDate: new Date().toDateString(),
    status: "failed",
    eventName: {
      heading: "Leading Text",
      text: "description...",
    },
    bidFor: "Canopy",
  },
];

const summaryDetails: SummaryDetailsProps[] = [
  {
    userName: "Olamide Akintan",
    progress: "Processing",
    stage: 4,
    status: "In-Progress",
    date: "02/12/2023",
    id: 1,
  },
  {
    userName: "Megan Willow",
    progress: "Processing",
    stage: 4,
    status: "Pending",
    date: "02/12/2023",
    id: 2,
  },
  {
    userName: "Janelle Levi",
    progress: "Processing",
    stage: 4,
    status: "Processing",
    date: "02/12/2023",
    id: 3,
  },
];

function VendorDashboard() {
  const searchParams = useSearchParams();
  const user = useUserSession();
  const selectedTabs = searchParams.get("tab") ?? "All Events";

  const tabVariants = [
    {
      tab: "All Events",
      tabName: "All Events",
      name: "All Events",
      tabCount: data.length,
    },
    {
      tab: "Completed",
      tabName: "Completed",
      name: "Completed",
      tabCount: undefined,
    },
    {
      tab: "Ongoing",
      tabName: "Ongoing",
      name: "Ongoing",
      tabCount: undefined,
    },
    {
      tab: "Disputed",
      tabName: "Disputed",
      name: "Disputed",
      tabCount: undefined,
    },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `?tab=All Events`,
  });

  // const events = [
  //     {
  //         id: "1",
  //         image: event1,
  //         title: "95 sitting capicity hall",
  //         location: "India",
  //         roomCount: 3,
  //         elevator: "Yes",
  //     },
  //     {
  //         id: "2",
  //         image: event2,
  //         title: "60 sitting capicity hall",
  //         location: "India",
  //         roomCount: 5,
  //         elevator: "Yes",
  //     },
  // ]

  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      <div className="col-span-2">
        {/* user card */}
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
                Manage your rentals, products and event sales
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 py-3">
              <div className="flex w-full flex-wrap items-center gap-5">
                <Link href={"/"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFBA3B] px-5 py-3 text-sm text-white hover:bg-yellow-600">
                    <FiCompass size={20} /> Message gigs
                  </Button>
                </Link>
                <Link href={"/dashboard/vendors/product"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFFFFF] px-5 py-3 text-sm text-black hover:bg-gray-100">
                    <IoAddSharp size={20} /> Add a product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* {two cards} */}

        <div className="dm_sans grid grid-cols-2 gap-x-3 gap-y-3 py-10 md:gap-5">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className={` ${idx === 0 ? "bg-[#FBF9F3]" : "bg-[#FFFFFF]"} col-span-full flex w-full flex-col justify-between rounded-[10px] p-4 md:col-span-1`}
            >
              <CardHeader className="relative p-0">
                <CardTitle className="flex items-center justify-between gap-x-3 whitespace-nowrap text-sm font-medium text-[#344054]">
                  {card.name}

                  {/* <span className="text-xs text-[#98A2B3]">Last 30 days</span>
                  <LiaAngleDownSolid
                    size={22}
                    className="absolute right-1 top-0"
                  /> */}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-7">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold text-[#101928]">
                    {card.value}
                  </h1>
                  <span className="flex items-center gap-x-1 rounded-full bg-green-500/40 px-1 text-xs text-[#036B26]">
                    <GoArrowUp size={7} />
                    {card.rate}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {order section tabs} */}
        <div>
          <div className="satoshi my-4 flex min-w-full items-center overflow-x-auto px-7">
            {tabVariants.map((tab) => (
              <TabsBtn
                key={tab.tab}
                tabCount={tab.tabCount}
                tabName={tab.tabName}
                name={tab.name}
                tab={currentTab}
                activeColor="border-[#F56630] text-[#F56630]"
                notActiveColor="text-[#344054]"
              />
            ))}
          </div>

          {currentTab === "All Events" && <DataTableDemo data={data} />}
          {currentTab === "Completed" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
          {currentTab === "Ongoing" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
          {currentTab === "Disputed" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* {right content} */}
      <div className="relative">
        <div className="sticky top-[6rem] flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col">
          <QuickLinksCard />

          <PendingTransactionsCard summary={summaryDetails} />
        </div>
      </div>
    </section>
  );
}

export default VendorDashboard;
