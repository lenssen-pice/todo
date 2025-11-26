import { useEffect, useState } from "react";
import AddTask from "../components/AddTask";
import Edittask from "../components/Edittask";

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

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState(null);

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text: editingText } : t))
    );
    cancelEdit();
  };

  return (
    <div>
      <AddTask onAddTask={handleAddTask} />
      <div className="todo-grid">
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-row">
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
              {editingId === task.id ? (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <input
                    autoFocus
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <button onClick={saveEdit}>save</button>
                  <button onClick={cancelEdit}>cancel</button>
                </div>
              ) : (
                <>
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                  <button onClick={() => startEdit(task)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
