import mongoose, { Types, Document } from "mongoose";

export interface ITask extends Document {
  content: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxLength: 30,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
