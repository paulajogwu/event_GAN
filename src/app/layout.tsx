import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { constants } from "@/lib/constants";
import { ProgressBarProvider } from "@/providers/progress-bar";
import { getServerAuthSession } from "@/server/auth";
import { NextAuthProvider } from "@/providers/next-auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Event Gizmo",
  description: "Plan a whole event with a click",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(constants.url),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen">
        <ProgressBarProvider>
          <NextAuthProvider session={session}>
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster />
          </NextAuthProvider>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
