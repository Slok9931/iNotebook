import React, { useState } from "react";
import TodoContext from "./todoContext";

const TodoState = (props) => {
  const host = "http://localhost:2000";
  const todosInitial = [];
  const [todos, setTodos] = useState(todosInitial);

  // Fetch all todos
  const getTodos = async () => {
    const response = await fetch(`${host}/api/todo/fetchalltodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setTodos(json); // fixed here
  };

  // Add a new todo
  const addTodo = async (work, date) => {
    const response = await fetch(`${host}/api/todo/addtodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ work, date }),
    });
    const json = await response.json();
    console.log(json);

    const todo = { work: work, date: date };
    setTodos(todos.concat(todo)); // fixed here
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    const response = await fetch(`${host}/api/todo/deletetodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    // Use functional state update to avoid stale state issues
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  // Edit a todo
  const editTodo = async (id, work, status, date, priority) => {
    const response = await fetch(`${host}/api/todo/updatetodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ work, status, date, priority }),
    });
    const json = await response.json();
    console.log(json);

    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      if (element._id === id) {
        element.id = id;
        element.work = work;
        element.status = status;
        element.date = date;
        element.priority = priority;
      }
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, editTodo, getTodos }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;
