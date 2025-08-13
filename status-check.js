// 后端状态检查脚本
console.log("=== 后端状态检查 ===\n");

// 检查服务器是否运行
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkServerStatus() {
    try {
        // 检查端口 4000 是否被占用
        const { stdout } = await execAsync('lsof -ti:4000');
        if (stdout.trim()) {
            console.log("✅ 服务器正在运行 (端口 4000)");
            
            // 检查进程详情
            const { stdout: psOutput } = await execAsync('ps aux | grep "node index.js" | grep -v grep');
            console.log("📊 进程信息:");
            console.log(psOutput.trim());
            
            // 测试 API 连接
            try {
                const response = await fetch('http://localhost:4000');
                if (response.ok) {
                    console.log("✅ API 服务器响应正常");
                } else {
                    console.log("❌ API 服务器响应异常");
                }
            } catch (error) {
                console.log("❌ 无法连接到 API 服务器");
            }
        } else {
            console.log("❌ 服务器未运行");
        }
    } catch (error) {
        console.log("❌ 检查服务器状态时出错:", error.message);
    }
}

// 检查数据库连接
async function checkDatabaseStatus() {
    try {
        const response = await fetch('http://localhost:4000/api/courses');
        if (response.ok) {
            const courses = await response.json();
            console.log(`✅ 数据库连接正常 (${courses.length} 门课程)`);
        } else {
            console.log("❌ 数据库连接异常");
        }
    } catch (error) {
        console.log("❌ 无法检查数据库状态");
    }
}

// 检查主要 API 端点
async function checkAPIEndpoints() {
    const endpoints = [
        { name: "用户 API", url: "/api/users" },
        { name: "课程 API", url: "/api/courses" },
        { name: "作业 API", url: "/api/assignments" },
        { name: "注册 API", url: "/api/users/signup" },
        { name: "登录 API", url: "/api/users/signin" }
    ];

    console.log("\n📋 API 端点状态:");
    
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(`http://localhost:4000${endpoint.url}`, {
                method: endpoint.url.includes('signup') || endpoint.url.includes('signin') ? 'POST' : 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: endpoint.url.includes('signup') || endpoint.url.includes('signin') ? 
                    JSON.stringify({ username: 'test', password: 'test' }) : undefined
            });
            
            if (response.status === 200 || response.status === 401) {
                console.log(`✅ ${endpoint.name}: 正常`);
            } else {
                console.log(`❌ ${endpoint.name}: 异常 (${response.status})`);
            }
        } catch (error) {
            console.log(`❌ ${endpoint.name}: 无法访问`);
        }
    }
}

// 运行所有检查
async function runAllChecks() {
    await checkServerStatus();
    await checkDatabaseStatus();
    await checkAPIEndpoints();
    
    console.log("\n=== 检查完成 ===");
    console.log("如果所有检查都通过，前端应该可以正常连接后端！");
    console.log("\n前端连接信息:");
    console.log("- 后端地址: http://localhost:4000");
    console.log("- API 基础路径: http://localhost:4000/api");
    console.log("- CORS 已配置: http://localhost:5173");
}

runAllChecks();
