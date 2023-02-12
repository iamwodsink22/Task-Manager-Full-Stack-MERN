import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const Task = (props) => {
  return (
    <div className={props.task.completed ? "task completed" : "task"}>
      <p>
        <b>{props.index + 1}.</b>
        {props.task.name}
      </p>
      <div className="task-icons">
        <FaCheckDouble
          color="lightGreen"
          onClick={() => {
            props.setComplete(props.task);
          }}
        />
        <FaEdit
          color="blue"
          onClick={() => {
            props.EditTask(props.task);
          }}
        />
        <FaRegTrashAlt
          color="red"
          onClick={() => {
            props.deleteTask(props.task._id);
          }}
        />
      </div>
    </div>
  );
};

export default Task;
