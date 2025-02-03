import { createTRPCRouter } from "../trpc";
import { getVendorsProcedure } from "./procedure/getAllVendors";
import { getVendorProcedure, getVendorProfileProcedure, getVendorProfileByUserIDProcedure, updateVendorImagesProcedure } from "./procedure/getVendorById";
import { rateVendorProcedure } from "./procedure/rateVendor";
import { reportVendor } from "./procedure/reportVendor";
import { submitVendorOnboardingProcedure } from "./procedure/signupVendor"

export const vendorRouter = createTRPCRouter({
    getVendorByID: getVendorProcedure,
    getAllVendor: getVendorsProcedure,
    submitVendorOnboarding: submitVendorOnboardingProcedure,
    getVendorProfile: getVendorProfileProcedure,
    getVendorProfileByUserID: getVendorProfileByUserIDProcedure,
    updateVendorImages: updateVendorImagesProcedure,
    reportVendor: reportVendor,
    rateVendor: rateVendorProcedure

})
