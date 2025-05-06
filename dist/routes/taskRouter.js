"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_js_1 = __importDefault(require("../models/Task.js"));
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const taskRouter = express_1.default.Router();
taskRouter.get("/", (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sort = req.query.sort;
    const count = parseInt(req.query.count) || 0;
    const sortOption = {
        createdAt: sort === "oldest" ? "asc" : "desc",
    };
    const tasks = yield Task_js_1.default.find().sort(sortOption).limit(count);
    res.send(tasks);
})));
taskRouter.get("/:id", (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield Task_js_1.default.findById(id);
    if (task)
        res.send(task);
    else {
        res.status(404).send({ message: "Cannot find given id." });
    }
})));
taskRouter.post("/", (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = yield Task_js_1.default.create(req.body);
    res.status(201).send(newTask);
})));
taskRouter.patch("/:id", (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield Task_js_1.default.findById(id);
    if (task) {
        const updates = req.body;
        Object.keys(req.body).forEach((key) => {
            task[key] = req.body[key];
        });
        yield task.save();
        res.send(task);
    }
    else {
        res.status(404).send({ message: "Cannot find given id." });
    }
})));
taskRouter.delete("/:id", (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const task = yield Task_js_1.default.findByIdAndDelete(id);
    if (task) {
        res.sendStatus(204);
    }
    else {
        res.status(404).send({ message: "Cannot find given id." });
    }
})));
exports.default = taskRouter;
