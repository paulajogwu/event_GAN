"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import paySuccessImage from "~/public/img/vendor/icons/pay-success.svg";

function SkeletonCard() {
  return (
    <div className="flex min-h-[434px] w-full max-w-sm flex-col items-center overflow-hidden rounded-[12px] bg-[#FFFFFF] shadow-lg">
      <div className="flex w-full items-center justify-center p-4">
        <Skeleton className="h-[170px] w-[300px]" />
      </div>
      <div className="flex w-full flex-col p-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-full" />

        <div className="grid w-full grid-cols-2 gap-x-5 pt-7">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </div>
  );
}

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_intent");

  const {
    data: paymentData,

    isLoading,
    isError,
  } = api.payment.confirmPaymentAndBook.useQuery(paymentId as string);
  console.log(paymentData);
  const isPaymentSuccessful = paymentData?.status === "succeeded";
  const isPaymentCanceled = paymentData?.status === "canceled";

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      {/* <p>{paymentId}</p> */}
      {isLoading && <SkeletonCard />}

      {!isLoading && (
        <div className="flex max-w-sm flex-col items-center overflow-hidden rounded-[12px] bg-[#FFFFFF] shadow-lg">
          <div
            className={cn(
              "flex w-full items-center justify-center p-4",
              isPaymentSuccessful && "bg-[#FCFFF6]",
              !isPaymentSuccessful && "bg-red-100",
            )}
          >
            <div className="relative flex h-[170px] w-[170px] items-center justify-center">
              {paymentData?.status === "succeeded" ? (
                <Image
                  src={paySuccessImage}
                  alt="success image"
                  fill
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <CircleX size={140} className="text-red-600" />
              )}
            </div>
          </div>
          <div className="satoshi flex w-full flex-col p-6">
            <h1 className="py-2 text-center text-2xl font-bold text-[#4B4C4C] lg:text-3xl">
              Payment{" "}
              {isPaymentSuccessful
                ? "successful"
                : isPaymentCanceled
                  ? "Failed"
                  : isError
                    ? "Error"
                    : "Error"}
            </h1>
            {isPaymentSuccessful && (
              <p className="py-2 text-center text-base text-[#666666]">
                This is a temporary authorization charge that will appear on
                your card. It will be finalized
              </p>
            )}

            {isPaymentCanceled && (
              <p className="py-2 text-center text-base text-[#666666]">
                This payment was canceled
              </p>
            )}

            {isError && (
              <p className="py-2 text-center text-base text-[#666666]">
                An error occurred while validating this payment or payment does
                not exists. Try again later
              </p>
            )}

            <div className="grid w-full grid-cols-2 gap-x-5 pt-7">
              <Link href={`/user/`}>
                <Button className="flex w-full items-center justify-center rounded-lg border border-[#D0D5DD] px-4 py-2 text-sm text-[#344054] md:text-base">
                  Start Another plan
                </Button>
              </Link>

              <Link href={`/user/events/${params.id}`}>
                <Button className="flex w-full items-center justify-center rounded-lg border bg-[#7CB518] px-4 py-2 text-sm text-white hover:bg-lime-600 md:text-base">
                  Go to event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
