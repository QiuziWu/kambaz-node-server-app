# Assignments API

这个模块提供了完整的 Assignments（作业）管理功能，包括数据库存储、API 接口和客户端示例。

## 文件结构

```
Kambaz/Assignments/
├── schema.js          # Mongoose schema 定义
├── model.js           # Mongoose model
├── dao.js             # 数据访问对象 (Data Access Object)
├── routes.js          # Express 路由
├── client.js          # 客户端 API 示例
├── README.md          # 说明文档
└── init-assignments.js # 数据库初始化脚本
```

## 功能特性

- ✅ 显示课程中的所有作业
- ✅ 创建新作业
- ✅ 更新现有作业
- ✅ 删除作业
- ✅ 按课程 ID 查询作业
- ✅ 按作业 ID 查询单个作业
- ✅ 数据库持久化存储
- ✅ 完整的错误处理

## API 端点

### 获取所有作业
```
GET /api/assignments
```

### 获取指定课程的作业
```
GET /api/assignments/course/:courseId
```

### 获取单个作业
```
GET /api/assignments/:assignmentId
```

### 创建新作业
```
POST /api/assignments
Content-Type: application/json

{
  "title": "作业标题",
  "course": "课程ID",
  "points": 100,
  "description": "作业描述",
  "available": "可用时间",
  "due": "截止时间",
  "duedate": "截止日期",
  "availabledate": "可用日期"
}
```

### 更新作业
```
PUT /api/assignments/:assignmentId
Content-Type: application/json

{
  "title": "更新的标题",
  "points": 150
}
```

### 删除作业
```
DELETE /api/assignments/:assignmentId
```

## 数据模型

```javascript
{
  _id: String,           // 作业唯一标识符
  title: String,         // 作业标题
  course: String,        // 所属课程ID
  available: String,     // 可用时间描述
  due: String,          // 截止时间描述
  duedate: String,      // 截止日期 (YYYY-MM-DD)
  availabledate: String, // 可用日期 (YYYY-MM-DD)
  points: Number,        // 作业分值
  description: String    // 作业描述
}
```

## 使用方法

### 1. 初始化数据库

运行初始化脚本来填充示例数据：

```bash
node Kambaz/Database/init-assignments.js
```

### 2. 启动服务器

```bash
npm start
```

### 3. 测试 API

使用提供的客户端示例或直接调用 API：

```javascript
// 获取所有作业
fetch('http://localhost:4000/api/assignments')
  .then(response => response.json())
  .then(assignments => console.log(assignments));

// 获取特定课程的作业
fetch('http://localhost:4000/api/assignments/course/RS101')
  .then(response => response.json())
  .then(assignments => console.log(assignments));
```

### 4. 使用客户端库

在浏览器中引入客户端库：

```html
<script type="module">
  import { getAllAssignments, createAssignment } from './Kambaz/Assignments/client.js';
  
  // 获取所有作业
  const assignments = await getAllAssignments();
  
  // 创建新作业
  const newAssignment = await createAssignment({
    title: "新作业",
    course: "RS101",
    points: 100,
    description: "这是一个新作业"
  });
</script>
```

## 示例数据

系统预置了 9 个示例作业，分布在 3 个课程中：

- **RS101**: Propulsion Assignment, Combustion Analysis, Nozzle Design Project
- **RS102**: Aerodynamics Quiz, Flow Analysis, Heating Analysis  
- **RS103**: Structural Design Task, Orbital Calculations, Systems Engineering Exam

## 错误处理

所有 API 端点都包含完整的错误处理：

- 404: 资源未找到
- 500: 服务器内部错误
- 400: 请求参数错误

## 开发说明

- 使用 Mongoose 进行数据库操作
- 支持异步/await 语法
- 包含完整的 CRUD 操作
- 遵循 RESTful API 设计原则
- 支持跨域请求 (CORS)
