import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

export default async function ResolveVendor() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "VENDOR") {
      await db.user.update({
        where: { id: user.id },
        data: { role: "VENDOR" },
      });
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Error resolving vendor:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
