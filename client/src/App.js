import React, { useState } from "react";
import { Switch, Route, Redirect, Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import { createTodo, deleteTodo, fetchTodo, fetchTodos, updateTodo } from "./api";

import "./App.css";

function Todo() {
  let { id } = useParams();
  const { data: results, isLoading } = useQuery("todo", () => fetchTodo(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (results) {
    return <div>{results.data.description}</div>;
  }
  return null;
}

function App() {
  const [newTodo, setNewTodo] = useState("");
  const { data: results, isLoading, error } = useQuery("todos", fetchTodos);
  const [createTodoMutation] = useMutation(createTodo, { refetchQueries: ["todos"] });
  const [deleteTodoMutation] = useMutation(deleteTodo, { refetchQueries: ["todos"] });
  const [updateTodoMutation] = useMutation(updateTodo, { refetchQueries: ["todos"] });

  async function handleAddTodo(e) {
    e.preventDefault();
    await createTodoMutation({ description: newTodo });
    setNewTodo("");
  }

  async function handleRemoveTodo(id) {
    await deleteTodoMutation({ id });
    setNewTodo("");
  }

  async function handleUpdateTodo(id, completed) {
    await updateTodoMutation({ id, completed });
  }

  return (
    <div className="App">
      <section className="App-body">
        <Link to="/">
          <h1>Todos</h1>
        </Link>
        {isLoading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>Error: {error.message}</span>
        ) : results ? (
          <Switch>
            <Route path="/todos/:id">
              <Todo />
            </Route>
            <Redirect exact from="/" to="/todos" />
            <Route path="/todos">
              <ul>
                {results.data.map(todo => (
                  <li key={todo._id}>
                    <div className="pointer">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleUpdateTodo(todo._id, !todo.completed)}
                      />
                      <Link to={`/todos/${todo._id}`}>{todo.description}</Link>
                    </div>
                    <button onClick={() => handleRemoveTodo(todo._id)}>Delete</button>
                  </li>
                ))}
              </ul>
              <form onSubmit={handleAddTodo}>
                <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} />
              </form>
            </Route>
          </Switch>
        ) : null}
      </section>
    </div>
  );
}

export default App;
