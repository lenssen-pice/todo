import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import "./AddTask.css";

function AddTask() {
  const [query, setQuery] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      addTask(query);
      setQuery("");
    }
  };
  const handleClick = () => {
    if (query.trim()) {
      addTask(query);
    }
    setQuery("");
  };

  return (
    <div className="add-task">
      <div className="add-task-row">
        <input
          type="text"
          placeholder="Task"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        ></input>
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
}

export default AddTask;
