"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { MdArrowOutward } from "react-icons/md";
import { z } from "zod";
import loginImage from "~/public/img/login_image.png";
import Logo from "~/public/img/logo2.png";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInputField from "../form-field";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

const formSchema = z.object({
  email: z.string().email({
    message: "Email is not valid.",
  }),
});

export default function ForgotPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  const router = useRouter();

  const { mutateAsync } = api.auth.forgotPassword.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        variant: "default",
        title: "Reset email sent",
        description: message,
      });
      router.replace("/email-sent");
    },
    onError: ({ message }) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await mutateAsync(values.email);
  };

  return (
    <section className="dm_sans flex min-h-full flex-col overflow-x-hidden bg-[#004AAD] px-3 md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center sm:container">
        <div className="mx-auto flex h-full min-h-[649px] w-full flex-col items-center justify-evenly gap-10 lg:flex-row">
          <div className="relative hidden h-full min-h-[638px] w-full min-w-[609px] lg:flex">
            <Image
              src={loginImage}
              alt="Login illustration"
              fill
              className="h-full w-full object-contain object-center rounded-lg"
            />
          </div>

          <div className="flex h-full w-full flex-col px-3 py-8 md:max-w-2xl lg:min-w-[609px]">
            <div className="flex items-center justify-center py-7">
              <Image
                src={Logo}
                alt="logo"
                height={100}
                width={100}
                // objectFit="cover"
                className="h-auto w-auto object-cover"
              />
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full rounded-lg bg-[#FFFFFF0A] p-5 shadow-xl sm:max-w-xl sm:p-10"
              >
                <div className="text-[#F7FBFF]">
                  <h1 className="pb-3 text-3xl font-bold">Forgot password?</h1>
                  <p className="text-sm">
                    Please enter your email so we can send you a password reset
                    link.
                  </p>
                </div>
                <div className="flex w-full flex-col py-3">
                  <FormInputField
                    disabled={isSubmitting}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    inputStyle="h-[40px] rounded-sm border border-gray-300 bg-transparent p-2 text-sm font-normal text-white outline-none placeholder:text-gray-400 focus:border"
                    control={form.control}
                    error={form.formState.errors.email?.message}
                  />
                </div>

                <div className="my-3">
                  <Button className="flex w-full items-center justify-center rounded-md bg-[#F7FBFF] px-4 py-5 font-medium text-[#004AAD] duration-150 hover:bg-white/80">
                    Send password reset
                  </Button>
                  <div className="flex items-center gap-x-2 py-2 text-sm text-[#FFBA3B]">
                    <span>Go back to </span>{" "}
                    <Link href={"/login"} className="flex items-center gap-2">
                      {" "}
                      login{" "}
                      <span>
                        <MdArrowOutward size={20} />
                      </span>
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
