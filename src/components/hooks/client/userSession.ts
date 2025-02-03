import { useSession } from "next-auth/react";

export function useUserSession() {
    return useSession()?.data?.user
}
