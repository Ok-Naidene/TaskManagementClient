import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../Modals/DeleteModal';
import EditTaskModal from '../Modals/EditModal';

// Component to display list of tasks
function TaskList() {
    // Accessing context and necessary functions
    const { filteredTasks, updateTaskStatus, deleteTask, editTask } = useTaskContext();
    // State for managing delete modal visibility
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // State for managing edit modal visibility
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // State for storing selected task
    const [selectedTask, setSelectedTask] = useState(null);

    // Open delete modal and set selected task
    const openDeleteModal = (taskId) => {
        setSelectedTask(taskId);
        setIsDeleteModalOpen(true);
    };

    // Close delete modal and reset selected task
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedTask(null);
    };

    // Open edit modal and set selected task
    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsEditModalOpen(true);
    };

    // Close edit modal and reset selected task
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTask(null);
    };

    // Handling task click and update task status
    const handleTaskClick = (taskId) => {
        const task = filteredTasks.find(task => task._id === taskId);
        if (task) {
            const newStatus = task.status === 'todo' ? 'doing' : 'done';
            updateTaskStatus(taskId, newStatus);
        }
    };

    return (
        // Container for task list
        <div className="TaskList-container">
            {filteredTasks.map(task => (
                <div key={task._id} className={`TaskList ${task.status === 'todo' ? 'task-todo' : task.status === 'doing' ? 'task-doing' : 'task-done'}`} onClick={() => handleTaskClick(task._id)}>
                    <div className="TaskList-content">
                        <h3 className="TaskList-title">{task.title}</h3>
                        <p className="TaskList-description">{task.description}</p>
                        <button
                            className="edit-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(task);
                            }}>
                            <FontAwesomeIcon icon={faEdit} style={{ color: "#7a7a7a" }} />
                        </button>
                        <button
                            className="delete-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(task._id);
                            }}
                        >
                            <FontAwesomeIcon icon={faTrash} style={{ color: "#7a7a7a" }} />
                        </button>
                    </div>
                </div>
            ))}
            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    closeModal={closeDeleteModal}
                    taskId={selectedTask}
                    handleDelete={deleteTask} // Ensure handleDelete is passed correctly
                />
            )}
            {isEditModalOpen && (
                <EditTaskModal
                    isOpen={isEditModalOpen}
                    closeModal={closeEditModal}
                    // Handle possible null value for selectedTask
                    taskId={selectedTask ? selectedTask._id : null} 
                    // Handle possible null value for selectedTask
                    initialTitle={selectedTask ? selectedTask.title : ""} 
                    // Handle possible null value for selectedTask
                    initialDescription={selectedTask ? selectedTask.description : ""} 
                    handleEdit={(taskId, title, description) => {
                        editTask(taskId, title, description);
                    }}
                />
            )}
        </div>
    );
}

export default TaskList; 