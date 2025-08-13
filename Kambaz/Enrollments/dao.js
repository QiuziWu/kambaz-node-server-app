import model from "./model.js";

export async function findAllEnrollments() {
    return model.find();
}

export async function findEnrollmentsForUser(userId) {
    return model.find({ user: userId });
}

export async function findEnrollmentsForCourse(courseId) {
    return model.find({ course: courseId });
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
    const newEnrollment = { user, course, _id: `${user}-${course}` };
    return model.create(newEnrollment);
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export async function isUserEnrolledInCourse(userId, courseId) {
    const enrollment = await model.findOne({ user: userId, course: courseId });
    return !!enrollment;
}

