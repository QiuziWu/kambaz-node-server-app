import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import session from "express-session";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import cors from "cors";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import SessionController from "./Lab5/SessionController.js";
import "dotenv/config";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz-su2-2025"
mongoose.connect(CONNECTION_STRING);


const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    }));
// configure session
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.SERVER_URL,
    };
}
app.use(session(sessionOptions));
// configure body parser
app.use(express.json());

// configure routes
UserRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5(app);
Hello(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithArrays(app);
SessionController(app);
ModuleRoutes(app);

app.listen(process.env.PORT || 4000)