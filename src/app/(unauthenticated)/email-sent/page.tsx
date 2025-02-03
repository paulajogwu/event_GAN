import VerifyEmailPage from "@/components/onboarding/verify-email/verify-email-page";
import { getServerAuthSession } from "@/server/auth";

const EmailSent = async () => {
  const session = await getServerAuthSession();

  return <VerifyEmailPage email={session?.user?.email} />;
};
export default EmailSent;
