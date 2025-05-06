import mongoose from "mongoose";
import data from "./mock";
import Task from "../models/Task";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL as string);


// await Task.deleteMany({});
// await Task.insertMany(data);

// mongoose.connection.close();
async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error("DATABASE_URL is not defined in .env");
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    await Task.deleteMany({});
    console.log("All existing tasks deleted");

    await Task.insertMany(data);
    console.log("Seed data inserted");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
}

main();