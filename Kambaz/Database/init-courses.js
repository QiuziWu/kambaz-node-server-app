import mongoose from "mongoose";
import courses from "./courses.js";
import courseSchema from "../Courses/schema.js";

const CourseModel = mongoose.model("CourseModel", courseSchema);

const initCourses = async () => {
    try {
        // 清空现有课程数据
        await CourseModel.deleteMany({});
        console.log("Cleared existing courses");
        
        // 插入课程数据
        const result = await CourseModel.insertMany(courses);
        console.log(`Successfully initialized ${result.length} courses`);
        
        // 验证数据
        const count = await CourseModel.countDocuments();
        console.log(`Total courses in database: ${count}`);
        
    } catch (error) {
        console.error("Error initializing courses:", error);
    }
};

export default initCourses;
