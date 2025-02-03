import { Prisma, Service } from "@prisma/client"
import { db } from "./db"
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb"
import { OpenAIEmbeddings } from "@langchain/openai"
import { PricingModel } from "@/lib/utils"
import { getDbConnection } from "@/mongodb"
import { env } from "@/env"

export const getServiceById = async (id: string) => {

    return await db.service.findFirst({
        where: {
            id
        }
    })
}

export const getServiceByLookupId = async (id: string) => {

    return await db.service.findFirst({
        where: {
            embeddedLookupId: id,
        }
    })
}

// export const createService = async (payload: Omit<Service, "_id" | "eventIDs">) => {
//     return await db.service.create({
//         data: payload
//     })
// }

export const readServices = async (userId: string) => {

    return await db.service.findMany({
        where: {
            vendor: {
                userId: userId
            }
        }
    })
}

export type CreateServiceType = Partial<Omit<Service, "_id" | "eventIDs">>

export const updateService = async (id: string, payload: CreateServiceType) => {
    return await db.service.update({
        where: {
            id
        },
        data: payload
    })
}

export async function createServiceSummary(service: Prisma.ServiceUncheckedCreateInput): Promise<string> {
    return new Promise((resolve) => {
        const basicInfo = `Name:${service.name}. ID: ${service.embeddedLookupId}.`;

        const tagsInfo = service.tags ? `Tags: ${(service.tags as string[])?.join(", ")}` : "";
        let priceInfo = ""


        switch (service.pricingModel) {
            case PricingModel.PER_PERSON:
                priceInfo = `Price: $${service.price} per guest`;
                break;
            case PricingModel.HOURLY_RATE:
                priceInfo = `Price: $${service.price} per hour`;
                break;
            default:
                priceInfo = `Price: $${service.price}`;
        }

        const summary = `${basicInfo}. ${priceInfo}. ${tagsInfo}.`;

        resolve(summary);
    });
}

export async function createProductSummary(product: Prisma.ProductUncheckedCreateInput): Promise<string> {
    return new Promise((resolve) => {
        const basicInfo = `Name:${product.name}. ID: ${product.embeddedLookupId}.`;

        const descriptionInfo = `Description: ${product.description}`;
        let priceInfo = ""


        switch (product.pricingModel) {
            case PricingModel.PER_PERSON:
                priceInfo = `Price: $${product.price} per guest`;
                break;
            case PricingModel.HOURLY_RATE:
                priceInfo = `Price: $${product.price} per hour`;
                break;
            default:
                priceInfo = `Price: $${product.price}`;
        }

        const onRent = product.onRent ? "Available to rent" : "Not available to rent";
        const consumable = product.isConsumable ? "Consumable" : "Non-consumable";
        const summary = `${basicInfo}. ${priceInfo}. ${descriptionInfo}. ${onRent}. ${consumable}.`;




        resolve(summary);
    });
}

export const createProduct = async (product: Prisma.ProductUncheckedCreateInput) => {
    let client;
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} to connect to database...`);
            client = await getDbConnection();
            console.log('Database connection successful');

            const db = client.db(env.DB_NAME);
            const collection = db.collection(env.COLLECTION_NAME_2);

            // Create the record
            const record = {
                pageContent: await createProductSummary(product),
                metadata: { ...product }
            }

            console.log('Attempting vector search operation...');
            // Set a timeout for the vector search operation
            const timeout = 30000; // 30 seconds
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Vector search operation timed out')), timeout)
            );

            // Perform the vector search operation with a timeout
            await Promise.race([
                MongoDBAtlasVectorSearch.fromDocuments(
                    [record],
                    new OpenAIEmbeddings(),
                    {
                        collection,
                        indexName: env.VECTOR_INDEX,
                        textKey: env.EMBEDDING_TEXT,
                        embeddingKey: env.EMBEDDING_KEY,
                    }
                ),
                timeoutPromise
            ]);
            console.log('Vector search operation completed successfully');

            // Insert the record into the database
            console.log('Inserting record into database...');
            // await collection.insertOne(record);
            console.log('Record inserted successfully');

            return record;
        } catch (err: any) {
            console.error(`Attempt ${attempt} failed:`, err);

            if (err?.message.includes('querySrv ETIMEOUT')) {
                console.error('DNS SRV lookup timed out. This may be due to network issues or firewall restrictions.');
            }

            if (attempt === maxRetries) {
                throw new Error(`Failed to create service after ${maxRetries} attempts: ${err.message}`);
            }
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        } finally {
            if (client) {
                await client.close();
                console.log('Database connection closed');
            }
        }
    }
}
export const createService = async (service: Prisma.ServiceUncheckedCreateInput) => {
    let client;
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} to connect to database...`);
            client = await getDbConnection();
            console.log('Database connection successful');

            const db = client.db(env.DB_NAME);
            const collection = db.collection(env.COLLECTION_NAME);

            // Create the record
            const record = {
                pageContent: await createServiceSummary(service),
                metadata: { ...service }
            }

            console.log('Attempting vector search operation...');
            // Set a timeout for the vector search operation
            const timeout = 30000; // 30 seconds
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Vector search operation timed out')), timeout)
            );

            // Perform the vector search operation with a timeout
            await Promise.race([
                MongoDBAtlasVectorSearch.fromDocuments(
                    [record],
                    new OpenAIEmbeddings(),
                    {
                        collection,
                        indexName: env.VECTOR_INDEX,
                        textKey: env.EMBEDDING_TEXT,
                        embeddingKey: env.EMBEDDING_KEY,
                    }
                ),
                timeoutPromise
            ]);
            console.log('Vector search operation completed successfully');

            // Insert the record into the database
            console.log('Inserting record into database...');
            // await collection.insertOne(record);
            console.log('Record inserted successfully');

            return record;
        } catch (err: any) {
            console.error(`Attempt ${attempt} failed:`, err);

            if (err?.message.includes('querySrv ETIMEOUT')) {
                console.error('DNS SRV lookup timed out. This may be due to network issues or firewall restrictions.');
            }

            if (attempt === maxRetries) {
                throw new Error(`Failed to create service after ${maxRetries} attempts: ${err.message}`);
            }
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        } finally {
            if (client) {
                await client.close();
                console.log('Database connection closed');
            }
        }
    }
}