"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import profileBgCover from "~/public/img/vendor/profile-cover.jpg";
import profileImage from "~/public/img/avatar1.png";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GoPencil } from "react-icons/go";
import { AiOutlinePlus } from "react-icons/ai";
import { api } from "@/trpc/react";
import { PricingModel } from "@/lib/utils";
import { Country, State } from "country-state-city";

import Loading from "@/components/loading";
import { UploadButton } from "~/utils/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import AddServiceModal from "./modals/add-service";

function ProfilePage() {
  const {
    data: vendor,
    isLoading,
    refetch: refetchVendor,
  } = api.vendor.getVendorProfileByUserID.useQuery();
  const { data: products, isLoading: isProductsLoading } =
    api.service.getProductsByUserId.useQuery();
  const { toast } = useToast();

  const utils = api.useUtils();

  const { mutate: updateVendorImages, isPending: isUpdatingVendorImages } =
    api.vendor.updateVendorImages.useMutation({
      onSuccess: (_, { imageUrls }) => {
        // Manually update the cache with the new image URLs
        utils.vendor.getVendorProfileByUserID.setData(undefined, (prev) => {
          if (!prev) return prev;
          return { ...prev, images: [...(prev?.images ?? []), ...imageUrls] };
        });

        toast({
          title: "Vendor images updated successfully",
        });
      },
      onError: () => {
        toast({
          title: "Failed to update vendor images",
          description: "Please try again",
        });
      },
    });

  useEffect(() => {
    if (isUpdatingVendorImages) {
      toast({
        title: "Updating vendor images...",
        description: "Please wait while we update your vendor images",
      });
    }
  }, [isUpdatingVendorImages]);

  const vendorImages = vendor?.images ?? [];

  if (isLoading || isProductsLoading) return <Loading />;

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

        <span className="absolute right-2 top-1 z-30">
          <Link href={"/edit-profile"}>
            <BiEdit size={25} color="black" /> {/*  edit button */}
          </Link>
        </span>
      </motion.div>

      <div className="flex w-full items-center justify-between px-4 py-3">
        <div>
          <h1 className="satoshi text-2xl font-bold text-black">
            {vendor?.businessName ?? vendor?.user?.name}
          </h1>
        </div>
        {/*  edit profile  button */}
        <div>
          <Link href={"/dashboard/settings"}>
            <Button className="rounded-lg border border-[#004AAD] bg-white px-4 py-2 text-center text-sm text-[#004AAD] hover:bg-gray-100">
              Edit profile
            </Button>
          </Link>
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
            </div>

            <div className="boder-[#EDEDF2] col-span-2 w-full rounded-lg border bg-white p-4 pt-4 shadow">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-[#101928]">Services</h1>
                <div className="">
                  {/* <Link href={"/edit-services"}> */}
                  <Button variant={"link"} className="text-[#004AAD]">
                    <GoPencil size={20} />
                  </Button>
                  {/* </Link> */}

                  <AddServiceModal
                    onClose={() => {
                      refetchVendor();
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 py-2">
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

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(result) => {
                    console.log(result);
                    updateVendorImages({
                      imageUrls: result.map((img) => img.url),
                    });
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                  }}
                  appearance={{
                    button:
                      "w-[116px] h-[134px] rounded-lg bg-transparent border border-[#F0F2F5] flex items-center justify-center",
                    allowedContent: "hidden",
                    container: "flex !items-start justify-center",
                  }}
                  content={{
                    button: <AiOutlinePlus size={30} color="#004AAD" />,
                  }}
                />
              </div>
            )}

            {vendorImages.length === 0 && (
              <div className="flex h-[330px] w-full flex-col items-center justify-center gap-3 rounded-lg border border-[#E4E7EC] bg-[#F7FBFF]">
                <p className="text-sm font-medium text-[#667185]">
                  No images found
                </p>

                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(result) => {
                    console.log(result);
                    updateVendorImages({
                      imageUrls: result.map((img) => img.url),
                    });
                  }}
                  onUploadError={(error) => {
                    console.log(error);
                  }}
                  appearance={{
                    button:
                      "w-[116px] h-[134px] rounded-lg bg-transparent border border-[#F0F2F5] flex items-center justify-center",
                    allowedContent: "hidden",
                  }}
                  content={{
                    button: <AiOutlinePlus size={30} color="#004AAD" />,
                  }}
                />
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
                    <Link
                      href="/dashboard/settings"
                      className="absolute right-3 top-2 z-30 w-fit bg-white"
                    >
                      <BiEdit size={25} color="black" /> {/*  edit icon */}
                    </Link>
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

              {/* add service btnImage */}
              <Link href={"/dashboard/products/new"}>
                <div className="flex h-[325px] max-w-[282px] flex-col items-center justify-center rounded-lg border border-[#F0F2F5] bg-[#F7FBFF]">
                  <div className="flex h-[94.5px] w-[94.5px] flex-col items-center justify-center">
                    <AiOutlinePlus size={25} />
                  </div>
                  <h1 className="text-xl font-bold text-[#101928]">
                    New Products
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </motion.main>
    </motion.section>
  );
}

export default ProfilePage;
