"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormLabel } from "@/components/ui/form";
import { Button, ButtonWithLoader } from "@/components/ui/button";
import FormInputField from "@/components/onboarding/form-field";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { ServiceWithId } from "@/app/(authenticated)/user/hire/[id]/page";
import { fCurrency } from "@/lib/format-number";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  eventTitle: z.string().min(1, "Event title is required"),
  description: z.string().min(10, "Please provide more details"),
  location: z.string().min(1, "Location is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  attendee: z.string().min(1, {
    message: "Please select an expected number of attendee.",
  }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

interface EventDetailsProps {
  onBack: () => void;
  vendorId: string;
  selectedService: ServiceWithId[] | null;
}

const localCurrency = "";

const calculateTotal = (selectedService: ServiceWithId[], attendee: number) => {
  console.log(attendee);
  return selectedService.reduce((acc, service) => {
    if (service.pricingModel === "PER_PERSON") {
      return acc + service.price! * attendee;
    }
    return acc + service.price!;
  }, 0);
};

export function EventDetails({
  vendorId,
  onBack,
  selectedService,
}: EventDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [eventId, setEventId] = React.useState<string>("");

  const { mutateAsync: hireEvent, isPending } = api.event.hire.useMutation({
    onSuccess: (data) => {
      setEventId(data.event.id);
      setShowSuccessModal(true);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventTitle: "",
      description: "",
      location: "",
      zipCode: "",
      attendee: "",
    },
  });

  const attendee = form.watch("attendee");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await hireEvent({
      ...values,
      vendorId,
      budget: calculateTotal(
        selectedService ?? [],
        Number(form.getValues("attendee")),
      ),
      selectedServices: selectedService?.map((service) => service.id) || [],
    });
    // Add submission logic here
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold">Event Details</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log(errors);
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <FormInputField
              name="eventTitle"
              placeholder="Enter event title"
              type="text"
              label="Event Title"
              control={form.control}
              inputStyle="w-full p-2 border rounded-md"
              error={form.formState.errors.eventTitle?.message}
            />
          </div>

          <FormInputField
            name="description"
            placeholder="Describe your event"
            type="text"
            label="Description"
            control={form.control}
            istextarea={true}
            rows={4}
            textareaStyle="w-full p-2 border rounded-md"
            error={form.formState.errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInputField
              name="location"
              placeholder="Enter location"
              type="text"
              label="Location"
              control={form.control}
              inputStyle="w-full p-2 border rounded-md"
              error={form.formState.errors.location?.message}
            />

            <FormInputField
              name="zipCode"
              placeholder="Enter zip code"
              type="text"
              label="Zip Code"
              control={form.control}
              inputStyle="w-full p-2 border rounded-md"
              error={form.formState.errors.zipCode?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <FormInputField
                name="attendee"
                placeholder="Enter expected attendees"
                type="number"
                label="Expected Attendees"
                control={form.control}
                min={1}
                inputStyle="w-full p-2 border rounded-md"
                error={form.formState.errors.attendee?.message}
              />
            </div>
            <div className="">
              <FormLabel className="inline-block py-2 text-sm text-[#333333]">
                Date
              </FormLabel>
              <DatePickerWithRange
                buttonClassName="w-full border border-[#F0F6FF] bg-[#FCFDFE] pl-3 py-[6px] text-sm placeholder:text-gray-400"
                iconColor="#1A60BE"
                onDateChange={(date) => {
                  if (date) {
                    form.setValue("dateRange", {
                      from: date.from || new Date(),
                      to: date.to || new Date(),
                    });
                  }
                }}
              />
              {form.formState.errors.dateRange?.message && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.dateRange?.message}
                </p>
              )}
            </div>
          </div>

          {selectedService && selectedService.length > 0 && (
            <div className="mb-4 rounded-lg border p-4">
              <h3 className="mb-2 text-lg font-semibold">Selected Services</h3>
              <div className="space-y-2">
                {selectedService.map((service) => (
                  <div
                    key={service.id}
                    className="flex justify-between text-sm"
                  >
                    <span>{service.name}</span>
                    <span className="font-medium text-blue-600">
                      {service.pricingModel === "HOURLY_RATE"
                        ? `$${service.price}/hour`
                        : service.pricingModel === "PER_PERSON"
                          ? `$${service.price}/person`
                          : `$${service.price}`}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between border-t pt-2">
                  <span className="text-base font-semibold text-gray-700">
                    Total
                  </span>
                  <span className="font-medium text-blue-600">
                    {fCurrency(
                      calculateTotal(selectedService, Number(attendee)),
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ButtonWithLoader
                type="submit"
                loading={isPending}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </ButtonWithLoader>
            </motion.div>
          </div>
        </form>
      </Form>

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <DialogTitle className="text-center">
              Event Created Successfully!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your event has been created. Please proceed to payment to confirm
              your booking.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => router.push(`/user/events/${eventId}/payment/`)}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
