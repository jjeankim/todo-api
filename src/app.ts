import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import taskRouter from "./routes/taskRouter";

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("Connected to DB"));

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://todo-list-jjeankim.netlify.app"],
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/tasks',taskRouter

)
app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
