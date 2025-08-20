import * as modulesDao from "../Modules/dao.js";
import * as dao from "./dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.send(courses);
    }

    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        const currentUser = req.session["currentUser"];
        if (currentUser) {
            await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
        }
        res.json(course);
    }

    const deleteCourse = async (req, res) => {
        const courseId = req.params.courseId;
        const success = await dao.deleteCourse(courseId);
        if (success) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    
    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = await dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    }
    
    const findModulesForCourse = async (req, res) => {
        const courseId = req.params.courseId;
        const modules = await modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    }
    
    const createModuleForCourse = async (req, res) => {
        try {
            const { courseId } = req.params;
            const module = {
                ...req.body,
                course: courseId,
            };
            const newModule = await modulesDao.createModule(module);
            res.json(newModule);
        } catch (error) {
            console.error("Error creating module:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    const deleteModule = async (req, res) => {
        try {
            const moduleId = req.params.moduleId;
            const status = await modulesDao.deleteModule(moduleId);
            res.json({ success: true, deletedCount: status.deletedCount });
        } catch (error) {
            console.error("Error deleting module:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    const updateModule = async (req, res) => {
        try {
            const { moduleId } = req.params;
            const moduleUpdates = req.body;
            const status = await modulesDao.updateModule(moduleId, moduleUpdates);
            const updatedModule = await modulesDao.findModuleById(moduleId);
            res.json(updatedModule);
        } catch (error) {
            console.error("Error updating module:", error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    }

    app.get("/api/courses/:cid/users", findUsersForCourse);
    app.get("/api/courses", findAllCourses);
    app.post("/api/courses", createCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.put("/api/courses/:courseId", updateCourse);
    app.get("/api/courses/:courseId/modules", findModulesForCourse);
    app.post("/api/courses/:courseId/modules", createModuleForCourse);
    app.delete("/api/modules/:moduleId", deleteModule);
    app.put("/api/modules/:moduleId", updateModule);
}

