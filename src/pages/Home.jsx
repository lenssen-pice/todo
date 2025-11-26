import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";

function Home() {
  const localStorageKey = "tasks";
  const [tasks, setTasks] = useState(() => {
    const raw = window.localStorage.getItem(localStorageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  });

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
      <AddTask onAddTask={handleAddTask} />
      <div className="todo-grid">
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              ></input>
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
