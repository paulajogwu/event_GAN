import { createTRPCRouter } from "../../trpc";
import { forgotPasswordProcedure } from "./procedure/forgot-password";
import { newPasswordProcedure } from "./procedure/new-password";
import { resendEmailProcedure } from "./procedure/resend-email";
import { signupProcedure } from "./procedure/signup";
// import { updateProfileProcedure } from "./procedure/update-profile";
import { verifyEmailProcedure } from "./procedure/verify-email";

export const authRouter = createTRPCRouter({
  signup: signupProcedure,
  newPassword: newPasswordProcedure,
  resendEmail: resendEmailProcedure,
  verifyEmail: verifyEmailProcedure,
  forgotPassword: forgotPasswordProcedure,
  //   updateProfile: updateProfileProcedure,
});
