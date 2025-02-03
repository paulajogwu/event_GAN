import { withServerComponentSession } from "@/server/auth";

export async function useUserServerSession() {
    return (await withServerComponentSession()).user
}