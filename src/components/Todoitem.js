import React, { useContext, useRef, useState, useEffect } from "react";
import todoContext from "../context/todos/todoContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import dayjs from "dayjs";

const Todoitem = (props) => {
  const context = useContext(todoContext);
  const { deleteTodo, editTodo, todos } = context;
  const { todo, updateTodo, btn } = props;
  const [isAnimating, setIsAnimating] = useState(false);
  const [star, setStar] = useState("bi-star");
  const refClose = useRef(null);
  const handleDelete = (todo) => {
    if(todo.status === "false"){
        const myModal = new window.bootstrap.Modal(document.getElementById(todo._id));
        myModal.show();
    }
    else{
        deleteTodo(todo._id);
    }
  }
  const handleClose = (id) => {
    deleteTodo(id);
    refClose.current.click();
  }
  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      todo.status === "false" ? editTodo(todo._id, todo.work, "true") : editTodo(todo._id, todo.work, "false");
      setIsAnimating(false);
    }, 300);
  }
  const handleStar = () => {
    if(star === "bi-star"){
      setStar("bi-star-fill")
      todo.priority = "true"
      editTodo(todo._id, todo.work, todo.status, todo.date, todo.priority)
    }
    else{
      setStar("bi-star")
      todo.priority = "false"
      editTodo(todo._id, todo.work, todo.status, todo.date, todo.priority)
    }
  }
  useEffect(() => {
      const oneMonthAgo = dayjs().subtract(1, 'month').format("YYYY-MM-DD");
      todos.forEach(todo => {
        if (dayjs(todo.date).isBefore(oneMonthAgo)) {
          deleteTodo(todo._id);
        }
      });
  }, [todos, deleteTodo]);
  return (
    <>
      <div
        className="modal fade"
        id={todo._id}
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Delete Todo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete "<strong>{todo.work}</strong>"?
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {handleClose(todo._id)}}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wid2">
        <div className="card2 mb-3">
          <div style={{marginTop: '1rem', marginLeft: '1rem', marginRight: '1rem'}}>
            <div className="d-flex justify-content-between align-items-center position bg-white mt-0">
              <p
                className={`${btn.text === "Go back" || isAnimating ? "line-through" : ""} line-through-animation text-break todo_p`}
                onClick={() => {
                  updateTodo(todo);
                }}
              >
                {todo.work}
              </p>
              <div>
              <input onChange={handleClick} type="checkbox" className="checkbox" checked={btn.text === "Go back"}></input>
              <i className={`${todo.priority === "true" ? "bi bi-star-fill" : "bi bi-star"} mx-2`} style={{color: '#c86802', fontSize: '1.25rem'}} onClick={handleStar}></i>
              {btn.text === "See Finished" && <i
                className="fa-solid fa-trash mx-2"
                onClick={() => {handleDelete(todo)}}
              ></i>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todoitem;
