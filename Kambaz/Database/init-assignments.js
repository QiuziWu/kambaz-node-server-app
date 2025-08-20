import mongoose from "mongoose";
import assignments from "./assignments.js";
import assignmentSchema from "../Assignments/schema.js";

const AssignmentModel = mongoose.model("AssignmentModel", assignmentSchema);

const initAssignments = async () => {
    try {
        // 清空现有作业数据
        await AssignmentModel.deleteMany({});
        console.log("Cleared existing assignments");
        
        // 插入作业数据
        const result = await AssignmentModel.insertMany(assignments);
        console.log(`Successfully initialized ${result.length} assignments`);
        
        // 验证数据
        const count = await AssignmentModel.countDocuments();
        console.log(`Total assignments in database: ${count}`);
        
    } catch (error) {
        console.error("Error initializing assignments:", error);
    }
};

export default initAssignments;
