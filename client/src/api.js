import axios from "axios";

async function createTodo(params) {
  return await axios.post("/todos.json", params);
}

async function deleteTodo({ id }) {
  return await axios.delete(`/todos/${id}.json`);
}

async function fetchTodo(id) {
  return await axios.get(`/todos/${id}.json`);
}

async function fetchTodos() {
  return await axios.get("/todos.json");
}

async function updateTodo({ id, completed }) {
  await axios.patch(`/todos/${id}.json`, { completed });
}

export { createTodo, deleteTodo, fetchTodo, fetchTodos, updateTodo };
