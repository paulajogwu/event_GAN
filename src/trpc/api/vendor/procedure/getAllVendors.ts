import { getAllVendors } from "@/server/vendor";
import { publicProcedure } from "@/trpc/api/trpc";
import { z } from "zod";


export const getVendorsProcedure = publicProcedure
.input(z.string().describe("All Vendor"))
.query(async () => {
    const vendors = await getAllVendors()
    return {
        success: true,
        vendors
    };
});
