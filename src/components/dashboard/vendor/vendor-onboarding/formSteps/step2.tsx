import { useState } from "react";
import SelectInput from "@/components/common/inputs/form/select-input";
import FormInputField from "@/components/onboarding/form-field";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { Button, ButtonWithLoader } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { z } from "zod";
import { Tag, TagInput } from "emblor";
import { serviceCreationSchema } from "@/trpc/api/routers/service/Zschema";
import { toast } from "@/components/ui/use-toast";
import RadioInput from "@commercetools-uikit/radio-input";
import { IoAddSharp } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { RiArrowUpFill } from "react-icons/ri";
import { DiscountType } from "@prisma/client";

interface SecondStepProps {
  handleSteps: (val: number) => void;
  handleNextStep: () => void;
}

export const AddService = ({
  handleNextStep,
  handleSteps,
}: SecondStepProps) => {
  const { mutateAsync, isPending } =
    api.service.createServiceMutation.useMutation({
      onSuccess: ({ message }) => {
        toast({
          variant: "default",
          title: "Success",
          description: message,
        });
        handleNextStep();
      },
    });

  const methods = useForm<z.infer<typeof serviceCreationSchema>>({
    defaultValues: {
      discounts: [
        {
          type: "BULK_QUANTITY" as DiscountType,
          threshold: "",
          discount: "",
          isPercentage: true,
        },
      ],
    },
    resolver: zodResolver(serviceCreationSchema),
    mode: "onBlur",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const { control, formState, handleSubmit, setValue, watch } = methods;

  const pricingModel = watch("pricingModel");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "discounts",
  });

  const onSubmit = (data: z.infer<typeof serviceCreationSchema>) => {
    // console.log(data);
    mutateAsync(data);
  };

  const handleAddDiscountTier = () => {
    append({
      type: "FLAT_RATE",
      discount: "",
      isPercentage: true,
      threshold: "",
    });
  };

  const inputStyle =
    "border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-12 p-3 placeholder:text-[#98A2B3] dm_sans";
  return (
    <div className="flex w-full flex-col">
      <h1 className="dm_sans text-3xl font-bold text-[#333333]">
        Add a service
      </h1>
      <p className="py-2 text-base font-medium text-[#4C4C4C]">
        Describe the services you offer, with details on pricing.
      </p>
      {/* <Button
        onClick={handleAddService}
        type="button"
        className={`${!showService && "hidden" } h-14 w-full flex-1 rounded-md border flex items-center text-base font-medium gap-3 border-[#004AAD] bg-[#004AAD] px-6 py-3 text-center text-white hover:bg-[#183196]`}
      >
       <RiArrowUpFill size={30} color="white"/> Add new service
      </Button> */}
      {/* {showService &&  */}
      <FormProvider {...methods}>
        <form
          className="mt-6 flex flex-col gap-3"
          onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
        >
          <div className="flex flex-col">
            <Label
              htmlFor="serviceName"
              className="pb-2 font-medium text-[#333333]"
            >
              Service name{" "}
              <span className="text-sm font-normal text-[#98A2B3]">
                (e.g Wedding catering, DJ Services)
              </span>
            </Label>
            <FormInputField
              name="name"
              inputStyle={inputStyle}
              placeholder="Enter the name of the service(s) your brand offers"
              control={control}
              type="text"
              error={formState.errors.name?.message as string}
            />
          </div>

          <div>
            <div className="flex flex-col pt-3">
              <Label htmlFor="tags" className="pb-2 font-medium text-[#333333]">
                Add tags
                <span className="text-sm font-normal text-[#98A2B3]">
                  {" "}
                  (Optional)
                </span>
              </Label>

              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <TagInput
                    {...field}
                    placeholder="Enter keywords related to your service (e.g., African
              food, weddings, corporate events)"
                    tags={tags}
                    className={`sm:min-w-[450px] ${inputStyle}`}
                    setTags={(newTags) => {
                      console.log(newTags);
                      setTags(newTags);
                      const savedTags = newTags as [Tag, ...Tag[]];
                      setValue(
                        "tags",
                        savedTags.map((tag) => tag.text as string),
                      );
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    styleClasses={{
                      input: inputStyle,
                    }}
                  />
                )}
              />

              <p className="py-1 text-sm font-normal text-[#667185]">
                These tags help our AI match your service to customer searches.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="Servicetype"
              className="pb-2 font-medium text-[#333333]"
            >
              Service type
            </Label>
            <Controller
              name="serviceType"
              control={control}
              defaultValue="Consumable"
              render={({ field }) => (
                <RadioInput.Group
                  name={field.name}
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <RadioInput.Option value="Consumable">
                    <div className="flex items-center">
                      <span className="dm_sans text-base text-[#666666]">
                        Consumable
                      </span>
                    </div>
                  </RadioInput.Option>
                  <RadioInput.Option value="Non-consumable">
                    <div className="flex items-center">
                      <span className="dm_sans text-base text-[#666666]">
                        Non-consumable
                      </span>
                    </div>
                  </RadioInput.Option>
                </RadioInput.Group>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col">
              <SelectInput
                name="pricingModel"
                placeholder="Choose your pricing model"
                label="Pricing model"
                triggerClassName={inputStyle}
                control={control}
                options={[
                  { label: "Fixed Price", value: "FIXED_PRICE" },
                  { label: "Hourly Rate", value: "HOURLY_RATE" },
                  { label: "Per Person", value: "PER_PERSON" },
                ]}
                error={formState.errors.pricingModel?.message as string}
              />
            </div>
            <div className="flex w-full flex-col">
              <FormInputField
                name="price"
                textareaStyle="border border-[#D0D5DD] bg-[#FFFFFF] rounded-md h-[111px] p-3 placeholder:text-[#98A2B3]"
                label="Price"
                inputStyle={inputStyle}
                placeholder="Enter a flat rate (e.g., '$1500')"
                control={control}
                type="text"
                inputMode="numeric"
                error={formState.errors.price?.message as string}
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <div>
              <h1 className="text-base font-medium text-[#333333]">
                Discounts
              </h1>
              <p className="text-sm text-[#667185]">
                Add discounts based on your pricing model
              </p>
            </div>

            <div className="flex w-full flex-col gap-4">
              {fields.map((field, index: number) => (
                <div key={field.id} className="relative flex flex-col gap-4">
                  {/* Discount Type Selection */}

                  {/* Threshold and Discount Inputs */}
                  <div className="flex gap-4">
                    <div className="flex">
                      <SelectInput
                        name={`discounts.${index}.type`}
                        placeholder="Select discount type"
                        triggerClassName={inputStyle}
                        control={control}
                        options={[
                          { label: "Bulk Quantity", value: "BULK_QUANTITY" },
                          {
                            label: "Price Threshold",
                            value: "PRICE_THRESHOLD",
                          },
                          { label: "Duration", value: "DURATION" },
                          { label: "Flat Rate", value: "FLAT_RATE" },
                        ]}
                        error={
                          formState.errors?.discounts?.[
                            index
                          ]?.type?.toString() as string
                        }
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <FormInputField
                        name={`discounts.${index}.threshold`}
                        inputStyle={inputStyle}
                        placeholder={`Threshold (e.g., 50 ${pricingModel === "HOURLY_RATE" ? "hours" : "guests"})`}
                        control={control}
                        type="text"
                        error={
                          formState.errors?.discounts?.[index]?.threshold
                            ?.message as string
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <FormInputField
                        name={`discounts.${index}.discount`}
                        inputStyle={inputStyle}
                        placeholder="Discount amount"
                        control={control}
                        type="text"
                        error={
                          formState.errors?.discounts?.[index]?.discount
                            ?.message as string
                        }
                      />
                    </div>
                  </div>

                  {/* Percentage Toggle */}
                  <div className="flex items-center gap-2">
                    <Controller
                      name={`discounts.${index}.isPercentage`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="h-4 w-4"
                        />
                      )}
                    />
                    <Label className="text-sm">Is percentage discount?</Label>
                  </div>

                  {/* Remove Button */}
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute right-0 top-0 rounded-none bg-transparent text-[#FF3B30] shadow-none"
                    >
                      <FiMinus size={23} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* add discount button */}

            <Button
              type="button"
              onClick={handleAddDiscountTier}
              className="mt-2 flex w-fit items-center gap-1 rounded-none bg-transparent px-0 py-2 text-base text-[#004AAD] shadow-none"
            >
              <IoAddSharp size={28} color="#004AAD" /> Add discount tier
            </Button>
          </div>

          <div className="flex w-full flex-col items-center gap-5 py-4 sm:flex-row">
            <Button
              type="button"
              onClick={() => handleSteps(1)}
              className="h-14 w-full rounded-md border border-[#004AAD] bg-[#FFFFFF] px-6 py-4 text-center font-bold text-[#004AAD] hover:bg-gray-300 sm:w-[220px]"
            >
              Go back
            </Button>

            <ButtonWithLoader
              type="submit"
              loading={isPending}
              className={`h-14 w-full flex-1 rounded-md border border-[#004AAD] bg-[#004AAD] px-6 py-3 text-center font-bold text-white hover:bg-[#183196]`}
            >
              Continue
            </ButtonWithLoader>
          </div>
        </form>
      </FormProvider>
      {/* } */}
    </div>
  );
};
