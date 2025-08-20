import mongoose from "mongoose";
import modules from "./modules.js";
import moduleSchema from "../Modules/schema.js";

const ModuleModel = mongoose.model("ModuleModel", moduleSchema);

const initModules = async () => {
    try {
        // 清空现有模块数据
        await ModuleModel.deleteMany({});
        console.log("Cleared existing modules");
        
        // 插入模块数据
        const result = await ModuleModel.insertMany(modules);
        console.log(`Successfully initialized ${result.length} modules`);
        
        // 验证数据
        const count = await ModuleModel.countDocuments();
        console.log(`Total modules in database: ${count}`);
        
    } catch (error) {
        console.error("Error initializing modules:", error);
    }
};

export default initModules;
