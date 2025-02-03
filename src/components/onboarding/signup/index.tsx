"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { z } from "zod";
import loginImage from "~/public/img/login_image.png";
import Logo from "~/public/img/logo/blue-logo.svg";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ZSignUpMutationSchema } from "@/trpc/api/routers/auth/schema";
import FormInputField from "../form-field";
import { signIn } from "next-auth/react";
import { useState } from "react";

const formSchema = ZSignUpMutationSchema;
export default function SignupForm({ isVendor }: { isVendor?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithGoogle() {
    await signIn("google", { callbackUrl: "/user" });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isVendor: isVendor ?? false,
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateAsync(values);
      router.replace(`/login`);
    } catch (err) {
      console.error(err);
    }
  }

  const { mutateAsync } = api.auth.signup.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        variant: "default",
        title: "🎉 Thanks for signing up!",
        description: message,
      });
    },
    onError: (err) => {
      if (err.message === "User already exists") {
        toast({
          variant: "destructive",
          title: "Account already exists",
          description:
            "An account with this email already exists. Please try logging in instead.",
        });
        return;
      }

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    },
  });

  return (
    <section className="dm_sans flex min-h-full flex-col overflow-x-hidden bg-[#FBF9F3] px-3 md:px-8 lg:px-10">
      <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center sm:container">
        <div className="flex items-center justify-center py-7">
          <Image
            src={Logo}
            alt="logo"
            height={150}
            width={180}
            className="h-auto w-40 object-cover"
          />
        </div>
        <div className="mx-auto flex h-full min-h-[649px] w-full flex-col items-center justify-evenly gap-10 lg:flex-row">
          <div className="flex h-full w-full flex-col px-3 py-8 lg:min-w-[609px]">
            <div>
              <h1 className="pb-3 text-3xl font-semibold">Welcome dear</h1>
              <p>
                To{" "}
                {isVendor
                  ? "create a vendor account, complete the form below"
                  : "get started please create an account"}
              </p>
            </div>

            <div className="mt-5">
              <Button
                onClick={signInWithGoogle}
                disabled={loading}
                className="flex h-[56px] w-full items-center justify-center gap-x-3 rounded-md border border-[#FFF5E5] bg-[#FFFFFF] py-2 text-sm font-medium shadow-none duration-150 hover:bg-gray-50 active:bg-gray-100"
              >
                <FcGoogle size={25} />
                <span>Continue with Google</span>
              </Button>
            </div>

            <Form {...form}>
              <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                {/* {name} */}
                <div className="flex w-full flex-col py-3">
                  <FormInputField
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    disabled={isSubmitting || loading}
                    control={form.control}
                    error={form.formState.errors.name?.message}
                  />
                </div>

                {/* {email} */}
                <div className="flex w-full flex-col py-3">
                  <FormInputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    disabled={isSubmitting || loading}
                    control={form.control}
                    error={form.formState.errors.email?.message}
                  />
                </div>

                {/* {password} */}
                <div className="flex w-full flex-col py-3">
                  <FormInputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    disabled={isSubmitting || loading}
                    control={form.control}
                    error={form.formState.errors.password?.message}
                  />
                </div>

                <Button
                  disabled={isSubmitting || loading}
                  className="flex h-12 w-full items-center justify-between rounded-md bg-[#004AAD] hover:bg-[#183196]  px-4 py-5 font-medium text-white duration-150"
                >
                  <p></p>
                  <span>Create account</span>
                  <IoIosArrowForward size={20} />
                </Button>

                <div className="flex items-center pt-3 text-sm">
                  <span>Already have an account?</span>
                  <Link
                    href="/login"
                    className="ml-2 flex items-center gap-x-1 text-black underline"
                  >
                    Sign In
                    <span>
                      <MdArrowOutward size={20} />
                    </span>
                  </Link>
                </div>
              </form>
            </Form>
          </div>

          <div className="relative hidden h-full min-h-[638px] w-full min-w-[609px] p-3 lg:flex">
            <Image
              src={loginImage}
              alt="Login illustration"
              fill
              className="h-full w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
