"use client";
import TabsBtn from "../../common/tabsBtn";
import { useSearchParams } from "next/navigation";
import { useValidateTab } from "@/components/common/redirectTab";
import ProfileInfo from "./profileInfo";
import AccountAndSecurity from "./account-security/index";
import PaymentMethods from "./payment-method";

function Settings() {
  const searchParams = useSearchParams();
  const selectedTabs = searchParams.get("tab") ?? "Profile";

  const tabVariants = [
    {
      tab: "Profile",
      tabName: "Profile",
      name: "Profile",
      tabCount: undefined,
    },

    {
      tab: "Account & Security",
      tabName: "Account-Security",
      name: "Account & Security",
      tabCount: undefined,
    },
    {
      tab: "Payments methods",
      tabName: "Payments methods",
      name: "Payments methods",
      tabCount: undefined,
    },
  ];
  const currentTab = useValidateTab({
    tabVariants,
    selectedTabs,
    fallbackRoute: `/dashboard/settings`,
  });

  return (
    <section className="grid w-full grid-cols-1 lg:gap-8 xl:grid-cols-3 xl:gap-x-10">
      <div className="col-span-2">
        <h1 className="satoshi text-2xl font-bold text-[#000000]">Settings</h1>
        {/* {order section tabs} */}
        <>
          <div className="my-4 flex w-full items-center overflow-x-auto border-b-2">
            {tabVariants.map((tab) => (
              <TabsBtn
                key={tab.tab}
                tabCount={tab.tabCount}
                tabName={tab.tabName}
                name={tab.name}
                tab={currentTab}
                activeColor="border-[#004AAD] text-[#004AAD]"
                notActiveColor="text-[#344054]"
              />
            ))}
          </div>

          {currentTab === "Profile" && (
            <>
              <ProfileInfo />
            </>
          )}
          {currentTab === "Account-Security" && <AccountAndSecurity />}
          {currentTab === "Payments methods" && <PaymentMethods />}
        </>
      </div>

      {/* {right content} */}
      <div className="relative flex w-full flex-col gap-6 md:flex-row lg:flex-col xl:flex-col">
        <div className="sticky top-[6rem]">{/* right content */}</div>
      </div>
    </section>
  );
}

export default Settings;
