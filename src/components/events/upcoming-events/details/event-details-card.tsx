import { Card, CardContent } from '@/components/ui/card';
import React, { useState } from 'react'
import Image from 'next/image';
import copyIcon from "~/public/img/vendor/icons/copy.svg"
import { FcCheckmark } from "react-icons/fc";
import Link from 'next/link';
import { toast } from 'sonner';

interface EventItemsProps {
    eventItems: {
        icon: React.JSX.Element;
        name: string;
        val: string;
    }[]
}

function EventDetailsCard({ eventItems }: EventItemsProps) {
    const [copiedItemId, setCopiedItemId] = useState<number | null>(null);

    const handleCopy = async (text: string, id: number) => {
        setCopiedItemId(null);
        await navigator.clipboard.writeText(text);
        setCopiedItemId(id);
        toast("copied to clipboard", {
            className: "bg-[#F7FBFF]",
            position: "bottom-center",
        })
        setTimeout(() => {
            setCopiedItemId(null);
        }, 2000);
    };
    return (
        <>
            <Card className='bg-[#FFFFFF] border border-[#EDEDF2] rounded-lg'>
                {eventItems.map((item, id) => (
                    <CardContent key={id} className='satoshi flex items-center justify-between border-b border-[#F7F9FC] py-3.5 px-6'>
                        <div className='flex items-center gap-4'>
                            <span className='text-[#98A2B3] h-5 w-5 text-xl'>{item.icon}</span>
                            <div>
                                <h1 className='text-[#667185] text-xs font-medium pb-1'>{item.name}</h1>
                                {item.name === "URL" ?
                                    <Link href={`/referrals`} className='text-[#004AAD] font-medium text-sm'>{item.val}</Link>
                                    : <p className='text-[#101928] font-medium text-sm'>{item.val}</p>}
                            </div>
                        </div>
                        <div className={`relative h-5 cursor-pointer w-5 ${item.name === "Date & Time" && 'hidden'}`}>
                            {copiedItemId === id ? (
                                <FcCheckmark color='rgb(22,101,52)' />
                            ) : (
                                <Image
                                    onClick={() => handleCopy(item.val, id)}
                                    src={copyIcon}
                                    fill
                                    alt='copy Icon'
                                    className='object-cover h-full w-full object-center'
                                />
                            )}
                        </div>
                    </CardContent>
                ))}
            </Card>
        </>
    )
}

export default EventDetailsCard
