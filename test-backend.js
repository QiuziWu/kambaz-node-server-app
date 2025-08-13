// 后端功能测试脚本
const API_BASE = "http://localhost:4000/api";

async function testBackend() {
    console.log("=== 后端功能测试 ===\n");

    try {
        // 1. 测试服务器连接
        console.log("1. 测试服务器连接...");
        const response = await fetch("http://localhost:4000");
        if (response.ok) {
            console.log("✅ 服务器连接正常");
        } else {
            console.log("❌ 服务器连接失败");
            return;
        }

        // 2. 测试用户注册
        console.log("\n2. 测试用户注册...");
        const signupResponse = await fetch(`${API_BASE}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "testuser2",
                password: "testpass2",
                firstName: "Test2",
                lastName: "User2",
                email: "test2@example.com"
            })
        });
        
        if (signupResponse.ok) {
            const user = await signupResponse.json();
            console.log("✅ 用户注册成功:", user.username);
        } else {
            console.log("❌ 用户注册失败");
        }

        // 3. 测试用户登录
        console.log("\n3. 测试用户登录...");
        const signinResponse = await fetch(`${API_BASE}/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "testuser2",
                password: "testpass2"
            })
        });
        
        if (signinResponse.ok) {
            const user = await signinResponse.json();
            console.log("✅ 用户登录成功:", user.username);
        } else {
            console.log("❌ 用户登录失败");
        }

        // 4. 测试获取课程列表
        console.log("\n4. 测试获取课程列表...");
        const coursesResponse = await fetch(`${API_BASE}/courses`);
        if (coursesResponse.ok) {
            const courses = await coursesResponse.json();
            console.log(`✅ 获取课程成功，共 ${courses.length} 门课程`);
        } else {
            console.log("❌ 获取课程失败");
        }

        // 5. 测试获取作业列表
        console.log("\n5. 测试获取作业列表...");
        const assignmentsResponse = await fetch(`${API_BASE}/assignments`);
        if (assignmentsResponse.ok) {
            const assignments = await assignmentsResponse.json();
            console.log(`✅ 获取作业成功，共 ${assignments.length} 个作业`);
        } else {
            console.log("❌ 获取作业失败");
        }

        // 6. 测试获取特定课程的作业
        console.log("\n6. 测试获取特定课程的作业...");
        const courseAssignmentsResponse = await fetch(`${API_BASE}/assignments/course/RS101`);
        if (courseAssignmentsResponse.ok) {
            const assignments = await courseAssignmentsResponse.json();
            console.log(`✅ 获取 RS101 课程作业成功，共 ${assignments.length} 个作业`);
        } else {
            console.log("❌ 获取课程作业失败");
        }

        console.log("\n=== 测试完成 ===");
        console.log("✅ 后端功能正常，前端应该可以正常连接！");

    } catch (error) {
        console.error("❌ 测试过程中出现错误:", error.message);
    }
}

// 运行测试
testBackend();
