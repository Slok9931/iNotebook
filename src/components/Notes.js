import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import Todo from "./Todo";

const Notes = () => {
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    efavourite: "false",
  });
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);
  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      efavourite: note.favourite,
    });
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const show = (note) => {
    setNote((prevNote) => ({
      ...prevNote,
      efavourite: prevNote.efavourite === "false" ? "true" : "false",
    }));
  };
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.efavourite);
    refClose.current.click();
  };
  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
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
                  <div className="my-1 d-flex justify-content-between align-items-center">
                    <input
                      type="text"
                      className="form-control no-border bold-large"
                      id="etitle"
                      name="etitle"
                      minLength={3}
                      required
                      value={note.etitle}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                      }}
                    />
                    <i
                      className={`bi ${
                        note.efavourite === "true"
                          ? "bi-heart-fill"
                          : "bi-heart"
                      } fs-2`}
                      style={{ color: "red" }}
                      onClick={show}
                    ></i>
                  </div>
                  <div className="mb-3">
                    <textarea
                      type="text"
                      className="form-control no-border"
                      id="edescription"
                      name="edescription"
                      minLength={3}
                      required
                      value={note.edescription}
                      onChange={onChange}
                      style={{
                        outline: "none",
                        boxShadow: "none",
                        border: "none",
                        height: "70vh",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 3
                }
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="notes-layout">
        <div className="todos">
          <Todo />
        </div>
        <div className="add-note">
          <AddNote />
        </div>
        <div className="your-notes">
          <h2 className="my-margin">Your notes</h2>
          {notes &&
            notes.length > 0 &&
            notes.map((note) => {
              return (
                <Noteitem key={note._id} updateNote={updateNote} note={note} />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Notes;
