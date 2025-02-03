import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import paySuccessImage from "~/public/img/vendor/icons/pay-success.svg"

interface SuccessModalProps {
    setShowModal: (bol:boolean) => void;
}

function SuccessModal({setShowModal}:SuccessModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]  px-4">
            <div className="flex flex-col items-center bg-[#FFFFFF] rounded-md shadow-lg max-w-sm p-4">
                <div className="relative h-[170px] w-[170px]">
                    <Image src={paySuccessImage} alt="success image" fill className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex flex-col w-full">
                    <h1 className='text-[#4B4C4C] text-2xl  lg:text-3xl font-bold text-center py-2'>Payment successful</h1>
                    <p className="text-base text-[#666666] text-center font-medium py-2">This is a temporary authorization charge that will appear on your card. It will be finalized</p>

                    <div className="grid grid-cols-2 w-full gap-x-5 pt-7">
                        <Link href={`/user/payment`}>
                            <Button onClick={() => setShowModal(false)} className="w-full flex items-center justify-center text-sm md:text-base border border-[#D0D5DD] text-[#344054] rounded-lg py-2 px-4">Start Another plan</Button>
                        </Link>

                        <Link href={`/user/payment`}>
                            <Button onClick={() => setShowModal(false)}  className="w-full flex items-center justify-center text-sm md:text-base border bg-[#7CB518] hover:bg-lime-600 text-white rounded-lg py-2 px-4">Go to event</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SuccessModal
