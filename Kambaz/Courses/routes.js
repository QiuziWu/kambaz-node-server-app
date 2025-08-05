import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
    const findAllCourses = (req, res) => {
        const courses = dao.findAllCourses();
        res.send(courses);
    }

    const createCourse = (req, res) => {
        const newCourse = dao.createCourse(req.body);
        res.json(newCourse);
    }

    const deleteCourse = (req, res) => {
        const courseId = req.params.courseId;
        const success = dao.deleteCourse(courseId);
        if (success) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "Course not found" });
        }
    }
    const updateCourse = (req, res) => {
        const { courseId } = req.params;
        const courseUpdates = req.body;
        const status = dao.updateCourse(courseId, courseUpdates);
        res.send(status);
    }
    const findModulesForCourse = (req, res) => {
        const courseId = req.params.courseId;
        const modules = dao.findModulesForCourse(courseId);
        res.json(modules);
    }
    const createModuleForCourse = (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = dao.createModule(module);
        res.json(newModule);
    }

    const deleteModule = (req, res) => {
        const moduleId = req.params.moduleId;
        const success = dao.deleteModule(moduleId);
        if (success) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "Module not found" });
        }
    }

    const updateModule = (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const updatedModule = dao.updateModule(moduleId, moduleUpdates);
        if (updatedModule) {
            res.json(updatedModule);
        } else {
            res.status(404).json({ message: "Module not found" });
        }
    }

    app.get("/api/courses", findAllCourses);
    app.post("/api/courses", createCourse);
    app.delete("/api/courses/:courseId", deleteCourse);
    app.put("/api/courses/:courseId", updateCourse);
    app.get("/api/courses/:courseId/modules", findModulesForCourse);
    app.post("/api/courses/:courseId/modules", createModuleForCourse);
    app.delete("/api/modules/:moduleId", deleteModule);
    app.put("/api/modules/:moduleId", updateModule);
}

