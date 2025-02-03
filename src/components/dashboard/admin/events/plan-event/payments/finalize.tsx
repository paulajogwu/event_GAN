"use client";

import React from "react";
import { fCurrency } from "@/lib/format-number";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "./checkout";
import { api } from "@/trpc/react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

type Props = {};

const Finalize = ({ eventId }: { eventId: string }) => {
  const query = api.event.getEvent.useQuery(eventId);
  const data = query.data?.event;
  return (
    <section className="satoshi mx-auto flex w-full flex-col md:flex-row lg:flex-col lg:gap-8 xl:flex-row xl:gap-x-8 2xl:gap-x-10">
      {/* right content - moved to the top on mobile */}
      <div className="order-1 w-full md:order-2 md:w-1/3 lg:order-1 lg:w-full xl:order-2 xl:w-1/3">
        <h1 className="satoshi py-5 text-2xl font-bold text-[#000000] md:hidden lg:flex xl:hidden">
          Payment details
        </h1>
        <div className="sticky top-[4rem] px-4 py-5 2xl:px-6">
          <div className="flex flex-col gap-y-1">
            <h1 className="line-clamp-2 text-xl font-bold text-[#101928]">
              {data?.name}
            </h1>
            <p className="text-xs font-medium text-[#667185]">
              {data?.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-x-3 border-t px-0 py-2">
            <div className="line-clamp-1 flex items-center text-xs text-[#667185]">
              <p className="line-clamp-1">Booking Price</p>
            </div>
            <div className="text-base font-bold text-[#0F973D]">
              {fCurrency((data?.totalPrice ?? 0) * 1.08)}
            </div>
          </div>
        </div>
      </div>

      {/* main content - stays on the left on larger screens */}
      <div className="order-2 w-full md:order-1 md:w-2/3 lg:order-2 lg:w-full xl:order-1 xl:w-2/3 2xl:max-w-[696px]">
        {/* <PaymentForm /> */}

        <div className="w-full">
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Event Plan & Services</span>
                <span className="font-medium text-gray-900">
                  {fCurrency(data?.totalPrice ?? 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Charge</span>
                <span className="font-medium text-gray-900">
                  {fCurrency((data?.totalPrice ?? 0) * 0.05)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium text-gray-900">
                  {fCurrency((data?.totalPrice ?? 0) * 0.03)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-base font-semibold text-gray-900">
                    {fCurrency((data?.totalPrice ?? 0) * 1.08)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <h1 className="satoshi hidden py-5 text-2xl font-bold text-[#000000] md:flex lg:hidden xl:flex">
            Payment details
          </h1>
          {data && (
            <Elements
              stripe={stripePromise}
              options={{
                mode: "payment",
                amount: convertToSubcurrency((data?.totalPrice ?? 0) * 1.08),
                currency: "usd",
              }}
            >
              <CheckoutPage
                amount={(data?.totalPrice ?? 0) * 1.08}
                eventId={data?.id ?? ""}
              />
            </Elements>
          )}
        </div>

        <p className="py-2 text-sm text-[#666666]">
          This is a temporary authorization charge that will appear on your
          card. It will be finalized once the vendor confirms your booking.
        </p>
      </div>
    </section>
  );
};

export default Finalize;
