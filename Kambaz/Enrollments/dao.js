import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
    return Database.enrollments;
}

export function findEnrollmentsForUser(userId) {
    const { enrollments } = Database;
    return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
    const { enrollments } = Database;
    return enrollments.filter((enrollment) => enrollment.course === courseId);
}

export function enrollUserInCourse(userId, courseId) {
    // Check if enrollment already exists
    const existingEnrollment = Database.enrollments.find(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
    
    if (existingEnrollment) {
        return existingEnrollment; // Already enrolled
    }
    
    const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
    };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
    const initialLength = Database.enrollments.length;
    Database.enrollments = Database.enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return Database.enrollments.length < initialLength;
}

export function isUserEnrolledInCourse(userId, courseId) {
    return Database.enrollments.some(
        (enrollment) => enrollment.user === userId && enrollment.course === courseId
    );
}

