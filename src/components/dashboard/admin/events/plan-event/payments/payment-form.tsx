"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form
} from "@/components/ui/form";
import FormInputField from "@/components/onboarding/form-field";
// import { useRouter } from "next/navigation";
import { MdLockOutline } from "react-icons/md";
import { IoIosCard } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useState } from "react";
import SuccessModal from "./success-modal";


const formSchema = z.object({
    firstName: z.string().min(1, { message: "This field is required" }),
    lastName: z.string().min(1, { message: "This field is required" }),
    cardNumber: z.string().min(1, { message: "This field is required" }),
    expires: z.string().min(1, { message: "This field is required" }),
    cvv: z.string().min(1, { message: "This field is required" })
});

function PaymentForm() {
    // const router = useRouter()
    const [showModal, setShowModal] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            cardNumber: "",
            expires: "",
            cvv: "",
        },
    });
    const isSubmitting = form.formState.isSubmitting
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // form.reset();
        setShowModal(true)
        // router.push("/")
    }
    const inputStyle = "max-w-full border border-[#D0D5DD] rounded-md h-11 bg-[#FFFFFF] text-[#475367] placeholder:text-[#475367] font-medium p-4"
    return (
        <>
            {showModal && <>
                <div onClick={() => setShowModal(false)} className="fixed z-[9999] inset-0 w-screen h-screen bg-black opacity-40" />
                <SuccessModal setShowModal={() =>setShowModal(false)} />
            </>}
            <section className='relative satoshi flex flex-col w-full  mx-auto'>

                <Form {...form}>
                    <form
                        className="flex flex-col w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className=" mx-auto mt-5 flex  w-full flex-col rounded-xl bg-white p-3 xl:p-[30px] shadow">
                            <div>
                                <h1 className="text-[#000000] text-xl font-bold">Payment method</h1>
                                <div className="flex items-center flex-col md:flex-row gap-4 py-5">
                                    <Button type="button" className={` border w-full border-[#000000] bg-[#FFFFFF] h-12 flex items-center justify-center gap-2 text-sm font-medium`}><IoIosCard size={25} color="black" fill="black" /> Card</Button>
                                    <Button type="button" className="border w-full border-[#000000] bg-[#000000] hover:bg-black/95 rounded-md py-2 px-4 h-12 flex items-center justify-center text-white text-2xl font-extrabold"><FaApple color="white" size={30} /> Pay</Button>
                                </div>
                            </div>
                            <div className=" grid grid-cols-1 sm:grid-cols-2 flex-1 gap-3 w-full  ">
                                <FormInputField
                                    disabled={isSubmitting}
                                    name="firstName"
                                    placeholder="First name"
                                    label="First name"
                                    type="text"
                                    inputStyle={inputStyle}
                                    control={form.control}
                                    error={form.formState.errors.firstName?.message}
                                />

                                <FormInputField
                                    disabled={isSubmitting}
                                    name="lastName"
                                    placeholder="Last name"
                                    label="Last name"
                                    type="text"
                                    inputStyle={inputStyle}
                                    control={form.control}
                                    error={form.formState.errors.lastName?.message}
                                />
                            </div>

                            <div className="relative flex w-full flex-col pt-2">
                                <span className="absolute right-2 top-[3.4rem]">
                                    <MdLockOutline color={"#475367"} size={20} />
                                </span>
                                <FormInputField
                                    disabled={isSubmitting}
                                    name="cardNumber"
                                    placeholder="Card number"
                                    label="Card number"
                                    type="text"
                                    inputMode="numeric"
                                    inputStyle={inputStyle}
                                    control={form.control}
                                    error={form.formState.errors.cardNumber?.message}
                                />
                            </div>

                            <div className="grid grid-cols-2 flex-1 gap-2 w-full  ">
                                <div className="relative mb-2 flex w-full flex-col py-4">
                                    <FormInputField
                                        disabled={isSubmitting}
                                        name="expires"
                                        placeholder="MM/YY"
                                        label="Expires"
                                        type="text"
                                        inputStyle={inputStyle}
                                        control={form.control}
                                        error={form.formState.errors.expires?.message}
                                    />
                                </div>

                                <div className="relative  flex w-full flex-col py-4">
                                    <span className="absolute right-2 top-[3.6rem]">
                                        <MdLockOutline color={"#475367"} size={20} />
                                    </span>
                                    <FormInputField
                                        disabled={isSubmitting}
                                        name="cvv"
                                        placeholder="CVV"
                                        label="CVV"
                                        type="text"
                                        inputMode="numeric"
                                        inputStyle={inputStyle}
                                        control={form.control}
                                        error={form.formState.errors.cvv?.message}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-10">
                            <Card className="bg-white border border-[#EDEDF2] rounded-lg p-6">
                                <CardContent className="flex flex-col justify-between p-0 gap-5">
                                    <CardTitle className="text-[#000000] text-xl font-bold">Remember me</CardTitle>
                                    <div className="flex items-center gap-1">
                                        <Checkbox id="saveInfo" className="rounded-full h-6 w-6 data-[state=checked]:bg-[#000000] data-[state=checked]:text-white" />
                                        <Label
                                            htmlFor="saveInfo"
                                            className="text-sm font-medium text-[#475367] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Save this card information for future use
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <div>
                                <p className="text-[#666666] text-base font-medium py-4">
                                    This is a temporary authorization charge that will appear on your card. It will be finalized once the vendor confirms your booking.
                                </p>
                            </div>

                            <div className="my-4">
                                <Button disabled={isSubmitting} type="submit" className="flex w-full disabled:cursor-not-allowed items-center justify-center gap-x-3 rounded-md bg-[#004AAD] text-base px-4 py-5 font-semibold text-white duration-150 hover:bg-blue-600">
                                    {isSubmitting ? "Please wait...." : " Book now"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </section>
        </>
    )
}

export default PaymentForm
