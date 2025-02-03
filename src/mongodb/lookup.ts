
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StateGraph } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";
import { tool } from "@langchain/core/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import { z } from "zod";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { finalEventOutput, eventCostingSchema } from "./types";
import { env } from "@/env";



const parser = StructuredOutputParser.fromZodSchema(finalEventOutput);

const MAX_RECURSION = 15;

export async function callAgent(client: MongoClient, query: string,) {
    // Define the MongoDB database and collection
    const db = client.db(env.DB_NAME);
    const collection = db.collection(env.COLLECTION_NAME);

    // ... (We'll add the rest of the code here)

    const GraphState = Annotation.Root({
        messages: Annotation<BaseMessage[]>({
            reducer: (x, y) => x.concat(y),
        }),
    });

    const model = new ChatOpenAI({
        modelName: "gpt-4o-2024-08-06",
        temperature: 0.7,
        openAIApiKey: process.env.OPENAI_API_KEY
    });

    const serviceLookupTool = tool(
        async ({ query, n = 10 }) => {

            const dbConfig = {
                collection: collection,
                indexName: env.VECTOR_INDEX,
                textKey: env.EMBEDDING_TEXT,
                embeddingKey: env.EMBEDDING_KEY,
            };

            const vectorStore = new MongoDBAtlasVectorSearch(
                new OpenAIEmbeddings(),
                dbConfig
            );

            const result = await vectorStore.similaritySearchWithScore(query, n);
            return JSON.stringify(result);
        },
        {
            name: "service_lookup",
            description: "Gathers service details from the Event data",
            schema: z.object({
                query: z.string().describe("The search query"),
                n: z.number().optional().default(10).describe("Number of results to return"),
            }),
        }
    );
    // const eventGeneratorTool = tool(
    //     async (query) => {
    //         const response = await model.invoke(`Extract the event information, get services needed to achieve the event. Event ${JSON.stringify(query)}`)
    //         return response.content
    //     },
    //     {
    //         name: "event_planner",
    //         description: "Extracts the event information, Generates detailed plan including services needed to achieve the event.",
    //         schema: craftEventSchema,
    //     }
    // );

    const jsonFormatterTool = tool(
        async (query) => {
            return query
        },
        {
            name: "json_formatter",
            description: "Converts data to structured json format",
            schema: finalEventOutput,
        }
    );

    const accurateBudgetTool = tool(
        async (query) => {
            return query.services.reduce((total, service) => total + service.price, 0) || 0
        },
        {
            name: "event_costing",
            description: "Gives an accurate cost for an event, for services with per_person pricing model, use the highest number of guests to calculate the price, according to services in the database",
            schema: eventCostingSchema,
        }
    );

    const tools = [serviceLookupTool, accurateBudgetTool, jsonFormatterTool]; // , jsonFormatterTool

    const toolNode = new ToolNode<typeof GraphState.State>(tools);

    model.withStructuredOutput(finalEventOutput)

    const modelWithTools = model.bindTools(tools);

    let recursionCount = 0;

    function shouldContinue(state: typeof GraphState.State) {
        recursionCount++;
        console.log(`Recursion count: ${recursionCount}`);

        const messages = state.messages;
        const lastMessage = messages[messages.length - 1] as AIMessage;

        if (recursionCount >= MAX_RECURSION) {
            console.log("Max recursion reached, ending.");
            return "__end__";
        }

        // If the LLM makes a tool call, then we route to the "tools" node
        if (lastMessage.tool_calls?.length) {
            return "tools";
        }
        // Otherwise, we stop (reply to the user)
        return "__end__";
    }


    async function callModel(state: typeof GraphState.State) {
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                `You are a helpful Event Planning AI assistant, collaborating with other assistants. Use the provided tools to progress towards answering the question. If you are unable to fully answer, that's OK, another assistant with different tools will help where you left off. Execute what you can to make progress. If you or any of the other assistants have the final answer or deliverable, prefix your response with FINAL ANSWER so the team knows to stop.. You have access to the following tools: {tool_names}.\n{system_message}\nCurrent time: {time}. Get the services needed for the each event. Optimize your response by batching services. Ensure the budget is accurate by giving the total of the price of each service, Expecting an array with 3 event plans. return data in JSON format`,
            ],
            new MessagesPlaceholder("messages"),
        ]);

        const formattedPrompt = await prompt.formatMessages({
            system_message: "You are helpful Event Planning Agent.",
            time: new Date().toISOString(),
            tool_names: tools.map((tool) => tool.name).join(", "),
            messages: state.messages,
            // parseInstruction: parser.getFormatInstructions()
        });

        const result = await modelWithTools.invoke(formattedPrompt);

        return { messages: [result] };

        // return parser.parse(result.content as string);

    }

    // Define a new graph
    const workflow = new StateGraph(GraphState)
        .addNode("agent", callModel)
        .addNode("tools", toolNode)
        .addEdge("__start__", "agent")
        .addConditionalEdges("agent", shouldContinue)
        .addEdge("tools", "agent");

    // Initialize the MongoDB memory to persist state between graph runs
    // const checkpointer = new MongoDBSaver({ client, dbName });

    // This compiles it into a LangChain Runnable.
    // Note that we're passing the memory when compiling the graph
    const app = workflow.compile();

    // Use the Runnable
    const finalState = await app.invoke(
        {
            messages: [new HumanMessage(query)],
        },
        { recursionLimit: MAX_RECURSION }
    );

    return parser.parse(finalState.messages[finalState.messages.length - 1].content);
}









