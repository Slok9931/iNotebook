import React, { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, editNote } = context;
  const { note, updateNote } = props;
  const refClose = useRef(null);
  const handleDelete = () => {
    const myModal = new window.bootstrap.Modal(document.getElementById(note._id));
    myModal.show();
  }
  const handleClose = (id) => {
    deleteNote(id);
    refClose.current.click();
  }
  const handleClick = () => {
    if(note.favourite === "true"){
      editNote(note._id, note.title, note.description, "false");
    }
    else{
      editNote(note._id, note.title, note.description, "true");
    }
  }
  return (
    <>
      <div
        className="modal fade"
        id={note._id}
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                {note.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete "<strong>{note.title}</strong>"?
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
                onClick={() => {handleClose(note._id)}}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wid">
        <div className="card mb-3" style={{boxShadow: '1px 1px 7px grey'}}>
          <div className="notes">
            <div className="position">
            <div className="d-flex justify-content-between align-items-center bg-white mt-0">
              <h4
                className="card-title" style={{cursor: 'pointer'}}
                onClick={() => {
                  updateNote(note);
                }}
              >
                {note.title}
              </h4>
              <div>
              <i className={`bi ${note.favourite === "true" ? "bi-heart-fill" : "bi-heart"}`} style={{color: 'red'}} onClick={handleClick}></i>
              <i
                className="fa-solid fa-trash mx-2"
                onClick={handleDelete}
              ></i>
              </div>
            </div>
            <div className="bg-black" style={{height: '0.5px', color:'white'}}>.</div>
            </div>
            <p
              className="card-text" style={{cursor: 'pointer'}}
              onClick={() => {
                updateNote(note);
              }}
            >
              {note.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Noteitem;
