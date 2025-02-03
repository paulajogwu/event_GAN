"use client";

import { useSearchParams } from "next/navigation";
import TabsBtn from "../../../common/tabsBtn";
import Delivery from "./tabs/delivery";
import Discounts from "./tabs/discounts";
import Orders from "./tabs/oders";
import Products, { events } from "./tabs/products";
import { useValidateTab } from "@/components/common/redirectTab";

export default function VendorEventsProducts() {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "My Products";

  const tabVariants = [
    {
      tab: "My Products",
      tabName: "My Products",
      name: "My Products",
      tabCount: undefined,
    },
    { tab: "Orders", tabName: "Orders", name: "Orders", tabCount: undefined },
    {
      tab: "Discounts",
      tabName: "Discounts",
      name: "Discounts",
      tabCount: undefined,
    },
    {
      tab: "Delivery",
      tabName: "Delivery",
      name: "Delivery",
      tabCount: undefined,
    },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `?tab=My Products`,
  });

  return (
    <section className="mx-auto h-full w-full bg-[#FDFDFD] px-2 py-10 sm:max-w-screen-2xl sm:px-4 lg:px-6 xl:px-10">
      {/* tabs */}
      <div className="my-4 flex w-full items-center overflow-x-auto border-b-2">
        {tabVariants.map((tab) => (
          <TabsBtn
            key={tab.name}
            tabCount={tab.tabCount}
            tabName={tab.tabName}
            name={tab.name}
            tab={currentTab}
            activeColor="border-[#004AAD] text-[#004AAD]"
            notActiveColor="text-[#001B3F]"
          />
        ))}
      </div>

      {/* main div content */}

      <div className="w-full rounded-[10px] bg-[#FFFFFF]">
        {currentTab === "My Products" && <Products />}
        {currentTab === "orders" && <Orders />}
        {currentTab === "discounts" && <Discounts />}
        {currentTab === "delivery" && <Delivery />}
      </div>
    </section>
  );
}
