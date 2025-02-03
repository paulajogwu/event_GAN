import { MongoClient } from "mongodb";
import { callAgent } from "./lookup";


let dbConnection: MongoClient | null = null;

export async function getDbConnection() {
    if (!dbConnection) {
        dbConnection = await MongoClient.connect("mongodb+srv://eventgizmo:J8ruCjd6kbWT9nOD@cluster0.dcdej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    }
    return dbConnection;
}

// Don't forget to add a function to close the connection when your app shuts down:
export async function closeDbConnection() {
    if (dbConnection) {
        await dbConnection.close();
        dbConnection = null;
    }
}



export async function getServiceProviders(message: string) {
    const client = await getDbConnection();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    try {
        const startTime = performance.now();
        const response = await callAgent(client, message);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Function execution time: ${executionTime / 1000} seconds`);
        console.log(response)
        return response
        // ... rest of the server setup
    } catch (error) {
        console.error("Error:", error);

    }
}