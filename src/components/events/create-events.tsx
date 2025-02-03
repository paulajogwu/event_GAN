"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsStars } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { LuUser2 } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbSpeakerphone } from "react-icons/tb";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField as Field,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormInputField from "@/components/onboarding/form-field";
// import { formSchema } from '@/validations/create-event-val';

const formSchema = z.object({
  eventDescription: z
    .string()
    .min(3, { message: "Event must be at least 2 characters." }),
  // .max(13, { message: "Your event must be at most 13 characters." }),

  eventLocation: z.string().min(0, {
    message: "Location is required",
  }),
  eventType: z.string({
    required_error: "Please select an event.",
  }),
  budget: z.string().min(0, {
    message: "Please select a budget.",
  }),
  attendee: z.string().min(0, {
    message: "Please select an expected number of attendee.",
  }),
});

function CreateEvents() {
  // const isDesktopOrLaptop = useMediaQuery({
  //     query: '(min-width: 1224px)'
  // })
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventDescription: "",
      eventLocation: "",
      eventType: "",
      budget: "",
      attendee: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  function onSubmit(values: z.infer<typeof formSchema>) {
    // alert(values.attendee);
    console.log(values);
    form.reset();
  }
  return (
    <section className="h-lvh max-h-screen">
      <Form {...form}>
        <form
          className="mx-auto mt-5 flex max-w-3xl flex-col rounded-xl bg-white p-2 shadow-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="relative mb-2 flex w-full flex-col py-4">
            <span className="absolute left-2 top-3">
              <BsStars color={"#1A60BE"} size={20} />
            </span>
            <FormInputField
              disabled={isSubmitting}
              istextarea={true}
              name="eventDescription"
              label="eventDescription"
              placeholder="Tell us about your event"
              type="eventDescription"
              control={form.control}
              error={form.formState.errors.eventDescription?.message}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <span className="absolute left-2 top-3">
                <CiLocationOn color={"#1A60BE"} size={20} />
              </span>
              <FormInputField
                disabled={isSubmitting}
                name="eventLocation"
                label="eventLocation"
                placeholder="Tell us about your event"
                type="eventLocation"
                control={form.control}
                error={form.formState.errors.eventLocation?.message}
              />
            </div>

            <Field
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="relative bg-slate-100 pl-8 text-[#4C4C4C]">
                        <span className="absolute left-2 top-2">
                          <TbSpeakerphone color={"#1A60BE"} size={20} />
                        </span>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="event 1">event 1</SelectItem>
                      <SelectItem value="event 2">event 2</SelectItem>
                      <SelectItem value="event 3">event 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Field
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="relative bg-slate-100 pl-8 text-[#4C4C4C]">
                        <span className="absolute left-2 top-2">
                          <RiMoneyDollarCircleLine
                            color={"#1A60BE"}
                            size={19}
                          />
                        </span>
                        <SelectValue placeholder="Select budget " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="1000">1000</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="3000">3000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Field
              control={form.control}
              name="attendee"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className=" ">
                      <SelectTrigger className="relative bg-slate-100 pl-8 text-[#4C4C4C]">
                        <span className="absolute left-2 top-2">
                          <LuUser2 color={"#1A60BE"} size={18} />
                        </span>
                        <SelectValue
                          placeholder="Select number of attendee"
                          className="rounded-md border-gray-200"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="my-4">
            <Button className="flex w-full items-center justify-center gap-x-3 rounded-md bg-gradient-to-r from-[#1A60BE] to-[#92C0FF2B] px-4 py-5 font-medium text-white duration-150 hover:bg-[#004AAD]/40">
              Plan event
              <BsStars size={25} />
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default CreateEvents;
