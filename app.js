import express from "express";
import mongoose from "mongoose";
import Task from "./models/Task.js";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

const app = express();
app.use(cors());
app.use(express.json());

function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).send({ message: error.message });
      } else if (error.name === "CastError") {
        res.status(404).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  };
}

app.get(
  "/tasks",
  asyncHandler(async (req, res) => {
    /** 쿼리 파라미터
     * - sort : 'oldest'인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
     * - count : 태스크 개수수
     */
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const sortOption = { createdAt: sort === "oldest" ? "asc" : "desc" };
    const tasks = await Task.find().sort(sortOption).limit(count);

    // const compareFn =
    //   sort === "oldest"
    //     ? (a, b) => a.createdAt - b.createdAt
    //     : (a, b) => b.createdAt - a.createdAt;

    // let newTasks = mockTasks.sort(compareFn);

    // if (count) {
    //   newTasks = mockTasks.slice(0, count);
    // }

    res.send(tasks);
  })
);

app.get(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) res.send(task);
    else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    // const newTask = req.body
    // const ids = mockTasks.map(task => task.id)
    // newTask.id = Math.max(...ids) + 1
    // newTask.isComplete = false
    // newTask.createdAt = new Date()
    // newTask.updatedAt = new Date()

    // mockTasks.push(newTask)
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
  })
);

app.patch(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    // const id = Number(req.params.id);
    // const task = mockTasks.find((task) => task.id === id);
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      Object.keys(req.body).forEach((key) => {
        task[key] = req.body[key];
      });
      // task.updatedAt = new Date();
      await task.save();
      res.send(task);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.delete(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findByIdAndDelete(id);
    if (task) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
