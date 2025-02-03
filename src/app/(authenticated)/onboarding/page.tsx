import VendorOnboarding from "@/components/dashboard/vendor/vendor-onboarding";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  } else {
    if (session.user?.role !== "VENDOR") {
      redirect("/user");
    }
  }
  return <VendorOnboarding />;
};

export default Page;
