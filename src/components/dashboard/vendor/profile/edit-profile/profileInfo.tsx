'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from '@/components/onboarding/form-field';
import SelectInput from '@/components/common/inputs/form/select-input';
import { useUserSession } from '@/components/hooks/client/userSession';
import { Country, State, ICountry, IState } from 'country-state-city';
import profileImage from "~/public/img/avatar1.png";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useDropzone } from 'react-dropzone';
import { GoPencil } from "react-icons/go";
import { Label } from '@/components/ui/label';
import { useFormContext } from "react-hook-form"

const profileInfoSchema = z.object({
    businessName: z.string().min(1, { message: "Business name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    countryOfResidence: z.string().min(1, { message: "Country is required" }),
    stateOfResidence: z.string().min(1, { message: "State is required" }),
    profilePhoto: z.any(),
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
            businessName: "",
            description: "",
            countryOfResidence: "",
            stateOfResidence: "",
            profilePhoto: null, // Default value for profile photo
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    // Fetch countries on component mount
    useEffect(() => {
        const countries: ICountry[] = Country.getAllCountries(); // Fetch the list of countries
        const formattedCountries: SelectOption[] = countries.map((country) => ({
            value: country.isoCode,
            label: country.name,
            icon: <Image src={`https://flagcdn.com/${country.isoCode.toLowerCase()}.svg`} alt={country.name} width={20} height={15} />,
        }));
        setCountryList(formattedCountries);
    }, []);

    const handleCountryChange = (countryIsoCode: string) => {
        const states: IState[] = State?.getStatesOfCountry(countryIsoCode);
        const formattedStates: SelectOption[] = states.length > 0
            ? states.map((state) => ({
                value: state.isoCode,
                label: state.name ?? "Select state",
            }))
            : [];
        setStateList(formattedStates); // Update state list
    };

    async function onSubmit(values: z.infer<typeof profileInfoSchema>) {
        console.log(values); // Handle form submission logic
        alert(JSON.stringify(values))
    }

    const selectedCountry = form.watch("countryOfResidence");
    const inputStyle = "border border-[#D0D5DD] p-[16px] rounded-[6px] h-12 bg-white";

    return (
        <section className="w-full">
            <Card className="bg-white shadow-md">
                <CardHeader className="flex flex-row items-center gap-x-3">
                    <FormProvider {...form}>
                        <UploadProfilePhoto /> {/* Profile Photo Upload */}
                    </FormProvider>
                </CardHeader>
                <CardContent className="flex flex-col w-full">
                    <Form {...form}>
                        <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full py-3 dm_sans">
                                <div className="flex w-full flex-col">
                                    <FormInputField
                                        disabled={isSubmitting}
                                        name="businessName"
                                        label="Business name"
                                        placeholder="Business name"
                                        type="text"
                                        inputStyle={inputStyle}
                                        control={form.control}
                                        error={form.formState.errors.businessName?.message}
                                    />
                                </div>
                                <div className="flex w-full flex-col">
                                    <FormInputField
                                        disabled={isSubmitting}
                                        name="description"
                                        label="Description"
                                        placeholder="Brief description"
                                        type="text"
                                        istextarea={true}
                                        inputStyle={inputStyle}
                                        control={form.control}
                                        error={form.formState.errors.description?.message}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col dm_sans">
                                <Label className="py-2">Email address</Label>
                                <Input className={inputStyle} disabled placeholder="Email address" value={user?.email ?? ""} />
                                <Link href={"?tab=Change email"} className="underline py-1 w-fit text-xs">
                                    Change your email address
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full py-3 dm_sans">
                                <div>
                                    <SelectInput
                                        name="countryOfResidence"
                                        placeholder="Select a country"
                                        label='Country of residence'
                                        disabled={isSubmitting}
                                        control={form.control}
                                        options={countryList}
                                        icon={countryList?.find((country) => country.value === form.watch("countryOfResidence"))?.icon}
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
                                        label='Country of residence'
                                        control={form.control}
                                        disabled={!selectedCountry || !stateList || isSubmitting}
                                        options={stateList}
                                        error={form.formState.errors.stateOfResidence?.message}
                                    />
                                </div>
                            </div>
                            <Button className="bg-[#004AAD] hover:bg-blue-700 border rounded-lg px-[18px] py-[10px] text-white" disabled={isSubmitting}>
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
                setValue("profilePhoto", preview)
            }
        },
    });


    const handleClearFiles = () => {
        setFiles(null);
        setValue("profilePhoto", null)
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
        <div className="flex items-center w-full gap-5">
            <div className=" h-[120px] w-[120px] relative flex flex-col items-center justify-center">
                <input {...getInputProps()} className='hidden' />
                <Image
                    src={files ?? user?.image ?? profileImage}
                    alt="Profile"
                    fill
                    className="rounded-full h-full w-full object-center object-cover"
                />
                <div
                    {...getRootProps({ className: "dropzone" })}
                    className='absolute cursor-pointer hover:bg-[#0000007d] bg-[#0000004D] h-full w-full rounded-full z-30 flex items-center justify-center'>
                    <GoPencil size={30} color="white" />
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[#101928] font-bold satoshi text-xl">Profile photo</h1>
                <p className="text-sm text-[#667185] font-medium satoshi">This image will be displayed on your profile</p>
                <div className="py-3">
                    <Button disabled={!files} onClick={handleClearFiles} className="bg-[#D0D5DD] disabled:cursor-not-allowed w-[5.4rem] hover:bg-gray-100 border border-[#D0D5DD] rounded-lg px-[18px] py-[10px] text-black">
                        Remove
                    </Button>
                </div>
            </div>

        </div>
    );
}
