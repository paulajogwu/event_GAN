"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiLocationOn } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/onboarding/form-field";
import Stars from "~/public/img/vendor/stars.svg";
import Image from "next/image";
import useLocalCurrency from "@/components/hooks/useLocalCurrency";
import { craftEventSchema } from "@/trpc/api/routers/ai/schema";
import { demoEventData } from "../data";
import { api } from "@/trpc/react";
import { LuLoader2 } from "react-icons/lu";
import SelectInput from "@/components/common/inputs/form/select-input";

const formSchema = craftEventSchema;

function DescribeEvents({
  handleStep,
  sumitValues,
}: {
  handleStep: () => void;
  sumitValues: ReturnType<
    typeof api.ai.generateEventPlan.useMutation
  >["mutateAsync"];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? demoEventData
        : {
            eventDescription: "",
            eventLocation: "",
            //   eventType: "",
            budget: "",
            attendee: "",
          },
  });

  const localCurrency = useLocalCurrency();
  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // alert(values.attendee);
    try {
      await sumitValues(values);
      handleStep();
    } catch (error) {
      console.log(error);
    }
    // form.reset();
  }
  return (
    <section className="satoshi h-lvh max-h-screen">
      <Form {...form}>
        <form
          className="mx-auto mt-5 flex max-w-3xl flex-col rounded-xl bg-white px-3 py-[30px] shadow-lg lg:px-[43.5px]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="relative mb-2 flex w-full flex-col py-4">
            <FormInputField
              disabled={isSubmitting}
              istextarea={true}
              name="eventDescription"
              label=""
              placeholder="Tell us about your event"
              type="eventDescription"
              control={form.control}
              textareaStyle="bg-[#004AAD03] py-4 px-3 border-[#E5EFFF] border"
              rows={8}
              error={form.formState.errors.eventDescription?.message}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative col-span-2 flex w-full items-center sm:col-span-1">
              <CiLocationOn
                color={"#1A60BE"}
                size={20}
                className="absolute left-2 top-[10px]"
              />
              <FormInputField
                disabled={isSubmitting}
                name="eventLocation"
                label=""
                placeholder="Event location"
                type="eventLocation"
                inputStyle="bg-[#FCFDFE] border-[#F0F6FF] border max-w-full text-[#4C4C4C] pl-[32px]"
                control={form.control}
                error={form.formState.errors.eventLocation?.message}
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <SelectInput
                name="budget"
                disabled={isSubmitting}
                control={form.control}
                placeholder="Select budget"
                triggerClassName="relative border w-full border-[#F0F6FF] bg-[#FCFDFE] pl-8 text-[#4C4C4C]"
                icon={<RiMoneyDollarCircleLine color={"#1A60BE"} size={19} />}
                options={[
                  {
                    value: "10000 - 50000",
                    label: `10000 - 50000 ${localCurrency}`,
                  },
                  {
                    value: "51,000 - 100,000 ",
                    label: `51,000 - 100,000  ${localCurrency}`,
                  },
                  {
                    value: "100,000 - 500,000+",
                    label: `100,000 - 500,000+ ${localCurrency}`,
                  },
                ]}
                error={form.formState.errors.budget?.message}
              />
            </div>
            <div className="col-span-2">
              <SelectInput
                disabled={isSubmitting}
                name="attendee"
                control={form.control}
                placeholder="Expected number of attendees?"
                triggerClassName="relative border border-[#F0F6FF] bg-[#FCFDFE] pl-8 text-[#4C4C4C]"
                icon={<LuUser2 color={"#1A60BE"} size={18} />}
                options={[
                  { value: "100 - 500", label: `100 - 500` },
                  { value: "500 - 1000 ", label: `500 - 1000 ` },
                  { value: "1000 - 5000", label: `   1000 - 5000+` },
                ]}
                error={form.formState.errors.attendee?.message}
              />
            </div>
          </div>
          <div className="my-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg_blue_gradient flex w-full items-center justify-center gap-x-3 rounded-md px-4 py-5 font-medium text-white duration-150 hover:bg-[#004AAD]/40"
            >
              {isSubmitting ? "Please wait...." : "Plan event"}
              {isSubmitting ? (
                <LuLoader2 size={20} color="white" className="animate-spin" />
              ) : (
                <Image src={Stars} alt="stars icon" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default DescribeEvents;
