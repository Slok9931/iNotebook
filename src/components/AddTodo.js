import React, { useContext, useState } from "react";
import todoContext from "../context/todos/todoContext";

const AddTodo = (props) => {
  const context = useContext(todoContext);
  const { addTodo } = context;
  const {btn, handleChange} = props;
  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];  
  };

  const [todo, setTodo] = useState({ work: "", date: formatDate(new Date()) });
  const handleClick = (e) => {
    e.preventDefault();
    addTodo(todo.work, todo.date);
    setTodo({ work: "" , date: formatDate(new Date())});
  };
  
  return (
    <div className="container my-2">
      <form>
        <div>
          <input
            type="text"
            className="form-control todo"
            id="work"
            name="work"
            placeholder="Write your task here..."
            value={todo.work}
            minLength={2}
            required
            onChange={onChange}
          />
        </div>
        <div>
          <input
            type="date"
            className="form-control todo"
            id="date"
            name="date"
            min={formatDate(new Date())}
            value={todo.date}
            required
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-between">
        <button
          type="button"
          className={`btn btn-${btn.type} button`}
          onClick={handleChange}
        >
          {btn.text}
          </button>
          <button
          disabled={todo.work.length < 2}
          type="submit"
          className="btn btn-primary button"
          onClick={handleClick}
        >
          Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
