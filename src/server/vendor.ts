import { db } from "./db";

export const getVendorByID = async (vendorId: string) => {
    try {
        return await db.vendor.findUnique({ where: { id: vendorId }, include: { services: true, user: true } });
    } catch (err) {
        console.log(err)
        return null;
    }
}

export const getVendorProfileByUserID = async (userId: string) => {
    try {
        return await db.vendor.findUnique({ where: { userId }, include: { services: true, user: true } });
    } catch (err) {
        console.log(err)
        return null;
    }
}
export const getAllVendors = async () => {

    return await db.user.findMany({
        where: {
            role: "VENDOR"
        }
    })
}
