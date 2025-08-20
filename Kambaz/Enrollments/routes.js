import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const findAllEnrollments = async (req, res) => {
        try {
            const enrollments = await dao.findAllEnrollments();
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const findEnrollmentsForUser = async (req, res) => {
        try {
            const userId = req.params.userId;
            const enrollments = await dao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const findEnrollmentsForCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const enrollments = await dao.findEnrollmentsForCourse(courseId);
            res.json(enrollments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const enrollUserInCourse = async (req, res) => {
        try {
            const { user, course } = req.body;
            if (!user || !course) {
                return res.status(400).json({ message: "User ID and Course ID are required" });
            }
            
            const enrollment = await dao.enrollUserInCourse(user, course);
            res.json(enrollment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const unenrollUserFromCourse = async (req, res) => {
        try {
            const { userId, courseId } = req.params;
            const result = await dao.unenrollUserFromCourse(userId, courseId);
            if (result.deletedCount > 0) {
                res.sendStatus(200);
            } else {
                res.status(404).json({ message: "Enrollment not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    // Admin utility: reset a user's enrollments to a fixed list
    const resetUserEnrollments = async (req, res) => {
        try {
            const { userId } = req.params;
            const { courses } = req.body; // array of courseIds
            if (!Array.isArray(courses)) {
                return res.status(400).json({ message: "courses must be an array" });
            }
            // remove all existing
            await model.deleteMany({ user: userId });
            // add back
            for (const cid of courses) {
                await dao.enrollUserInCourse(userId, cid);
            }
            res.json({ success: true, userId, courses });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const isUserEnrolledInCourse = async (req, res) => {
        try {
            const { userId, courseId } = req.params;
            const enrolled = await dao.isUserEnrolledInCourse(userId, courseId);
            res.json({ enrolled });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
    app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
    app.post("/api/enrollments", enrollUserInCourse);
    app.delete("/api/enrollments/user/:userId/course/:courseId", unenrollUserFromCourse);
    app.get("/api/enrollments/user/:userId/course/:courseId/check", isUserEnrolledInCourse);
    app.post("/api/admin/enrollments/reset/:userId", resetUserEnrollments);
} 