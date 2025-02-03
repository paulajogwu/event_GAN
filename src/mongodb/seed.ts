import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { z } from "zod";
import { Prisma, Service } from "@prisma/client";
import { createServiceSummary } from "@/server/service";
import { getDbConnection } from ".";
import { env } from "@/env";
import { ServiceUncheckedCreateInputSchema } from "~/prisma/generated/zod";
import { ObjectId } from "mongodb";

const llm = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.7,
    openAIApiKey: process.env.OPENAI_API_KEY
});

const parser = StructuredOutputParser.fromZodSchema(z.array(ServiceUncheckedCreateInputSchema));


async function generateSyntheticData(numberOfRecords: number, vendorId: string): Promise<Prisma.ServiceUncheckedCreateInput[]> {
    const prompt = `You are a helpful assistant that generates services in a event planning app. Generate ${numberOfRecords} fictional service records. Each record should include the following fields: name, price, pricingModel, tags, embeddedLookupId (this is a 24 digit UUID string), SKIP other optional fields asides the ones mentioned here. Ensure variety in the data and realistic values, pricingModel should be either be "PER_PERSON", "HOURLY_RATE" or "FIXED_PRICE" only.
Don't generate id, set vendorId to "${vendorId}"
  ${parser.getFormatInstructions()}`;

    console.log("Generating synthetic data...");

    const response = await llm.invoke(prompt);
    return parser.parse(response.content as string);
}



export async function seedServiceRecordsDatabase(count: number, vendorId: string = "66f49f1b9bc6f8d066ef9274", nuke: boolean = false): Promise<void> {
    try {
        const client = await getDbConnection();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db(env.DB_NAME);
        const collection = db.collection(env.COLLECTION_NAME);

        if (nuke) {
            await collection.deleteMany({});
        }

        const syntheticData = await generateSyntheticData(count, vendorId);

        const recordsWithSummaries = await Promise.all(
            syntheticData.map(async (record) => ({
                pageContent: await createServiceSummary({ ...record }),
                metadata: { ...record, vendorId: new ObjectId(record.vendorId) },
            }))
        );

        for (const record of recordsWithSummaries) {
            await MongoDBAtlasVectorSearch.fromDocuments(
                [record],
                new OpenAIEmbeddings(),
                {
                    collection,
                    indexName: env.VECTOR_INDEX,
                    textKey: env.EMBEDDING_TEXT,
                    embeddingKey: env.EMBEDDING_KEY,
                }
            );

            console.log("Successfully processed & saved record:", record.metadata.name);
        }

        console.log("Database seeding completed");

    } catch (error) {
        console.error("Error seeding database:", error);
    }
}

