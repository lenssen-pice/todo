import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";

function Home() {
  const [tasks, setTasks] = useState([]);
  const localStorageKey = "tasks";

  useEffect(() => {
    try {
      window.localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    } catch (err) {
      console.log("failed to save tasks", err);
    }
  }, [tasks]);

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
    };
    setTasks((prev) => [...prev, newTask]);
  };
  
  return (
    <div>
      <div className="todo-grid">
        <AddTask onAddTask={handleAddTask} />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
