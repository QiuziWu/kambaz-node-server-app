import mongoose from "mongoose";
import assignments from "./assignments.js";
import "dotenv/config";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz-su2-2025";

async function initAssignments() {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to MongoDB");

        // Import the Assignment model
        const { default: AssignmentModel } = await import("../Assignments/model.js");

        // Clear existing assignments
        await AssignmentModel.deleteMany({});
        console.log("Cleared existing assignments");

        // Insert new assignments
        const result = await AssignmentModel.insertMany(assignments);
        console.log(`Inserted ${result.length} assignments`);

        console.log("Assignments initialization completed successfully");
    } catch (error) {
        console.error("Error initializing assignments:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

initAssignments();
