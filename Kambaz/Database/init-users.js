import mongoose from "mongoose";
import users from "./users.js";
import userSchema from "../Users/schema.js";

const UserModel = mongoose.model("UserModel", userSchema);

const initUsers = async () => {
    try {
        // 清空现有用户数据
        await UserModel.deleteMany({});
        
        // 插入用户数据
        const result = await UserModel.insertMany(users);
        console.log(`Successfully initialized ${result.length} users`);
        
        // 验证数据
        const count = await UserModel.countDocuments();
        console.log(`Total users in database: ${count}`);
        
        // 测试查找用户
        const testUser = await UserModel.findOne({ username: "iron_man" });
        if (testUser) {
            console.log("Test user found:", testUser.username);
        } else {
            console.log("Test user not found");
        }
        
    } catch (error) {
        console.error("Error initializing users:", error);
    }
};

export default initUsers;
