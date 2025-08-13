import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    const findAllAssignments = async (req, res) => {
        try {
            const assignments = await dao.findAllAssignments();
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const findAssignmentsForCourse = async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const assignments = await dao.findAssignmentsForCourse(courseId);
            res.json(assignments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const findAssignmentById = async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const assignment = await dao.findAssignmentById(assignmentId);
            if (assignment) {
                res.json(assignment);
            } else {
                res.status(404).json({ message: "Assignment not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const createAssignment = async (req, res) => {
        try {
            const newAssignment = await dao.createAssignment(req.body);
            res.json(newAssignment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const updateAssignment = async (req, res) => {
        try {
            const { assignmentId } = req.params;
            const assignmentUpdates = req.body;
            const updatedAssignment = await dao.updateAssignment(assignmentId, assignmentUpdates);
            if (updatedAssignment) {
                res.json(updatedAssignment);
            } else {
                res.status(404).json({ message: "Assignment not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    const deleteAssignment = async (req, res) => {
        try {
            const assignmentId = req.params.assignmentId;
            const deletedAssignment = await dao.deleteAssignment(assignmentId);
            if (deletedAssignment) {
                res.sendStatus(200);
            } else {
                res.status(404).json({ message: "Assignment not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    app.get("/api/assignments", findAllAssignments);
    app.get("/api/assignments/course/:courseId", findAssignmentsForCourse);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.post("/api/assignments", createAssignment);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
} 