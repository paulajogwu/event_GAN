"use client";
import React, { Fragment } from "react";
import SelectInput from "@/components/common/inputs/form/select-input";
import SwitchField from "@/components/common/switch";
import FormInputField from "@/components/onboarding/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { productCreationSchema } from "@/trpc/api/routers/service/Zschema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { UploadButton } from "~/utils/uploadthing";

const devInput = {
  name: "Test:AudioVisuals - Sony 4K Projector",
  description:
    "Experience stunning 4K resolution with this high-brightness projector, ideal for conferences and presentations.",
  isConsumable: false,
  onRent: false,
};

const formSchema = productCreationSchema;

function AddProducts() {
  const [formSteps] = useState(1);
  const router = useRouter();
  const { mutateAsync: createProduct } =
    api.service.createProductMutation.useMutation({
      onSuccess(data) {
        if (data?.message) {
          toast.message(data.message, {
            className: "bg-slate-900 text-white",
          });
        }
      },
      onError(error) {
        const message = error.message.toLowerCase();
        if (message.includes("timeout")) {
          toast.error("An error occured: DB Server timeout");
        } else {
          toast.error(message);
        }
      },
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? devInput
        : {
            name: "Test Audiovisiuals",
            description: "",
            amount: "",
            isConsumable: false,
            onRent: false,
          },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      await createProduct(values);

      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);
    }
  }

  const inputStyle =
    "bg-white border border-[#D0D5DD] h-[45px] focus:border-[#FCD2C2] focus:border-2 ";

  const [uploading, setUploading] = useState(false);

  return (
    <section className="flex w-full max-w-full flex-col items-center justify-center">
      <Card className="satoshi w-full rounded-[10px] border border-[#E4E7EC] bg-[#FFFFFF] px-6 py-9 lg:max-w-[867px]">
        <div className={"mx-auto w-full"}>
          <CardTitle className="text-center text-2xl text-[#1A1A21]">
            Add a new product
          </CardTitle>
          <CardDescription className="text-center text-base font-medium text-[#8C94A6]">
            Fill out these details to build your broadcast
          </CardDescription>

          <Fragment>
            <Form {...form}>
              <form
                className="mt-5"
                onSubmit={form.handleSubmit(onSubmit, (err) => {
                  console.log(err);
                })}
              >
                {/* first form step */}
                {formSteps === 1 && (
                  <div>
                    <div className="flex w-full flex-col py-3">
                      <FormInputField
                        disabled={isSubmitting}
                        name="name"
                        label="Product name"
                        placeholder="product name"
                        type="text"
                        control={form.control}
                        inputStyle="bg-white border border-[#D0D5DD] focus:border-[#FCD2C2] focus:border-2 h-[45px]"
                        error={form.formState.errors.name?.message}
                      />
                    </div>

                    <div className="flex w-full flex-col py-3">
                      <FormInputField
                        disabled={isSubmitting}
                        name="description"
                        label="Description"
                        placeholder="Enter text here..."
                        type="text"
                        textareaStyle="border border-[#D0D5DD] h-[114px] bg-white focus:border-[#FCD2C2] focus:border-2"
                        control={form.control}
                        error={form.formState.errors.description?.message}
                        istextarea
                      />
                    </div>
                    <div className="flex w-full flex-col gap-4 sm:flex-row">
                      <div className="flex w-full flex-col">
                        <SelectInput
                          name="pricingModel"
                          placeholder="Choose your pricing model"
                          label="Pricing model"
                          triggerClassName={inputStyle}
                          control={form.control}
                          options={[
                            { label: "Fixed Price", value: "FIXED_PRICE" },
                            { label: "Hourly Rate", value: "HOURLY_RATE" },
                            { label: "Per Person", value: "PER_PERSON" },
                          ]}
                          error={
                            form.formState.errors.pricingModel
                              ?.message as string
                          }
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <FormInputField
                          name="price"
                          textareaStyle="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-[111px] p-3 placeholder:text-[#98A2B3]"
                          label="Price"
                          inputStyle={inputStyle}
                          placeholder="Enter a flat rate (e.g., '$1500')"
                          control={form.control}
                          type="text"
                          inputMode="numeric"
                          error={form.formState.errors.price?.message as string}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="flex flex-col gap-y-2">
                      <SwitchField
                        disabled={isSubmitting}
                        control={form.control}
                        label="Consumable"
                        name="isConsumable"
                      />
                      <SwitchField
                        disabled={isSubmitting}
                        control={form.control}
                        label="On Rent"
                        name="onRent"
                      />
                      <h1 className="text-sm text-[#667185]">
                        You can set up a{" "}
                        <span className="text-[#8F2802]">
                          custom domain or connect your email service provider
                        </span>{" "}
                        to change this.
                      </h1>
                    </div>
                    <hr className="my-5" />

                    {/* <div className="grid w-full max-w-sm items-center gap-1.5 pb-5">
                      <FormInputField
                        disabled={isSubmitting}
                        name="image"
                        label="Pictures"
                        type="file"
                        //   inputMode={"numeric"}
                        control={form.control}
                        inputStyle={inputStyle}
                        error={form.formState.errors.amount?.message}
                      />
                    </div> */}

                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        form.setValue(
                          "images",
                          res.map((image) => image.url),
                        );
                        setUploading(false);
                      }}
                      content={{
                        button: () => {
                          const images: string[] =
                            form.getValues("images") ?? [];
                          return images.length > 0 ? (
                            <div>
                              <div className="grid grid-cols-2 gap-2">
                                {images
                                  .slice(0, 8)
                                  ?.map((imageUrl: string, index: number) => (
                                    <Image
                                      key={index}
                                      src={imageUrl}
                                      alt={`Uploaded image ${index + 1}`}
                                      className="h-20 w-20 rounded object-cover"
                                      width={80}
                                      height={80}
                                    />
                                  ))}
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm">Upload images</div>
                          );
                        },
                      }}
                      appearance={{
                        button: {
                          background: "transparent",

                          color: "#000",
                          width: "100%",
                          borderRadius: "10px",
                          border: "1px dashed #D0D5DD",
                          padding: "3rem 0px",
                        },
                        container: {
                          padding: "1rem 0px",
                        },
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                        setUploading(false);
                      }}
                      onUploadBegin={() => {
                        setUploading(true);
                      }}
                    />
                    {/* <p className="text-gray-500">Upload image</p> */}
                  </div>
                )}

                {/* {formSteps === 2 && <div>{formSteps}</div>} */}

                <div className="flex w-full flex-col items-center gap-5 sm:flex-row">
                  {/* <Button
                    type="button"
                    className="w-full rounded-md border border-[#004AAD] bg-[#FFFFFF] px-6 py-4 text-center font-bold text-[#004AAD] hover:bg-gray-300 sm:w-[220px]"
                  >
                    Save Draft
                  </Button> */}

                  <Button
                    // onClick={handleFormSteps}
                    // type={formSteps === 4 ? "submit" : "button"}
                    type="submit"
                    disabled={uploading}
                    className={`w-full flex-1 rounded-md border border-[#004AAD] bg-[#004AAD] px-6 py-3 text-center font-bold text-white hover:bg-[#183196]`}
                  >
                    Create Product
                  </Button>
                </div>
              </form>
            </Form>
          </Fragment>
        </div>
      </Card>
    </section>
  );
}

export default AddProducts;
