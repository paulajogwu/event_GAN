import type { Metadata } from "next";
import SignInForm from "@/components/onboarding/signup";

export const metadata: Metadata = {
  title: "Sign-in",
  description: "Sign-in to Event Gizmo",
};

export default async function SignIn() {
  return <SignInForm isVendor />;
}
