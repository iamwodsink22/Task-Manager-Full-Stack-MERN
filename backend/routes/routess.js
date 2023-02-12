const express = require("express");
const Task = require("../model/taskmodel");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controller/taskcontrol");
const Router = express.Router();
Router.route("/").post(createTask).get(getTasks);
Router.route("/:id").get(getTask).delete(deleteTask).put(updateTask);
module.exports = Router;
