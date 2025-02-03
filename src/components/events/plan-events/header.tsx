import { MobileNav } from '@/components/navigations/sidebar'
import UserAvatar from '@/components/navigations/user-avatar'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
import Logo from "~/public/img/avatar1.png";
import userImage from "~/public/img/vendor/icons/users.png"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiaAngleDownSolid } from "react-icons/lia";

function PlanEventHeader() {
    const { data } = useSession()
    return (
        <header className='flex items-center w-full bg-[#FFFFFF] sticky top-0 z-[9] max-h-[119px] right-0'>
            <div className="hidden lg:flex items-center justify-between gap-2 px-6 py-5 lg:py-6  ">
                <Link href="/dashboard">
                    <Image
                        width={176}
                        height={32}
                        src={Logo}
                        alt="Logo"
                        priority
                    />
                </Link>
            </div>
            <div className=" flex items-center justify-between px-3 py-5 shadow-2 md:px-6 2xl:px-11 gap-x-3 w-full">
                <MobileNav />
                <div className='flex items-center w-full justify-end md:max-w-full gap-x-2 '>
                    <div className='relative flex items-center flex-grow md:max-w-sm '>
                        <Input
                            type='text'
                            placeholder='Search here....'
                            className="rounded-lg w-full border-gray-300 text-sm py-5 pl-8 border bg-white text-[#667085] placeholder:text-[#667085]"
                        />
                        <span className="absolute top-3 left-2">
                            <CiSearch size={20} color={"#667085"} fontSize={400} />
                        </span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-1 cursor-default md:cursor-pointer">
                                <div className="relative h-11 w-11">
                                    <Image src={data?.user.image ?? userImage} alt="" fill className="h-full w-full object-cover rounded-full object-center" />
                                </div>
                                <LiaAngleDownSolid size={20} className="hidden sm:flex" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-white z-[9999] inset-20 flex flex-col gap-2 py-2">
                            <Link href={"/profile"} className="p-2 hover:bg-gray-100 active:bg-gray-200 text-black satoshi font-medium">Profile</Link>
                            <Link href={"/dashbord/settings"} className="p-2 hover:bg-gray-100  active:bg-gray-200 text-black satoshi font-medium">Settings</Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default PlanEventHeader
