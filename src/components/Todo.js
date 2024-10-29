import React, { useContext, useEffect, useRef, useState } from "react";
import todoContext from "../context/todos/todoContext";
import Todoitem from "./Todoitem";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const context = useContext(todoContext);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [todo, setTodo] = useState({
    id: "",
    ework: "",
    estatus: "false",
    edate: formatDate(new Date()),
  });
  const [date, setDate] = useState(new Date());
  const [btn, setBtn] = useState({ type: "danger", text: "See Finished" });
  const { todos, getTodos, editTodo } = context;
  const navigate = useNavigate();

  const refTodo = useRef(null);
  const refCloseTodo = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTodos();
    } else {
      navigate("/login");
    }
  }, [getTodos, navigate]);
  
  const updateTodo = (todo) => {
    refTodo.current.click();
    setTodo({
      id: todo._id,
      ework: todo.work,
      estatus: todo.status,
      edate: formatDate(new Date(todo.date)),
    });
  };

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onChoose = (e) => {
    setDate(e.target.value);
  };

  const handleClick = async () => {
    await editTodo(todo.id, todo.ework, todo.estatus, todo.edate);
    refCloseTodo.current.click();
  };

  const handleChange = () => {
    if (btn.type === "danger") {
      setBtn({ type: "warning", text: "Go back" });
    } else {
      setBtn({ type: "danger", text: "See Finished" });
    }
  };

  const sortedTodos = [...todos].sort((a, b) => {
    return a.priority === "true" && b.priority === "false" ? -1 : 1; 
  });

  return (
    <>
      <button
        type="button"
        ref={refTodo}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#todoModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="todoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-2" id="exampleModalLabel">
                Edit your task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <form>
                  <div className="my-1">
                    <input
                      type="text"
                      className="form-control"
                      id="ework"
                      name="ework"
                      minLength={2}
                      required
                      value={todo.ework}
                      onChange={onChange}
                      style={{ fontSize: "1.25rem" }}
                    />
                  </div>
                  <div className="my-2">
                    <input
                      type="date"
                      className="form-control"
                      id="edate"
                      name="edate"
                      min={formatDate(new Date())}
                      value={todo.edate}
                      onChange={onChange}
                      style={{ fontSize: "1.25rem" }}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refCloseTodo}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={todo.ework.length < 2}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddTodo handleChange={handleChange} btn={btn} />
      {btn.text === "See Finished" && (
        <div className="d-flex justify-content-around align-items-center">
          <h2 className="my-margin2">Your Todos</h2>
          <input
            type="date"
            className="form-control my-margin2"
            id="date"
            name="date"
            value={formatDate(new Date(date))}
            onChange={onChoose}
            style={{width: '8rem', height: '3rem'}}
          />
        </div>
      )}
      {btn.text === "Go back" && (
        <div className="d-flex">
          <h2 className="my-margin2">Completed Tasks</h2>
          <input
            type="date"
            className="form-control my-margin2"
            id="date"
            name="date"
            value={formatDate(new Date(date))}
            onChange={onChoose}
            style={{width: '8rem', height: '3rem'}}
          />
        </div>
      )}
      <div
        className="bg-black mx-1"
        style={{ height: "0.5px", color: "white" }}
      >
        .
      </div>
      <div className="your-notes" style={{ height: "45vh" }}>
        {btn.text === "See Finished" &&
          sortedTodos &&
          sortedTodos.length > 0 &&
          sortedTodos.map(
            (todo) =>
              todo.status === "false" &&
              formatDate(new Date(todo.date)) === formatDate(new Date(date)) && (
                <Todoitem
                  key={todo._id}
                  updateTodo={updateTodo}
                  todo={todo}
                  handleChange={handleChange}
                  btn={btn}
                />
              )
          )}
        {btn.text === "Go back" &&
          sortedTodos &&
          sortedTodos.length > 0 &&
          sortedTodos.map(
            (todo) =>
              todo.status === "true" &&
              formatDate(new Date(todo.date)) === formatDate(new Date(date)) && (
                <Todoitem
                  key={todo._id}
                  updateTodo={updateTodo}
                  todo={todo}
                  handleChange={handleChange}
                  btn={btn}
                />
              )
          )}
      </div>
    </>
  );
};

export default Todo;
