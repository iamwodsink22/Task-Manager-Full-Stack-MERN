const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please add a task"],
    },
    completed: {
      type: "boolean",
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;
