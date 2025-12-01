import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTask from "../components/AddTask";

function Home() {

  //gets tasks and task actions from taskContext
  const { tasks, addTask, editTask, deleteTask, toggleComplete } =
    useContext(TaskContext);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");

  //call addtask in context
  const handleAddTask = (text) => addTask(text);

  //sets the editingId for the task with the taskId and sets the editing text
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  //clears the edit state
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };
  
  //calls the edittask from the context
  const saveEdit = () => {
    if (!editingText.trim()) return;
    editTask(editingId, editingText);
    cancelEdit();
  };

  //filters the tasks based on the filter to be displayed for the particular filter
  const visibleTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div className="app-container">
      <AddTask addTask={handleAddTask} />
      <div className="filter-cols colorBtn">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="todo-grid">
        {visibleTasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          <ul>
            {visibleTasks.map((task) => (
              <li key={task.id} className="task-row">
                <div className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={() => toggleComplete(task.id)}
                    aria-label={`Toggle ${task.text}`}
                  />
                </div>

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
                      style={{ flex: 1 }}
                    />
                    <button onClick={saveEdit}>save</button>
                    <button onClick={cancelEdit}>cancel</button>
                  </div>
                ) : (
                  <>
                    <div className="text-col">
                      <span className={task.completed ? "completed" : ""}>
                        {task.text}
                      </span>
                    </div>

                    <div className="actions-col">
                      <button onClick={() => startEdit(task)}>Edit</button>
                      <button onClick={() => deleteTask(task.id)}>
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
