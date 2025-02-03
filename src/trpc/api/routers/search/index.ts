import { createTRPCRouter } from "../../trpc";
import { searchVendorsProcedure } from "./procedures/searchProcedure";

const searchRouter = createTRPCRouter({
    searchVendors: searchVendorsProcedure
})

export default searchRouter;