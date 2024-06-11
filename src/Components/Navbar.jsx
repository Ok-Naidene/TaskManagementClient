import React, { useState } from 'react';
import AddTaskModal from '../Modals/AddTaskModal';

// Component for displaying navigation bar
function Navbar() {
    // State for controlling modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        // Navigation bar
        <nav className="nav">
            <div className="nav-content">
                <div>
                    <span className="Title">Task Manager</span>
                </div>
                <div>
                    <button className="add-button" onClick={openModal}>
                        Add
                    </button>
                </div>
            </div>
            <AddTaskModal isOpen={isModalOpen} closeModal={closeModal} />
        </nav>
    );
}

export default Navbar;
