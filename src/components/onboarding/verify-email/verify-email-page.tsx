"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import loginImage from "~/public/img/login_image.png";
import Logo from "~/public/img/logo/blue-logo.svg";
import { RxReload } from "react-icons/rx";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

function VerifyEmailPage({ email }: { email?: string | null }) {
  const { mutate: resendEmail, isPending } = api.auth.resendEmail.useMutation({
    onSuccess: () => {
      toast({
        title: "Email sent",
        description:
          "To verify your account, please click the verification link sent to your email.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    },
  });

  return (
    <section className="dm_sans flex min-h-full flex-col overflow-x-hidden bg-[#FBF9F3] px-3 md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center sm:container">
        <div className="flex items-center justify-center py-7">
          <Image
            src={Logo}
            alt="logo"
            height={150}
            width={180}
            className="h-auto w-40 object-cover"
          />
        </div>

        <div className="mx-auto flex h-full min-h-[649px] w-full flex-col items-center justify-evenly gap-10 lg:flex-row">
          <div className="flex h-full w-full flex-col px-3 py-8 md:max-w-2xl lg:min-w-[609px]">
            <div>
              <h1 className="pb-3 text-3xl font-semibold">Check your email</h1>
              <p>
                We sent an email to <strong>{email}</strong> Click the link in
                the email to finish signing up.
              </p>
            </div>

            <div className="mt-2 flex w-full flex-col">
              <Link href="https://mail.google.com" target="_blank">
                <Button className="flex h-12 w-full items-center justify-center rounded-md bg-[#004AAD] px-4 py-5 font-medium text-white duration-150 hover:bg-[#183196]">
                  Open Gmail
                </Button>
              </Link>
              <div className="flex items-center pt-3 text-sm">
                <span>Didn’t receive an email?</span>
                <Button
                  className="ml-2 flex items-center gap-x-1 text-black underline"
                  onClick={() => {
                    if (email) {
                      resendEmail(email);
                    }
                  }}
                >
                  Resend verification{" "}
                  <span>
                    <RxReload
                      className={cn(
                        "transition-all duration-300",
                        isPending && "animate-spin",
                      )}
                      size={20}
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden h-full min-h-[638px] w-full min-w-[609px] p-3 lg:flex">
            <Image
              src={loginImage}
              alt="Login illustration"
              fill
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyEmailPage;
