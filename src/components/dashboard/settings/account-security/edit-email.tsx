"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/onboarding/form-field";
import { useUserSession } from "@/components/hooks/client/userSession";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

const EditEmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

function EditEmail() {
  const user = useUserSession();

  const form = useForm<z.infer<typeof EditEmailSchema>>({
    resolver: zodResolver(EditEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync } = api.profile.updateEmail.useMutation({
    onSuccess: ({ message }) => {
      toast({
        variant: "default",
        title: "Email Updated",
        description: message,
      });
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof EditEmailSchema>) {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="w-full">
      <div className="satoshi">
        <h1 className="py-2 text-[20px] font-bold text-[#101928]">
          Edit email address
        </h1>
        <p className="text-sm font-medium text-[#667185]">
          Changing your email address will require re-verification.
        </p>
      </div>
      <div className="flex w-full flex-col">
        <Form {...form}>
          <div className="mt-5">
            <div className="flex w-full flex-1 flex-col">
              <FormInputField
                disabled={isSubmitting}
                name="email"
                label="Email address"
                placeholder="Email address"
                type="email"
                inputStyle={
                  "border border-[#D0D5DD] p-[16px] rounded-[6px] h-12 bg-white w-full flex flex-1"
                }
                control={form.control}
                error={form.formState.errors.email?.message}
              />
            </div>

            <div className="flex items-center gap-4 py-4">
              <Button className="rounded-lg border bg-[#004AAD] px-[18px] py-[10px] text-white hover:bg-blue-700">
                Save
              </Button>
              <Button
                type="button"
                className="rounded-lg bg-white px-[18px] py-[10px] text-[#004AAD] hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default EditEmail;
