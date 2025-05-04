import Task from "../models/Task.js";
import express from "express";
import asyncHandler from "../utils/asyncHandler.js";

const taskRouter = express.Router()

taskRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const sort = req.query.sort;
    const count = req.query.count || 0;

    const sortOption = { createdAt: sort === "oldest" ? "asc" : "desc" };
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
  })
);

taskRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) res.send(task);
    else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

taskRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
  })
);

taskRouter.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      Object.keys(req.body).forEach((key) => {
        task[key] = req.body[key];
      });
      await task.save();
      res.send(task);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

taskRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);

    if (task) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "Cannot find given id." });
    }
  })
);

export default taskRouter;