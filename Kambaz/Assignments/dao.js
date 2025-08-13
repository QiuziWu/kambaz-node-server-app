import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
    return model.find();
}

export function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
}

export function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
}

export function createAssignment(assignment) {
    const newAssignment = {
        ...assignment,
        _id: uuidv4(),
        points: assignment.points || 100,
        duedate: assignment.duedate || "",
        availabledate: assignment.availabledate || "",
        due: assignment.due || "",
        available: assignment.available || "",
    };
    return model.create(newAssignment);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.findByIdAndUpdate(assignmentId, assignmentUpdates, { new: true });
}

export function deleteAssignment(assignmentId) {
    return model.findByIdAndDelete(assignmentId);
} 