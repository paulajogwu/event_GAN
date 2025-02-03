"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/onboarding/form-field";
import { EditPasswordSchema } from "@/validations/changePassword";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

function EditPassword() {
  const form = useForm<z.infer<typeof EditPasswordSchema>>({
    resolver: zodResolver(EditPasswordSchema),
    defaultValues: {
      newPassword: "",
      rptPassword: "",
      currentPassword: "",
    },
  });

  const { mutateAsync } = api.profile.updatePassword.useMutation({
    onSuccess: ({ message }) => {
      toast({
        variant: "default",
        title: "Password Updated",
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
  async function onSubmit(values: z.infer<typeof EditPasswordSchema>) {
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  }

  const inputStyle =
    "border border-[#D0D5DD] p-[16px] rounded-[6px] h-12 bg-white";
  return (
    <section className="dm_sans w-full">
      <div className="flex w-full flex-col">
        <h1 className="py-2 text-[20px] font-bold text-[#101928]">
          Edit password
        </h1>
        <Form {...form}>
          <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col py-3">
              <Label className="pb-3">Current password</Label>
              <FormInputField
                className={inputStyle}
                name="currentPassword"
                label="Current password"
                placeholder="Enter your current password"
                control={form.control}
                error={form.formState.errors.currentPassword?.message}
                type="password"
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-4 py-3 sm:grid-cols-2">
              <div className="flex w-full flex-col">
                <FormInputField
                  disabled={isSubmitting}
                  name="newPassword"
                  label="New password"
                  placeholder="Enter your new password"
                  type="password"
                  inputStyle={inputStyle}
                  control={form.control}
                  error={form.formState.errors.newPassword?.message}
                />
              </div>
              <div className="flex w-full flex-col">
                <FormInputField
                  disabled={isSubmitting}
                  name="rptPassword"
                  label="Confirm password"
                  placeholder="Confirm password"
                  type="password"
                  inputStyle={inputStyle}
                  control={form.control}
                  error={form.formState.errors.rptPassword?.message}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button className="rounded-lg border bg-[#004AAD] px-[18px] py-[10px] text-white hover:bg-blue-700">
                Update password
              </Button>
              <Button className="rounded-lg bg-white px-[18px] py-[10px] text-[#004AAD] hover:bg-gray-100">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default EditPassword;
