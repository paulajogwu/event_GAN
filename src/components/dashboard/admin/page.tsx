"use client";

import Link from "next/link";
import { GoArrowUp } from "react-icons/go";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import PendingTransactionsCard, {
  SummaryDetailsProps,
} from "../pending-transactions-card";
import QuickLinksCard from "../quick-links-card";
import { DataTableDemo } from "./admin-table";
import TabsBtn from "../../common/tabsBtn";
import bgDots from "~/public/img/white-bg-dots.png";
import { FiCompass } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useValidateTab } from "@/components/common/redirectTab";
import { useUserSession } from "@/components/hooks/client/userSession";
import { api } from "@/trpc/react";
import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const data = [
  {
    id: "m5grffccss84i9",
    dateOrdered: new Date().toDateString(),
    status: "success",
    amountPaid: "#20,000",
    orderNumber: {
      heading: "Leading Text",
      text: "description...",
    },
  },
  {
    id: "m5gr84iwwssde9",
    dateOrdered: new Date().toDateString(),
    status: "pending",
    amountPaid: "#100,000",
    orderNumber: {
      heading: "Leading Text",
      text: "description...",
    },
  },
  {
    id: "6654effm5gr84i9",
    dateOrdered: new Date().toDateString(),
    status: "failed",
    amountPaid: "#30,000",
    orderNumber: {
      heading: "Leading Text",
      text: "description...",
    },
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

function AdminDashboard() {
  const searchParams = useSearchParams();
  const { data: pendingEventServices, isLoading: pendingEventServicesLoading } =
    api.service.countPendingEventServices.useQuery();
  const { data: upcomingEvents, isLoading: eventsLoading } =
    api.event.getVendorEventsById.useQuery();
  const selectedTabs = searchParams.get("tab") ?? "order";

  const cards = [
    {
      name: "Ongoing events",
      value: upcomingEvents?.length ?? 0,
      rate: "27%",
      loading: eventsLoading,
    },
    {
      name: "Pending bids",
      value: pendingEventServices ?? 0,
      rate: "56%",
      loading: pendingEventServicesLoading,
    },
  ];

  const user = useUserSession();

  const tabVariants = [
    { tab: "order", tabName: "order", name: "order", tabCount: data.length },
    {
      tab: "subscription",
      tabName: "subscription",
      name: "subscription",
      tabCount: undefined,
    },
    {
      tab: "activities",
      tabName: "activities",
      name: "activities",
      tabCount: undefined,
    },
    { tab: "review", tabName: "review", name: "review", tabCount: undefined },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `?tab=order`,
  });

  const {
    data: events,
    isLoading,
    error,
  } = api.event.getVendorEventsById.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching events</p>;
  console.log("event", events);

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
                Create, manage and plan <br /> events of all scale.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 py-3">
              <div className="flex w-full flex-wrap items-center gap-5">
                <Link href={"/dashboard/events"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFBA3B] px-5 py-3 text-sm text-white hover:bg-yellow-600">
                    <FiCompass size={20} /> Manage Gigs
                  </Button>
                </Link>
                {/* <Link href={"/dashboard/vendors"}>
                  <Button className="flex items-center gap-x-2 rounded-md bg-[#FFFFFF] px-5 py-3 text-sm text-black hover:bg-gray-100">
                    <IoAddSharp size={20} /> View vendors
                  </Button>
                </Link> */}
              </div>
            </CardContent>
          </div>
        </Card>
        {/* {three cards} */}

        <div className="dm_sans grid grid-cols-2 gap-x-3 gap-y-3 py-10 md:grid-cols-2 md:gap-5">
          {cards.map((card, idx) => (
            <Card
              key={idx}
              className={` ${idx === 0 ? "bg-[#FBF9F3]" : "bg-[#FFFFFF]"} col-span-full flex w-full flex-col justify-between rounded-[10px] p-4 md:col-span-1`}
            >
              <CardHeader className="relative p-0">
                <CardTitle className="flex items-center justify-between gap-x-3 whitespace-nowrap text-sm font-medium text-[#344054]">
                  {card.name}

                  {/* <div className="flex items-center justify-center gap-x-2">
                    <span className="text-xs text-[#98A2B3]">Last 30 days</span>
                    <LiaAngleDownSolid size={14} className="" />
                  </div> */}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0 pt-7">
                <div className="flex items-center justify-between">
                  {card.loading ? (
                    <Skeleton className="h-10 w-10" />
                  ) : (
                    <h1 className="text-2xl font-semibold text-[#101928]">
                      {card.value}
                    </h1>
                  )}
                  {/* <div className="flex items-center gap-x-1 rounded-full bg-green-500/40 px-1 text-xs text-[#036B26]">
                    <GoArrowUp size={7} />
                    <p>{card.rate}</p>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {order section tabs} */}
        <Fragment>
          <div className="my-4 flex w-full items-center overflow-x-auto border-b-2">
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

          {currentTab === "order" && <DataTableDemo data={[]} />}
          {currentTab === "subscription" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
          {currentTab === "activities" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
          {currentTab === "review" && (
            <div>
              <h1 className="text-center text-4xl font-semibold uppercase">
                {currentTab}
              </h1>
            </div>
          )}
        </Fragment>
      </div>

      {/* {right content} */}
      <div className="relative flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col">
        <div className="sticky top-[6rem]">
          <QuickLinksCard />

          <PendingTransactionsCard summary={summaryDetails} />
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
