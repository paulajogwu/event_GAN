import { seedServiceRecordsDatabase } from "@/mongodb/seed";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { count: string; } }) {

    await seedServiceRecordsDatabase(Number(params?.count ?? 2), "66fac60c2ebe3c19ee85b45f");
    return new Response(JSON.stringify({ message: "Hello World" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}