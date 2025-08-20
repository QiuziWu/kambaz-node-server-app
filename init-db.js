import mongoose from "mongoose";
import "dotenv/config";
import initUsers from "./Kambaz/Database/init-users.js";
import initCourses from "./Kambaz/Database/init-courses.js";
import initAssignments from "./Kambaz/Database/init-assignments.js";
import initEnrollments from "./Kambaz/Database/init-enrollments.js";
import initModules from "./Kambaz/Database/init-modules.js";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz-su2-2025";

const initDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to MongoDB successfully");
        
        console.log("\nInitializing users...");
        await initUsers();
        
        console.log("\nInitializing courses...");
        await initCourses();
        
        console.log("\nInitializing assignments...");
        await initAssignments();
        
        console.log("\nInitializing enrollments...");
        await initEnrollments();
        
        console.log("\nInitializing modules...");
        await initModules();
        
        console.log("\nDatabase initialization completed successfully!");
        
    } catch (error) {
        console.error("Error initializing database:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
};

initDatabase();
