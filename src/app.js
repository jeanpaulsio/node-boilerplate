import express from "express";
import path from "path";

import TodoRouter from "./routers/todo";

import "./db/mongoose";

const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(TodoRouter);

app.get("/hello.json", (_req, res) => {
  res.send({ hello: "world" });
});

// Handles any requests that don't match the ones above
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default app;
