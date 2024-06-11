import React, { useState } from 'react';
import { useTaskContext } from '../Context/TaskContext';

// Adding new tasks
function AddTaskModal({ isOpen, closeModal }) {
    // Accessing addTask function from TaskContext
    const { addTask } = useTaskContext();
    // States for managing input fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handles form submission
    const handleSubmit = () => {
        // Adding task with provided title, description, and status 'todo'
        addTask(title, description, 'todo');
        // Clearing input fields and closing modal
        setTitle('');
        setDescription('');
        closeModal();
    };

    return (
        // Modal container
        <div className={`TaskModal ${isOpen ? 'block' : 'hidden'}`}>
            <div className="TaskModal-container">
                <div className="TaskModal-header">
                    <h3 className="TaskModal-title">Add New Task</h3>
                    <button className="TaskModal-close" onClick={closeModal}>X</button>
                </div>
                <div className="TaskModal-body">
                    <div className="TaskModal-inputContainer">
                        <label className="TaskModal-label" htmlFor="title">Title</label>
                        <input className="TaskModal-input" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="TaskModal-inputContainer">
                        <label className="TaskModal-label" htmlFor="description">Description</label>
                        <input className="TaskModal-input" id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button className="TaskModal-button" onClick={handleSubmit}>Add Task</button>
                </div>
            </div>
        </div>
    );
}

export default AddTaskModal;
