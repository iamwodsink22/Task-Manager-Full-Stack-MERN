import React, { useEffect } from "react";
import axios from "axios";
import Taskform from "./Taskform";
import { toast } from "react-toastify";
import Task from "./Task";
import { useState } from "react";
import { URL } from "../App";
import loader from "../assets/loader.gif";

const ListTasks = () => {
  const [formdata, SetformData] = useState({
    name: "",
    completed: false,
    isEmpty: false,
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setloading] = useState(true);
  const [completedtask, setCompletedtask] = useState([]);
  const [isediting, setEditing] = useState(false);
  const [taskid, setTaskid] = useState("");

  const { name } = formdata;
  const handleOnhange = (e) => {
    const { name, value } = e.target;
    SetformData({ ...formdata, [name]: value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    if (name === "") {
      SetformData({ isEmpty: true });
      toast.error("Input field cannot be empty");
    } else {
      SetformData({ isEmpty: false });
    }
    try {
      console.log(`${URL}/api/tasks`);
      await axios.post(`${URL}/api/tasks`, formdata);
      SetformData({ ...formdata, name: "." });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    setloading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      console.log(data);
      setTasks(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (task) => {
    try {
      SetformData({ name: task.name, isCompleted: false });
      setEditing(true);
      setTaskid(task._id);
    } catch (error) {
      console.log(error);
    }
  };
  const editaTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      SetformData({ isEmpty: true });
    }
    try {
      await axios.put(`${URL}/api/tasks/${taskid}`, formdata);
      setEditing(false);
      SetformData({ ...formdata, name: "" });
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const setComplete = async (task) => {
    console.log("compled");
    const newform = {
      name: task.name,
      completed: true,
      isEmpty: false,
    };
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newform);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedtask(cTask);
  }, [tasks]);
  return (
    <div>
      <h1>Manage Your Tasks</h1>
      <Taskform
        name={name}
        handleOnhange={handleOnhange}
        HandleSubmit={HandleSubmit}
        isEdit={isediting}
        editaTask={editaTask}
      />
      {formdata.isEmpty ? (
        <p style={{ color: "red" }}>The input field cannot be empty</p>
      ) : null}
      {formdata.name === "." && (
        <p style={{ color: "green" }}>Task Added Successfully</p>
      )}

      <div className="--flex-between --pb"></div>
      <p>
        <b>Total Tasks:</b>
        {tasks.length}
      </p>
      <p>
        <b>Completed Tasks:</b>
        {completedtask.length}
      </p>
      <hr />
      {loading && (
        <div className="--flex-center">
          <img
            style={{ width: "5vw", height: "5vh" }}
            src={loader}
            alt="loading"
          ></img>{" "}
        </div>
      )}
      {!loading && tasks.length === 0 ? (
        <p>No Tasks added, Please add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                index={index}
                task={task}
                deleteTask={deleteTask}
                EditTask={editTask}
                setComplete={setComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default ListTasks;
