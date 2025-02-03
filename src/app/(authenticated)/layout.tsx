import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  } else {
    if (!session.user.emailVerified) {
      redirect("/email-sent");
    }
  }

  return <>{children}</>;
}
