import mongoose from "mongoose";
import enrollments from "./enrollments.js";
import enrollmentSchema from "../Enrollments/schema.js";

const EnrollmentModel = mongoose.model("EnrollmentModel", enrollmentSchema);

const initEnrollments = async () => {
    try {
        // 清空现有注册数据
        await EnrollmentModel.deleteMany({});
        console.log("Cleared existing enrollments");
        
        // 插入注册数据
        const result = await EnrollmentModel.insertMany(enrollments);
        console.log(`Successfully initialized ${result.length} enrollments`);
        
        // 验证数据
        const count = await EnrollmentModel.countDocuments();
        console.log(`Total enrollments in database: ${count}`);
        
    } catch (error) {
        console.error("Error initializing enrollments:", error);
    }
};

export default initEnrollments;
