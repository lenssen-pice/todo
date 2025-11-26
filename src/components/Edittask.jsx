import React from "react";
import "./AddTask.css"

function EditTask({taskId , onEdittask}){
    return (
      <div className="edit-task">
          <button onClick={() => onEdittask(taskId)}>Edit</button>
        </div>
    );
}

export default EditTask;