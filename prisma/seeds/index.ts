import { db } from "@/server/db";
import inquirer from "inquirer";
import type { QuestionCollection } from "inquirer";
// import seedServiceProviders from "./serviceProviders";


if (process.env.NODE_ENV === "production") {
    console.log("❌ You cannot run this command on production, try staging");
    process.exit(0);
}

const nuke = async () => {
    console.log("🚀 Nuking database records");
    return db.$transaction(async (db) => {
        await db.session.deleteMany();


    });
};

const seed = async () => {
    // const inquiry = await inquirer.prompt({
    //     type: "confirm",
    //     name: "answer",
    //     message: "Are you sure you want to NUKE 🚀 and re-seed the database?",
    // } as QuestionCollection);

    const answer = true;
    // const answer = inquiry.answer as boolean;

    if (answer) {
        // await nuke();
        return db.$transaction(async (tx) => {
            // await seedServiceProviders();

        });
    } else {
        throw new Error("Seeding aborted");
    }

}



await seed()
    .then(async () => {
        console.log("✅ Database seeding completed");

        await db.$disconnect();
    })
    .catch(async (error: Error) => {
        console.log(`❌ ${error.message}`);
        await db.$disconnect();
    });
