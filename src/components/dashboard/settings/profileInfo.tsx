"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/onboarding/form-field";
import SelectInput from "@/components/common/inputs/form/select-input";
import { useUserSession } from "@/components/hooks/client/userSession";
import { Country, State, ICountry, IState } from "country-state-city";
import profileImage from "~/public/img/avatar1.png";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { GoPencil } from "react-icons/go";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

const profileInfoSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  countryOfResidence: z.string().min(1, { message: "Country is required" }),
  stateOfResidence: z.string().min(1, { message: "State is required" }),
  profilePhoto: z.string().nullable(),
});

type SelectOption = {
  value: string;
  label: string;
  icon?: React.JSX.Element; // Optional icon for countries, not for states
};

function ProfileInfo() {
  const [countryList, setCountryList] = useState<SelectOption[]>([]);
  const [stateList, setStateList] = useState<SelectOption[]>([]);
  const user = useUserSession();

  const form = useForm<z.infer<typeof profileInfoSchema>>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      countryOfResidence: "",
      stateOfResidence: "",
      profilePhoto: null, // Default value for profile photo
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const { mutateAsync } = api.profile.updateProfile.useMutation({
    onSuccess: async ({ message }) => {
      toast({
        variant: "default",
        title: "Profile Updated",
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

  // Fetch countries on component mount
  useEffect(() => {
    const countries: ICountry[] = Country.getAllCountries(); // Fetch the list of countries
    const formattedCountries: SelectOption[] = countries.map((country) => ({
      value: country.isoCode,
      label: country.name,
      icon: (
        <Image
          src={`https://flagcdn.com/${country.isoCode.toLowerCase()}.svg`}
          alt={country.name}
          width={20}
          height={15}
        />
      ),
    }));
    setCountryList(formattedCountries);
  }, []);

  const handleCountryChange = (countryIsoCode: string) => {
    const states: IState[] = State?.getStatesOfCountry(countryIsoCode);
    const formattedStates: SelectOption[] =
      states.length > 0
        ? states.map((state) => ({
            value: state.isoCode,
            label: state.name ?? "Select state",
          }))
        : [];
    setStateList(formattedStates); // Update state list
  };

  async function onSubmit(values: z.infer<typeof profileInfoSchema>) {
    const formattedValues = {
      ...values,
      profilePhoto: values.profilePhoto ?? null,
    };
    console.log(formattedValues);
    await mutateAsync(formattedValues);
  }

  const selectedCountry = form.watch("countryOfResidence");
  const inputStyle =
    "border border-[#D0D5DD] p-[16px] rounded-[6px] h-12 bg-white";

  return (
    <section className="w-full">
      <Card className="bg-white shadow-md">
        <CardHeader className="flex flex-row items-center gap-x-3">
          <FormProvider {...form}>
            <UploadProfilePhoto /> {/* Profile Photo Upload */}
          </FormProvider>
        </CardHeader>
        <CardContent className="flex w-full flex-col">
          <Form {...form}>
            <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="dm_sans grid w-full grid-cols-1 gap-4 py-3 sm:grid-cols-2">
                <div className="flex w-full flex-col">
                  <FormInputField
                    disabled={isSubmitting}
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                    type="text"
                    inputStyle={inputStyle}
                    control={form.control}
                    error={form.formState.errors.firstName?.message}
                  />
                </div>
                <div className="flex w-full flex-col">
                  <FormInputField
                    disabled={isSubmitting}
                    name="lastName"
                    label="Last name"
                    placeholder="Last name"
                    type="text"
                    inputStyle={inputStyle}
                    control={form.control}
                    error={form.formState.errors.lastName?.message}
                  />
                </div>
              </div>

              <div className="dm_sans flex w-full flex-col">
                <Label className="py-2">Email address</Label>
                <Input
                    className={inputStyle + "!bg-[#F0F2F5] !border-[#D0D5DD] !border"}
                    disabled
                    placeholder="Email address"
                    value={user?.email ?? ""}
                />
                <Link
                  href={{
                    query: {
                      tab: "Account-Security",
                    },
                  }}
                  className="w-fit py-1 text-xs underline"
                >
                  Change your email address
                </Link>
              </div>

              <div className="dm_sans grid w-full grid-cols-1 gap-4 py-3 sm:grid-cols-2">
                <div>
                  <SelectInput
                    name="countryOfResidence"
                    placeholder="Select a country"
                    label="Country of residence"
                    disabled={isSubmitting}
                    control={form.control}
                    options={countryList}
                    icon={
                      countryList?.find(
                        (country) =>
                          country.value === form.watch("countryOfResidence"),
                      )?.icon
                    }
                    error={form.formState.errors.countryOfResidence?.message}
                    onValueChange={(value) => {
                      form.setValue("countryOfResidence", value);
                      handleCountryChange(value);
                    }}
                  />
                </div>
                <div>
                  <SelectInput
                    name="stateOfResidence"
                    placeholder="Select a state"
                    label="Country of residence"
                    control={form.control}
                    disabled={!selectedCountry || !stateList || isSubmitting}
                    options={stateList}
                    error={form.formState.errors.stateOfResidence?.message}
                  />
                </div>
              </div>
              <Button
                className="rounded-lg border bg-[#004AAD] px-[18px] py-[10px] text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default ProfileInfo;

export function UploadProfilePhoto() {
  const user = useUserSession();
  const { setValue } = useFormContext();
  const [files, setFiles] = useState<string | null>(null);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const preview = URL.createObjectURL(file);
        setFiles(preview);
        setValue("profilePhoto", preview);
      }
    },
  });

  const handleClearFiles = () => {
    setFiles(null);
    setValue("profilePhoto", null);
  };

  useEffect(() => {
    if (fileRejections.length > 0) {
      alert("You can only upload one image."); //will add toast later
    }
    // Revoke the data URIs to avoid memory leaks
    return () => {
      if (files) URL.revokeObjectURL(files);
    };
  }, [files, fileRejections]);

  return (
    <div className="flex w-full items-center gap-5">
      <div className="relative flex h-[120px] w-[120px] flex-col items-center justify-center">
        <input {...getInputProps()} className="hidden" />
        <Image
          src={files ?? user?.image ?? profileImage}
          alt="Profile"
          fill
          className="h-full w-full rounded-full object-cover object-center"
        />
        <div
          {...getRootProps({ className: "dropzone" })}
          className="absolute z-30 flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#0000004D] hover:bg-[#0000007d]"
        >
          <GoPencil size={30} color="white" />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="satoshi text-xl font-bold text-[#101928]">
          Profile photo
        </h1>
        <p className="satoshi text-sm font-medium text-[#667185]">
          This image will be displayed on your profile
        </p>
        <div className="py-3">
          <Button
            disabled={!files}
            onClick={handleClearFiles}
            className="w-[5.4rem] rounded-lg border border-[#D0D5DD] bg-[#D0D5DD] px-[18px] py-[10px] text-black hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
