import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Creating TaskContext
const TaskContext = createContext();

// Setting up API URL
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";

// Hook to use TaskContext
export const useTaskContext = () => {
    return useContext(TaskContext);
};

// Provides task-related functionality
export const TaskProvider = ({ children }) => {
    // Defining state variables for tasks and their counts
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [doneTasks, setDoneTasks] = useState(0);
    const [doingTasks, setDoingTasks] = useState(0);
    const [todoTasks, setTodoTasks] = useState(0);
    const [currentFilter, setCurrentFilter] = useState('all');

    // Fetch data when the component mounts or totalTasks changes
    useEffect(() => {
        fetchData();
    }, [totalTasks]);

    // Function to fetch tasks from the API
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tasks`);
            setTasks(response.data);
            applyCurrentFilter(response.data);
            setTotalTasks(response.data.length);
            const doneCount = response.data.filter(task => task.status === "done").length;
            setDoneTasks(doneCount);
            const doingCount = response.data.filter(task => task.status === "doing").length;
            setDoingTasks(doingCount);
            setTodoTasks(response.data.length - doneCount - doingCount);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    // Applying current filter to the tasks
    const applyCurrentFilter = (tasks) => {
        if (currentFilter === 'all') {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.status === currentFilter));
        }
    };

    // Filter click and set the current filter
    const handleFilterClick = (status) => {
        setCurrentFilter(status);
        applyCurrentFilter(tasks);
    };

    // Add a new task
    const addTask = async (title, description, status) => {
        try {
            const response = await axios.post(`${apiUrl}/tasks`, { title, description, status });
            const updatedTasks = [...tasks, response.data];
            setTasks(updatedTasks);
            applyCurrentFilter(updatedTasks);
            setTotalTasks(prev => prev + 1);
            if (status === "done") setDoneTasks(prev => prev + 1);
            else if (status === "doing") setDoingTasks(prev => prev + 1);
            else setTodoTasks(prev => prev + 1);
        } catch (err) {
            console.error("Error adding task:", err);
        }
    };

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${apiUrl}/tasks/${taskId}`);
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
            applyCurrentFilter(updatedTasks);
            setTotalTasks(prev => prev - 1);
            const doneCount = updatedTasks.filter(task => task.status === "done").length;
            setDoneTasks(doneCount);
            const doingCount = updatedTasks.filter(task => task.status === "doing").length;
            setDoingTasks(doingCount);
            setTodoTasks(updatedTasks.length - doneCount - doingCount);
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // Update the status of a task
    const updateTaskStatus = async (taskId, status) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, { status });
            const updatedTasks = tasks.map(task => task._id === taskId ? { ...task, status } : task);
            setTasks(updatedTasks);
            applyCurrentFilter(updatedTasks);
            if (status === "done") setDoneTasks(prev => prev + 1);
            else if (status === "doing") setDoingTasks(prev => prev + 1);
            else setTodoTasks(prev => prev + 1);
        } catch (err) {
            console.error("Error updating task status:", err);
        }
    };

    // Edit the details of a task
    const editTask = async (taskId, title, description) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, { title, description });
            const updatedTasks = tasks.map(task => task._id === taskId ? { ...task, title, description } : task);
            setTasks(updatedTasks);
            applyCurrentFilter(updatedTasks);
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    // Providing task-related values and functions to children components
    return (
        <TaskContext.Provider
            value={{
                filteredTasks,
                totalTasks,
                doneTasks,
                doingTasks,
                todoTasks,
                handleFilterClick,
                addTask,
                deleteTask,
                updateTaskStatus,
                editTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
