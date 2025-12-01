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
    setTasks((prev) => [newTask, ...prev]);
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

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const [filter, setFilter] = useState("all");

  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div>
      <AddTask onAddTask={handleAddTask} />
      <div className="filter-cols colorBtn">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>completed</button>
      </div>
      <div className="todo-grid">
        {visibleTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul className="text-col">
            {visibleTasks.map((task) => (
              <li key={task.id} className="task-row">
                <input
                  type="checkbox"
                  className="checkbox-col"
                  checked={task.completed}
                  onChange={() => {
                    toggleComplete(task.id);
                  }}
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
                    <div className="actions-col">
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button onClick={() => handleDelete(task.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
