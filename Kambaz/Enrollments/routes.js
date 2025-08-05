import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const findAllEnrollments = (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    };

    const findEnrollmentsForUser = (req, res) => {
        const userId = req.params.userId;
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };

    const findEnrollmentsForCourse = (req, res) => {
        const courseId = req.params.courseId;
        const enrollments = dao.findEnrollmentsForCourse(courseId);
        res.json(enrollments);
    };

    const enrollUserInCourse = (req, res) => {
        const { user, course } = req.body;
        if (!user || !course) {
            return res.status(400).json({ message: "User ID and Course ID are required" });
        }
        
        const enrollment = dao.enrollUserInCourse(user, course);
        res.json(enrollment);
    };

    const unenrollUserFromCourse = (req, res) => {
        const { userId, courseId } = req.params;
        const success = dao.unenrollUserFromCourse(userId, courseId);
        if (success) {
            res.sendStatus(200);
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    };

    const isUserEnrolledInCourse = (req, res) => {
        const { userId, courseId } = req.params;
        const enrolled = dao.isUserEnrolledInCourse(userId, courseId);
        res.json({ enrolled });
    };

    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
    app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
    app.post("/api/enrollments", enrollUserInCourse);
    app.delete("/api/enrollments/user/:userId/course/:courseId", unenrollUserFromCourse);
    app.get("/api/enrollments/user/:userId/course/:courseId/check", isUserEnrolledInCourse);
} 