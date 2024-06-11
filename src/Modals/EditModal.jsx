import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// For editing tasks
const EditTaskModal = ({ isOpen, closeModal, taskId, initialTitle, initialDescription, handleEdit }) => {
    // States for managing input fields
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    // Setting initial values on component mount or when initialTitle/initialDescription changes
    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

    // Handles form submission
    const handleSubmit = () => {
        // Calling handleEdit function with updated values
        handleEdit(taskId, title, description);
        // Closing modal
        closeModal();
    };

    // Rendering null if modal is not open
    if (!isOpen) {
        return null;
    }

    return (
        // Modal container
        <div className="TaskModal block">
            <div className="TaskModal-container">
                <div className="TaskModal-header">
                    <h2 className="TaskModal-title">Edit Task</h2>
                    <button className="TaskModal-close" onClick={closeModal}>×</button>
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
                    <button className="TaskModal-button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

// PropTypes for EditTaskModal props
EditTaskModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    taskId: PropTypes.string,
    initialTitle: PropTypes.string,
    initialDescription: PropTypes.string,
    handleEdit: PropTypes.func.isRequired
};

export default EditTaskModal;

