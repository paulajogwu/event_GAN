"use client";

import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "~/public/img/logo/blue-logo.svg";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import loginImage from "~/public/img/login_image.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import FormInputField from "../form-field";
import { useRouter } from "next/navigation";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Password is too short" }), // ZCurrentPasswordSchema,
});

interface LoginFormProps {
  isGoogleAuthEnabled: boolean;
}

const LoginForm = ({ isGoogleAuthEnabled }: LoginFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  // const router = useRouter();
  // const { mutateAsync: createPasskeySigninOptions } =
  //   api.passkey.createSigninOptions.useMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const email = values.email;
    const password = values.password;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Unable to sign in",
        description: "Incorrect email or password",
      });
    } else {
      const session = await getSession();

      const role = session?.user?.role;

      if (role === "VENDOR") {
        if (session?.user?.onboardingStatus === "COMPLETED") {
          router.replace("/dashboard");
        } else {
          router.replace(`/onboarding?step=${session?.user?.onboardingStatus}`);
        }
      } else if (role === "USER") {
        router.replace("/user");
      }
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
    setLoading(false);
  }

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
          <div className="flex h-full w-full flex-col px-3 py-8 md:max-w-2xl lg:min-w-[609px]">
            <div>
              <h1 className="pb-3 text-3xl font-semibold">Welcome back!</h1>
              <p>Welcome back! Please log in to access your account</p>
            </div>

            {isGoogleAuthEnabled && (
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
            )}
            <Form {...form}>
              <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col py-3">
                  <FormInputField
                    disabled={isSubmitting || loading}
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    control={form.control}
                    error={form.formState.errors.email?.message}
                  />
                </div>

                <div className="flex max-w-full items-end justify-between py-3">
                  <div className="flex-1">
                    <FormInputField
                      disabled={isSubmitting || loading}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      control={form.control}
                      error={form.formState.errors.password?.message}
                    />
                  </div>
                  <Link
                    href="/forgot-password"
                    className="ml-2 text-nowrap text-sm text-[#333333]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="flex items-center gap-2 py-3">
                  <Checkbox id="terms" className="custom-checkbox" />
                  <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </Label>
                </div>

                <Button
                  disabled={isSubmitting || loading}
                  className="flex h-12 w-full items-center justify-between rounded-md bg-[#004AAD] hover:bg-[#183196] px-4 py-5 font-medium text-white duration-150"
                >
                  <span />
                  <span>Login</span>
                  <IoIosArrowForward size={20} />
                </Button>

                <div className="flex items-center pt-3 text-sm">
                  <span>Don{"'"}t have an account?</span>
                  <Link
                    href="/sign-up"
                    className="ml-2 flex items-center gap-x-1 text-black underline"
                  >
                    Sign up{" "}
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
              // objectPosition="center"
              // objectFit={"contain"}

              className="h-full w-full rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;

// https://www.figma.com/design/IGC3oaREOjZZRunnTcLyd2/EventGizmo?t=6ZyrtEBSJBxnAfmB-0
