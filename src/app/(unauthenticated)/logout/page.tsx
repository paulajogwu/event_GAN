import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignOut() {
  const session = await getSession();

  if (session?.user) {
    // Sign out the user
    await signOut({ redirect: false });
    return redirect("/login");
  } else {
    // No user was logged in
    return redirect("/");
  }
}
