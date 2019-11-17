import mongoose from "mongoose";
import Todo from "../../models/todo";

export const todoOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First todo",
  completed: false,
};

export const todoTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second todo",
  completed: true,
};

export const todoThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third todo",
  completed: true,
};

export const setupDatabase = async () => {
  await Todo.deleteMany();
  await new Todo(todoOne).save();
  await new Todo(todoTwo).save();
  await new Todo(todoThree).save();
};
