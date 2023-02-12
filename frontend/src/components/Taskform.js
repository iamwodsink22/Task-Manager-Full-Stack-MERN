import React from "react";

const Taskform = ({ name, handleOnhange, HandleSubmit, isEdit, editaTask }) => {
  return (
    <form className="task-form" onSubmit={isEdit ? editaTask : HandleSubmit}>
      <input
        type="text"
        placeholder="Enter your task"
        name="name"
        value={name}
        onChange={handleOnhange}
      ></input>
      <button>{isEdit ? "Edit" : "Add"}</button>
    </form>
  );
};

export default Taskform;
