"use client";
import { MobileNav } from "@/components/navigations/sidebar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Logo from "~/public/img/logo/blue-logo.svg";

interface HeaderProps {
  handleNextStep: () => void;
  disableBtn: boolean;
}

function Header({ disableBtn }: HeaderProps) {
  const router = useRouter();
  const { mutate } = api.profile.onboardingSkip.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const handleSkip = () => {
    mutate();
  };
  return (
    <header className="sticky right-0 top-0 z-[9] flex max-h-[119px] w-full items-center bg-transparent">
      <div className="hidden items-center justify-between gap-2 px-6 py-5 lg:flex lg:py-6">
        <Link href="/dashboard">
          <Image width={176} height={32} src={Logo} alt="Logo" priority />
        </Link>
      </div>
      <div className="shadow-2 flex w-full items-center justify-between gap-x-3 px-3 py-5 md:px-6 2xl:px-11">
        <MobileNav />
        <div className="flex w-full items-center justify-end gap-x-2 md:max-w-full">
          <Button
            disabled={disableBtn}
            onClick={handleSkip}
            className={
              "w-fit rounded-none bg-transparent shadow-none px-4 py-4 text-[#004AAD] hover:bg-gray-200"
            }
          >
            Skip for now
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
