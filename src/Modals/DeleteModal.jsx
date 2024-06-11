import React from 'react';
import PropTypes from 'prop-types';

// For confirming task deletion
const DeleteModal = ({ isOpen, closeModal, taskId, handleDelete }) => {
    // Rendering null if modal is not open
    if (!isOpen) {
        return null;
    }

    return (
        // Modal container
        <div className="TaskModal block">
            <div className="TaskModal-container">
                <div className="TaskModal-header">
                    <h2 className="TaskModal-title">Confirm Delete</h2>
                    <button className="TaskModal-close" onClick={closeModal}>×</button>
                </div>
                <div className="TaskModal-body">
                    <p>Are you sure you want to delete this task?</p>
                    <div>
                        <button className="TaskModal-button" onClick={() => {
                            handleDelete(taskId); // Call handleDelete function with taskId
                            closeModal(); // Close the modal
                        }}>Delete</button>
                        <button className="TaskModal-button" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// PropTypes for DeleteModal props
DeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    taskId: PropTypes.string,
    handleDelete: PropTypes.func.isRequired
};

export default DeleteModal;
