import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
    const lookupIds = [
        '3f8c1234567812345678901234567890',
        '2c7l1234567812345678901234567890',
        '6c1f1234567812345678901234567890',
        '4a9d1234567812345678901234567890',
        '9f4i1234567812345678901234567890',
        '8e3h1234567812345678901234567890'
    ];

    try {
        const services = await db.service.findFirst({
            where: {
                embeddedLookupId: lookupIds[0]
            }
        });

        // const services = await db.service.findRaw({
        //     filter: { "embeddedLookupId": lookupIds[0] }
        // });

        return NextResponse.json({ services }, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
