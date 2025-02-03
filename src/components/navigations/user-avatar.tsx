"use client";

import { PiSignOutLight } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

function UserAvatar({
  hideLogoutBtn,
  hideAvatarText,
  userName,
  avatar,
  userEmail,
  isVendor = false,
}: {
  hideAvatarText: boolean;
  hideLogoutBtn: boolean;
  userName?: string;
  avatar: string;
  userEmail?: string;
  isVendor?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); //added this to avoid mutiple clicking on thr button when signing out

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });
      router.push("/login");
      setLoading(false);
    } catch (error) {
      toast.error("Sign out failed");
      console.error("Sign out failed", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <Link href={isVendor ? "/dashboard/profile" : ""}>
        <Avatar className="relative flex items-center justify-center border bg-[#004AAD]">
          <AvatarImage src={avatar} alt="user image" fetchPriority="high" />
          <AvatarFallback className="font-bold uppercase text-white">
            {userName?.slice(0, 2)}
          </AvatarFallback>
          <span className="absolute bottom-0 right-1 z-50 h-2.5 w-2.5 rounded-full border border-white bg-green-500" />
        </Avatar>
      </Link>
      <div
        className={`flex flex-col text-xs ${hideAvatarText === true && "hidden md:flex"}`}
      >
        <p className="text-sm text-[]">{userName}</p>
        <p className="text-[#475367]">{userEmail}</p>
      </div>
      <div className={`flex ${hideLogoutBtn === true && "hidden md:flex"}`}>
        <Button
          disabled={loading}
          onClick={handleSignOut}
          className="shadow-none hover:bg-gray-100 active:bg-gray-200"
        >
          <PiSignOutLight size={20} />
        </Button>
      </div>
    </div>
  );
}

export default UserAvatar;
