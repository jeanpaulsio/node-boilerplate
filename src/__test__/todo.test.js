import mongoose from "mongoose";
import request from "supertest";

import app from "../app";
import Todo from "../models/todo";
import { todoOne, setupDatabase } from "./fixtures/db";

beforeEach(setupDatabase);

afterAll(async () => {
  await mongoose.connection.close();
});

test("Should create a todo", async () => {
  const response = await request(app)
    .post("/todos.json")
    .send({ description: "test todo" })
    .expect(201);
  const todo = await Todo.findById(response.body._id);
  expect(todo).not.toBeNull();
  expect(todo.completed).toEqual(false);
});

test("Should fetch all todos", async () => {
  const response = await request(app)
    .get("/todos.json")
    .send()
    .expect(200);
  expect(response.body.length).toEqual(3);
});

test("Should fetch a single todo", async () => {
  const response = await request(app)
    .get(`/todos/${todoOne._id}.json`)
    .send()
    .expect(200);

  expect(response.body.description).toEqual(todoOne.description);
  expect(response.body.completed).toEqual(todoOne.completed);
});

test("Should update a todo", async () => {
  const response = await request(app)
    .patch(`/todos/${todoOne._id}.json`)
    .send({ description: "updated description", completed: true })
    .expect(200);
  expect(response.body.description).toEqual("updated description");
  expect(response.body.completed).toEqual(true);
});

test("Should delete a todo", async () => {
  expect((await Todo.find({})).length).toEqual(3);

  const response = await request(app)
    .delete(`/todos/${todoOne._id}.json`)
    .send()
    .expect(200);
  expect(response.body.description).toEqual(todoOne.description);

  expect((await Todo.find({})).length).toEqual(2);
});
