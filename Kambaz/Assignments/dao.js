import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}

export function findAssignmentById(assignmentId) {
    const { assignments } = Database;
    return assignments.find((assignment) => assignment._id === assignmentId);
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
    Database.assignments.push(newAssignment);
    return newAssignment;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    if (assignment) {
        Object.assign(assignment, assignmentUpdates);
        return assignment;
    }
    return null;
}

export function deleteAssignment(assignmentId) {
    const initialLength = Database.assignments.length;
    Database.assignments = Database.assignments.filter(assignment => assignment._id !== assignmentId);
    return Database.assignments.length < initialLength;
} 