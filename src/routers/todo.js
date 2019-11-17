import { Router } from "express";
import Todo from "../models/todo";

const router = new Router();

router.post("/todos.json", async (req, res) => {
  const todo = new Todo(req.body);

  try {
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/todos.json", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/todos/:id.json", async (req, res) => {
  const _id = req.params.id;

  try {
    const todo = await Todo.findById(_id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/todos/:id.json", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdateds = ["description", "completed"];
  const isValidOperation = updates.every(update => allowedUpdateds.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/todos/:id.json", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
