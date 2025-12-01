import React, { useEffect, useState, createContext } from "react";
import AddTask from "../components/AddTask";

// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext(null);

const localStorageKey = "tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const raw = window.localStorage.getItem(localStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  });

  //saving to localstorage whenever there is a change in tasks
  useEffect(() => {
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    } catch (err) {
      console.log("failed to save tasks", err);
    }
  }, [tasks]);

  //creates new task and adds it to the front of the array 
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  //edits the task with the matching taskId
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  //deletes the task with the matching taskId
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //sets the completed flag and groups and displayes the active tasks first and then the completed ones
  const toggleComplete = (id) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      const incomplettask = updated.filter((t) => !t.completed);
      const complettask = updated.filter((t) => t.completed);

      return [...incomplettask, ...complettask];
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, deleteTask, toggleComplete, setTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
}
