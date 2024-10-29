import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "" });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description);
    setNote({ title: "", description: "" });
  };
  return (
    <div className="container my-2">
      <form>
        <div>
          <input
            type="text"
            className="form-control no-border bold-large"
            id="title"
            name="title"
            placeholder="Title"
            value={note.title}
            minLength={3}
            required
            onChange={onChange}
            style={{
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control no-border"
            id="description"
            name="description"
            placeholder="Add your note here..."
            value={note.description}
            minLength={3}
            required
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
        <button
          disabled={note.title.length < 3 || note.description.length < 3}
          type="submit"
          className="btn btn-primary my-btn"
          onClick={handleClick}
        >
          Add note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
