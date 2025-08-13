// Assignments API Client Example
const API_BASE = "http://localhost:4000/api";

// Get all assignments
async function getAllAssignments() {
    try {
        const response = await fetch(`${API_BASE}/assignments`);
        const assignments = await response.json();
        console.log("All assignments:", assignments);
        return assignments;
    } catch (error) {
        console.error("Error fetching assignments:", error);
    }
}

// Get assignments for a specific course
async function getAssignmentsForCourse(courseId) {
    try {
        const response = await fetch(`${API_BASE}/assignments/course/${courseId}`);
        const assignments = await response.json();
        console.log(`Assignments for course ${courseId}:`, assignments);
        return assignments;
    } catch (error) {
        console.error("Error fetching course assignments:", error);
    }
}

// Get a specific assignment by ID
async function getAssignmentById(assignmentId) {
    try {
        const response = await fetch(`${API_BASE}/assignments/${assignmentId}`);
        if (response.ok) {
            const assignment = await response.json();
            console.log("Assignment:", assignment);
            return assignment;
        } else {
            console.log("Assignment not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching assignment:", error);
    }
}

// Create a new assignment
async function createAssignment(assignmentData) {
    try {
        const response = await fetch(`${API_BASE}/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignmentData),
        });
        const newAssignment = await response.json();
        console.log("Created assignment:", newAssignment);
        return newAssignment;
    } catch (error) {
        console.error("Error creating assignment:", error);
    }
}

// Update an assignment
async function updateAssignment(assignmentId, updateData) {
    try {
        const response = await fetch(`${API_BASE}/assignments/${assignmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });
        if (response.ok) {
            const updatedAssignment = await response.json();
            console.log("Updated assignment:", updatedAssignment);
            return updatedAssignment;
        } else {
            console.log("Assignment not found");
            return null;
        }
    } catch (error) {
        console.error("Error updating assignment:", error);
    }
}

// Delete an assignment
async function deleteAssignment(assignmentId) {
    try {
        const response = await fetch(`${API_BASE}/assignments/${assignmentId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Assignment deleted successfully");
            return true;
        } else {
            console.log("Assignment not found");
            return false;
        }
    } catch (error) {
        console.error("Error deleting assignment:", error);
    }
}

// Example usage
async function runExamples() {
    console.log("=== Assignments API Examples ===");
    
    // Get all assignments
    await getAllAssignments();
    
    // Get assignments for RS101 course
    await getAssignmentsForCourse("RS101");
    
    // Get a specific assignment
    await getAssignmentById("A101");
    
    // Create a new assignment
    const newAssignment = await createAssignment({
        title: "New Assignment",
        course: "RS101",
        points: 100,
        description: "This is a new assignment",
        available: "May 1 at 12:00am",
        due: "May 8 at 11:50pm",
        duedate: "2025-05-01",
        availabledate: "2025-05-08"
    });
    
    if (newAssignment) {
        // Update the assignment
        await updateAssignment(newAssignment._id, {
            title: "Updated Assignment",
            points: 150
        });
        
        // Delete the assignment
        await deleteAssignment(newAssignment._id);
    }
}

// Export functions for use in other modules
export {
    getAllAssignments,
    getAssignmentsForCourse,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    runExamples
};

// Run examples if this file is executed directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.AssignmentsAPI = {
        getAllAssignments,
        getAssignmentsForCourse,
        getAssignmentById,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        runExamples
    };
}
