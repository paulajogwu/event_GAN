import { DataAPIClient } from "@datastax/astra-db-ts";
import { Service } from "@prisma/client";


const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

if (!ASTRA_DB_APPLICATION_TOKEN || !ASTRA_DB_API_ENDPOINT) {
    throw new Error("Missing Astra credentials");
}


// Initialize the client
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN, {
    httpOptions: {
        client: "fetch",
    },
});
const astraDb = client.db(ASTRA_DB_API_ENDPOINT);
const collection = astraDb.collection("service");



export const getServiceProviders = async (prompt: string) => {

    const results = (await (collection.find({}, {
        sort: {
            $vectorize: prompt
        },
        limit: 1,
        projection: { $vector: 0 }
    })).toArray()) as unknown as Service[];

    return results;

}


export default astraDb;
