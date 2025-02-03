import "@/styles/globals.css";

import { type Metadata } from "next";
import { Toaster } from "sonner";


export const metadata: Metadata = {
    title: "Event Gizmo",
    description: "Plan a whole event with a click",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    return <> <Toaster richColors expand={false}/> { children }</>
}
