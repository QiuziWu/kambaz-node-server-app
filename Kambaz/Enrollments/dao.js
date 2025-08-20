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

export async function enrollUserInCourse(user, course) {
    try {
        // Check if enrollment already exists
        const existingEnrollment = await model.findOne({ user, course });
        if (existingEnrollment) {
            // If enrollment exists, just return it
            return existingEnrollment;
        }
        
        // Create new enrollment if it doesn't exist
        const newEnrollment = { user, course, _id: `${user}-${course}` };
        return await model.create(newEnrollment);
    } catch (error) {
        console.error("Error in enrollUserInCourse:", error);
        throw error;
    }
}

export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

export async function isUserEnrolledInCourse(userId, courseId) {
    const enrollment = await model.findOne({ user: userId, course: courseId });
    return !!enrollment;
}

