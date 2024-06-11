import React from 'react';
import { TaskProvider } from './Context/TaskContext';
import Navbar from './Components/Navbar';
import Filterbar from './Components/Filterbar';
import TaskList from './Components/TaskList';

function App() {
    return (
        <TaskProvider>
            <div>
                <Navbar />
                <Filterbar />
                <TaskList />
            </div>
        </TaskProvider>
    );
}

export default App;