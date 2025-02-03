"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsStars } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInputField from "@/components/onboarding/form-field";
import SelectInput from "@/components/common/inputs/form/select-input";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { LuUser2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { eventTypes } from "./data";
import useLocalCurrency from "@/components/hooks/useLocalCurrency";
import { useSessionStorage } from "usehooks-ts";
import { demoEventData } from "@/components/events/plan-events/data";
import { craftEventSchema } from "@/trpc/api/routers/ai/schema";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import dayjs from "dayjs";

// import { formSchema } from '@/validations/create-event-val';

const formSchema = craftEventSchema;

export interface CreateEventsProps {
  id: string;
}

export type DrafPlanQuery = Omit<
  z.infer<typeof formSchema>,
  "startDate" | "endDate"
> & {
  createdAt: string;
  id: string;
  startDate: string;
  endDate: string;
};

function CreateEvents({ id }: CreateEventsProps) {
  // const isDesktopOrLaptop = useMediaQuery({
  //     query: '(min-width: 1224px)'
  // })
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? demoEventData
        : {
            eventDescription: "",
            eventLocation: "",
            eventType: "",
            budget: "",
            attendee: "",
          },
  });

  const [_, setValue] = useSessionStorage<DrafPlanQuery | null>(
    `plan-event-query-${id}`,
    null,
  );

  const localCurrency = useLocalCurrency();

  const isSubmitting = form.formState.isSubmitting;
  function onSubmit(values: z.infer<typeof formSchema>) {
    // alert(values.attendee);
    console.log(values);
    setValue({
      ...values,
      startDate: dayjs(values.startDate).toISOString(),
      endDate: dayjs(values.endDate).toISOString(),
      createdAt: new Date().toISOString(),
      id,
    });
    router.push(`/user/plan-event/recommended?id=${id}`);
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto mt-5 flex w-full flex-col gap-y-4 rounded-xl bg-white p-3 shadow-lg xl:p-[30px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative mb-2 flex w-full flex-col">
          <span className="absolute left-2 top-[7%]">
            <BsStars color={"#1A60BE"} size={20} />
          </span>
          <FormInputField
            disabled={isSubmitting}
            istextarea={true}
            name="eventDescription"
            placeholder="Tell us about your event"
            type="text"
            textareaStyle="border bg-[#FCFDFE] border-[#F0F6FF] pl-8"
            rows={5}
            control={form.control}
            error={form.formState.errors.eventDescription?.message}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative flex w-full flex-col">
            <span className="absolute left-2 top-[26%]">
              <CiLocationOn color={"#1A60BE"} size={20} />
            </span>
            <FormInputField
              disabled={isSubmitting}
              name="eventLocation"
              placeholder="Event Location"
              type="text"
              control={form.control}
              inputStyle="border bg-[#FCFDFE] border-[#F0F6FF] placeholder:text-gray-400 pl-7  w-full h-[47px]"
              error={form.formState.errors.eventLocation?.message}
            />
          </div>

          <SelectInput
            name="budget"
            placeholder="Estimated budget"
            control={form.control}
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
            icon={<RiMoneyDollarCircleLine color={"#1A60BE"} size={19} />}
            error={form.formState.errors.budget?.message}
          />
          <SelectInput
            name="eventType"
            placeholder="Select Event Type (optional)"
            control={form.control}
            options={eventTypes.map((val) => ({
              value: val,
              label: val,
            }))}
            icon={<TbSpeakerphone color={"#1A60BE"} size={20} />}
            error={form.formState.errors.eventType?.message}
          />
          <SelectInput
            name="attendee"
            placeholder="Expected number of  attendee"
            control={form.control}
            options={[
              { value: "Less than 100", label: `Less than 100` },
              { value: "100 - 500", label: `100 - 500` },
              { value: "500 - 1000 ", label: `500 - 1000 ` },
              { value: "1000 - 5000", label: `   1000 - 5000+` },
            ]}
            icon={<LuUser2 color={"#1A60BE"} size={18} />}
            error={form.formState.errors.attendee?.message}
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-4">
          <div className="">
            <DatePickerWithRange
              buttonClassName="w-full border border-[#F0F6FF] bg-[#FCFDFE] pl-3 py-[6px] text-sm placeholder:text-gray-400"
              iconColor="#1A60BE"
              onDateChange={(date) => {
                if (date) {
                  form.setValue("startDate", dayjs(date.from).toISOString());
                  form.setValue("endDate", dayjs(date.to).toISOString());
                }
              }}
            />
            {(form.formState.errors.startDate?.message ??
              form.formState.errors.endDate?.message) && (
              <p className="text-sm text-red-500">
                {form.formState.errors.startDate?.message ??
                  form.formState.errors.endDate?.message}
              </p>
            )}
          </div>

          <div className="relative flex w-full flex-col">
            <span className="absolute left-2 top-[26%]">
              <CiLocationOn color={"#1A60BE"} size={20} />
            </span>
            <FormInputField
              disabled={isSubmitting}
              name="eventLocationZip"
              placeholder="Event Location Zip"
              type="text"
              control={form.control}
              inputStyle="border bg-[#FCFDFE] border-[#F0F6FF] placeholder:text-gray-400 pl-7  w-full h-[47px]"
              error={form.formState.errors.eventLocationZip?.message}
            />
          </div>
        </div>
        <div className="my-4">
          <Button
            type="submit"
            className="bg_plan_blue flex w-full items-center justify-center gap-x-3 rounded-md px-4 py-5 font-medium text-white duration-150 hover:bg-[#004AAD]/40"
          >
            Plan event
            <BsStars size={25} />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateEvents;
