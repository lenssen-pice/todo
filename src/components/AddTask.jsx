import React, { useState } from "react";
import "./AddTask.css"

function AddTask({onAddTask}){
    const [query, setQuery] = useState("")
    const handleKeyPress = (e) => {
        if(e.key === "Enter" && query.trim()){
            onAddTask(query)
            setQuery("");
        }
    }
    const handleClick = () => {
        if(query.trim()){
            onAddTask(query)
        }
        setQuery("")
    }

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