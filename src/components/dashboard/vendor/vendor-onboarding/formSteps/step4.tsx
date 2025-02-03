"use client";

import { Button, ButtonWithLoader } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import uploadImage from "~/public/img/vendor/icons/add-image.png";
// import { UploadDropzone } from "@/utils/uploadthing";
import { UploadDropzone } from "@/../utils/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { api } from "@/trpc/react";
import { ZUploadImageSchema } from "@/trpc/api/routers/profile/schema";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface AddImagesProps {
  handleSteps: (val: number) => void;
  handleNextStep: () => void;
  disableBtn: boolean;
}

interface FileWithPreview extends File {
  preview: string;
}

export default function AddImages({
  handleSteps,
  handleNextStep,
  disableBtn,
}: AddImagesProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const router = useRouter();
  const methods = useForm<z.infer<typeof ZUploadImageSchema>>({
    resolver: zodResolver(ZUploadImageSchema),
    mode: "onBlur",
  });

  const { control, formState, handleSubmit, setValue, watch } = methods;

  const uploadQuery = api.profile.vendorImageUpload.useMutation({
    onSuccess: ({ message }) => {
      toast({
        variant: "default",
        title: "Image uploaded",
        description: message,
      });

      router.replace("/dashboard/");
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
  });
  // form submit
  const onSubmit = (data: z.infer<typeof ZUploadImageSchema>) => {
    uploadQuery.mutate(data);
  };

  const updateVendorImagesQuery = api.vendor.updateVendorImages.useMutation({
    onSuccess: () => {
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
  const images = watch("images");

  const [uploading, setUploading] = useState(false);

  return (
    <div className="dm_sans flex w-full flex-col">
      <h1 className="text-2xl font-bold text-[#333333]">Add images</h1>
      <p className="py-2 pb-6 text-base font-medium text-[#4C4C4C]">
        Upload at least 5 high-quality images that describe the services you
        offer.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <UploadDropzone
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                const images = res.map((image) => ({
                  preview: image.url,
                }));
                setValue("images", images);
                updateVendorImagesQuery.mutate({
                  imageUrls: res.map((image) => image.url),
                });
                setUploading(false);
              }}
              onUploadError={(error) => {
                // window.alert(`${error?.message}`);
                console.log(error);
                setUploading(false);
              }}
              onUploadBegin={() => {
                setUploading(true);
              }}
              appearance={{
                button: {
                  background: "transparent",
                  color: "#000",
                  width: "100%",
                  borderRadius: "10px",
                  // border: "1px dashed #D0D5DD",
                  padding: "3rem 0px",
                },
                container: {
                  padding: "1rem 0px",
                },
              }}
              config={{
                mode: "auto",
              }}
            />

            {/* Display uploaded images */}
            {images && images.length > 0 && (
              <div className="mt-4 flex flex-wrap">
                {images.map(({ preview }, index) => (
                  <div key={index} className="mb-4 mr-4">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col items-center gap-5 py-6 sm:flex-row">
              <Button
                type="button"
                onClick={() => handleSteps(3)}
                className="h-14 w-full rounded-md border border-[#004AAD] bg-[#FFFFFF] px-6 py-4 text-center font-bold text-[#004AAD] hover:bg-gray-300 sm:w-[220px]"
              >
                Go back
              </Button>

              <ButtonWithLoader
                loading={uploadQuery.isPending}
                type="submit"
                disabled={uploading}
                className={`h-14 w-full flex-1 rounded-md border border-[#004AAD] bg-[#004AAD] px-6 py-4 text-center font-bold text-white hover:bg-[#183196]`}
              >
                Continue
              </ButtonWithLoader>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
