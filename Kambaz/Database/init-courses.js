import mongoose from "mongoose";
import courses from "./courses.js";
import "dotenv/config";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz-su2-2025";

async function initCourses() {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connected to MongoDB");

        // Import the Course model
        const { default: CourseModel } = await import("../Courses/model.js");

        // Clear existing courses
        await CourseModel.deleteMany({});
        console.log("Cleared existing courses");

        // Insert new courses
        const result = await CourseModel.insertMany(courses);
        console.log(`Inserted ${result.length} courses`);

        console.log("Courses initialization completed successfully");
    } catch (error) {
        console.error("Error initializing courses:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

initCourses();
