import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";

export function findAllCourses() {
    return model.find();
}

export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}

export function findModulesForCourse(courseId) {
    const { modules } = Database;
    return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
    const newModule = {
        ...module,
        _id: uuidv4(),
        lessons: module.lessons || []
    };
    Database.modules.push(newModule);
    return newModule;
}

export function deleteModule(moduleId) {
    const initialLength = Database.modules.length;
    Database.modules = Database.modules.filter(module => module._id !== moduleId);
    return Database.modules.length < initialLength;
}

export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    if (module) {
        Object.assign(module, moduleUpdates);
        return module;
    }
    return null;
}

export function createCourse(course) {
    const newCourse = {
        ...course,
        _id: uuidv4(),
    };
    return model.create(newCourse);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

