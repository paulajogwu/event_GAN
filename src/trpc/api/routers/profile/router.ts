import { createTRPCRouter } from "../../trpc";
import { updateEmailProcedure } from "./procedure/edit-email";
import { editPasswordProcedure } from "./procedure/edit-password";
import { vendorImageProcedure, vendorOnboardingProcedure } from "./procedure/onboarding/vendor";
import { skipProcedure } from "./procedure/skipProcedure";
import { updateProfileProcedure } from "./procedure/update-profile";


export const profileRouter = createTRPCRouter({
  updateProfile: updateProfileProcedure,
  updatePassword: editPasswordProcedure,
  updateEmail: updateEmailProcedure,
  onboardingSkip: skipProcedure,
  vendorOnboarding: vendorOnboardingProcedure,
  vendorImageUpload: vendorImageProcedure

});
