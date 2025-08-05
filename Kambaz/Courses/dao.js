import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllCourses() {
    return Database.courses;
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
        department: course.department || "D123",
        credits: course.credits || 3,
        image: course.image || "/images/reactjs.jpg"
    };
    Database.courses.push(newCourse);
    return newCourse;
}

export function deleteCourse(courseId) {
    const initialLength = Database.courses.length;
    Database.courses = Database.courses.filter(course => course._id !== courseId);
    return Database.courses.length < initialLength;
}

export function updateCourse(courseId, courseUpdates) {
    const { courses } = Database;
    const course = courses.find((course) => course._id === courseId);
    Object.assign(course, courseUpdates);
    return course;
}

