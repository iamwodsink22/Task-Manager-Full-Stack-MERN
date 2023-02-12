const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./model/taskmodel");
const taskRoute = require("./routes/routess");

const app = express();
app.get("/", (req, res) => {
  res.send("<h1>Hello World<h1>");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/tasks", taskRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("connected mongodb");

    app.listen(PORT, () => {
      console.log("Listening on port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
