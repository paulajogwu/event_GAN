import { getServerComponentAuthSession } from "@/server/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IS_GOOGLE_AUTH_ENABLED } from "@/constants/auth";
import LoginForm from "@/components/onboarding/login";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to Event Gizmo",
};

export default async function SignIn() {
  const session = await getServerComponentAuthSession();

  if (session?.user) {
    // toast({
    //   title: "Already logged in",
    //   description: "You are already logged in. Redirecting to the home page.",
    // });
    // session.user?.role === "VENDOR"
    //   ? redirect("/dashboard")
    //   : redirect("/user");
  }

  return <LoginForm isGoogleAuthEnabled={IS_GOOGLE_AUTH_ENABLED} />;
}
