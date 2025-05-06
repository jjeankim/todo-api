import Task, { ITask } from "../models/Task.js";
import express, { Request, Response, NextFunction } from "express";
import asyncHandler from "../utils/asyncHandler";

const taskRouter = express.Router();

taskRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const sort = req.query.sort;
    const count:number = parseInt(req.query.count as string) || 0;

    const sortOption: Record<string, 1 | -1 | "asc" | "desc"> = {
      createdAt: sort === "oldest" ? "asc" : "desc",
    };
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
  })
);

taskRouter.get(
  "/:id",
  asyncHandler(async (req:Request, res:Response) => {
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
  asyncHandler(async (req: Request, res: Response) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
  })
);

taskRouter.patch(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      const updates:Partial<ITask> = req.body;
      Object.keys(req.body).forEach((key) => {
        (task as any)[key] = req.body[key];
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
  asyncHandler(async (req: Request, res: Response) => {
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
