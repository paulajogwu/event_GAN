"use client";
import Image from "next/image";
import React from "react";
import profileBgCover from "~/public/img/vendor/profile-cover.jpg";
import profileImage from "~/public/img/avatar1.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { PricingModel } from "@/lib/utils";
import { Country, State } from "country-state-city";
import ReportModal from "./report-profile";
import Loading from "@/components/loading";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  slug: string;
};

const ProfileAsVisitor = ({ slug }: Props) => {
  const slugId = slug.split("-").at(-1);
  const {
    data: vendor,
    isLoading,
    isError,
  } = api.vendor.getVendorProfile.useQuery(slugId ?? "", {
    enabled: !!slugId,
  });
  const { data: products, isLoading: isProductsLoading } =
    api.service.getProductsByUserId.useQuery(vendor?.userId ?? "", {
      enabled: !!vendor?.userId,
    });

  const vendorImages = vendor?.images ?? [];

  const name = vendor?.businessName ?? vendor?.user?.name;
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-full min-h-[50vh] w-full items-center justify-center"
      >
        <div>Vendor not found</div>
      </motion.section>
    );
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full"
    >
      {/* profile header */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "162px" }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `url(${profileBgCover.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative flex w-full flex-col justify-end rounded-t-3xl px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative h-[120px] w-[120px]"
        >
          <Image
            src={profileImage} // will display vendors profile picture
            alt=""
            fill
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <div className="flex w-full items-center justify-between px-4 py-3">
        <div>
          <h1 className="satoshi text-2xl font-bold text-black">{name}</h1>
        </div>
        {/*  edit profile  button */}
        <div className="flex items-center gap-2">
          <Link href={`/user/hire/${vendor?.id}`}>
            <Button className="rounded-lg border border-[#004AAD] bg-white px-4 py-2 text-center text-sm text-[#004AAD] hover:bg-gray-100">
              Hire {name}
            </Button>
          </Link>
          {name && vendor?.services && (
            <ReportModal
              vendorName={name}
              vendorId={vendor?.id}
              services={vendor?.services ?? []}
            />
          )}
        </div>
      </div>

      {/* main profile details */}
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex h-full w-full flex-col gap-5"
      >
        <section className="flex w-full flex-1 gap-5">
          <div className="satoshi grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:max-w-[416px] xl:grid-cols-1">
            <div className="boder-[#EDEDF2] col-span-2 w-full rounded-lg border bg-white p-4 shadow">
              {vendor?.description && (
                <div>
                  <h1 className="text-xl font-bold text-[#101928]">
                    Description
                  </h1>
                  <blockquote className="py-2 text-sm text-[#667185]">
                    {vendor?.description}
                  </blockquote>
                </div>
              )}
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-2">
                {vendor?.category && (
                  <div>
                    <h1 className="text-xl font-bold text-[#101928]">
                      Category
                    </h1>
                    <p className="py-2 text-sm text-[#667185]">
                      {vendor?.category}
                    </p>
                  </div>
                )}
                <div>
                  <h1 className="text-xl font-bold text-[#101928]">Location</h1>
                  <p className="py-2 text-sm text-[#667185]">
                    {vendor?.user?.state
                      ? State.getStateByCode(vendor?.user?.state)?.name
                      : ""}
                    ,{" "}
                    {vendor?.user?.country
                      ? Country.getCountryByCode(vendor?.user?.country)?.name
                      : ""}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-2">
                <div>
                  <h1 className="text-xl font-bold text-[#101928]">Ratings</h1>
                  <div className="flex items-center gap-1 py-2 text-sm text-[#667185]">
                    <div className="inline-flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.round(vendor?.averageRating ?? 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#667185]">
                      {vendor?.averageRating ?? 0}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="boder-[#EDEDF2] col-span-2 w-full rounded-lg border bg-white p-4 pt-4 shadow">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#101928]">Services</h1>
              </div>
              <div className="flex flex-col gap-4 py-2">
                {vendor?.services.length === 0 && (
                  <div className="flex w-full flex-col items-center justify-center gap-3 rounded-lg py-2">
                    <p className="text-sm font-medium text-[#667185]">
                      No Services Found
                    </p>
                  </div>
                )}
                {vendor?.services.map((service) => (
                  <div className="" key={service.id}>
                    <div
                      key={service.id}
                      className="flex justify-between gap-1"
                    >
                      <p className="text-sm font-medium text-[#667185]">
                        {service.name}
                      </p>
                      <p className="text-sm font-medium text-[#667185]">
                        ${service.price}{" "}
                        {service?.pricingModel === PricingModel.HOURLY_RATE
                          ? "/ hour"
                          : service?.pricingModel === PricingModel.PER_PERSON
                            ? "/ person"
                            : ""}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm font-medium text-[#667185]"></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* <div className="flex flex-col py-2">
              <h1 className="text-xl font-bold text-[#101928]">Pricing</h1>
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-medium text-[#667185]">Fixed</p>
                <p className="text-sm font-medium text-[#667185]">$1500</p>
              </div>
            </div> */}
            </div>
          </div>

          <div className="satoshi boder-[#EDEDF2] flex w-full flex-1 flex-col gap-4 rounded-lg border bg-white p-4 shadow">
            {/* Photos cards */}
            {vendorImages.length > 0 && (
              <div className="grid w-full grid-cols-1 gap-4 py-3 sm:grid-cols-2 lg:grid-cols-2">
                <div className="relative h-[330px] w-full">
                  <Image
                    src={String(vendorImages[0])}
                    alt=""
                    fill
                    className="h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
                <div className="grid h-[330px] w-full grid-cols-2 gap-3">
                  {vendorImages.slice(1).map((img, idx) => (
                    <div
                      key={`${img}-${idx}`}
                      className="relative h-[155px] rounded-lg border border-[#E4E7EC]"
                    >
                      <img
                        src={String(img)}
                        alt=""
                        className="h-full w-full rounded-lg object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {vendorImages.length === 0 && (
              <div className="flex h-[330px] w-full flex-col items-center justify-center gap-3 rounded-lg border border-[#E4E7EC] bg-[#F7FBFF]">
                <p className="text-sm font-medium text-[#667185]">
                  No images found
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="w-full">
          {/* my products */}
          <div className="satoshi boder-[#EDEDF2] flex w-full flex-1 flex-col gap-4 rounded-lg border bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-[#101928]">My products</h1>
              {/* <Button size={"icon"} className="bg-white">
                <LiaExpandSolid size={23} />
              </Button> */}
            </div>

            {isProductsLoading && (
              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-[330px] w-full" />
                ))}
              </div>
            )}

            {products?.length === 0 && !isProductsLoading && (
              <div className="flex h-[330px] w-full flex-col items-center justify-center gap-3 rounded-lg border border-[#E4E7EC] bg-[#F7FBFF]">
                <p className="text-sm font-medium text-[#667185]">
                  No Products Found
                </p>
              </div>
            )}

            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {products?.map((product, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * id }}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg bg-[#F7FBFF]"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={product.images?.[0] ?? "/img/placeholder.png"}
                      alt=""
                      fill
                      className="h-full w-full rounded-t-lg object-cover object-center"
                    />
                  </div>
                  <div className="flex w-full flex-col p-2">
                    <h1 className="text-xl font-bold text-[#101928]">
                      {product.name}
                    </h1>
                    <p className="line-clamp-2 text-sm font-medium text-[#666666]">
                      {product.description}
                    </p>
                    {/* <div className="grid grid-cols-3">
                    {product.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded border border-[#E5EFFF] px-5 py-2 text-center"
                      >
                        {tag}
                      </div>
                    ))}
                  </div> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
    </motion.section>
  );
};

export default ProfileAsVisitor;
