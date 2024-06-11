import React from 'react';
import { useTaskContext } from '../Context/TaskContext';

// Component for filtering tasks
function Filterbar() {
    // Accessing handleFilterClick function from TaskContext
    const { handleFilterClick } = useTaskContext();

    return (
        // Container for filter buttons
        <div className="filter-container flex justify-center mt-8">
            <button
                className="todo filter-button"
                onClick={() => handleFilterClick('todo')}
            >
                To Do
            </button>
            <button
                className="doing filter-button"
                onClick={() => handleFilterClick('doing')}
            >
                Doing
            </button>
            <button
                className="done filter-button"
                onClick={() => handleFilterClick('done')}
            >
                Done
            </button>
            <button
                className="all filter-button"
                onClick={() => handleFilterClick('all')}
            >
                All
            </button>
        </div>
    );
}

export default Filterbar;
