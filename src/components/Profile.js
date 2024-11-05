import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import todoContext from "../context/todos/todoContext";
import TodoChart from "./TodoChart";
import dayjs from "dayjs";

const Profile = () => {
  const todocontext = useContext(todoContext);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    photo: "",
  });
  const [tempForm, setTempForm] = useState({ ...form });
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const profilephoto = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    efavourite: "false",
  });
  const { notes, getNotes, editNote } = context;
  const { todos } = todocontext;
  const [photoFile, setPhotoFile] = useState(null);
  const profileChange = () => {
    profilephoto.current.click();
  };
  useEffect(() => {
    // eslint-disable-next-line
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const getUser = async () => {
    const response = await fetch(`http://localhost:2000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setForm(json);
    console.log(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleClick = () => {
    setTempForm({ ...form });
    ref.current.click();
  };
  const handleClose = () => {
    setTempForm({ ...form });
    refClose.current.click();
  };

  const handleSave = async () => {
    const formData = new FormData();

    formData.append("name", tempForm.name);
    formData.append("username", tempForm.username);
    formData.append("email", tempForm.email);
    formData.append("bio", tempForm.bio || " ");

    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      const response = await fetch(
        `http://localhost:2000/api/auth/updateuser`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        alert("These credentials already exist.");
        return;
      }

      const updatedUser = await response.json();
      setForm(updatedUser);
      refClose.current.click();
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    }
  };

  const onChange = (e) => {
    setTempForm({ ...tempForm, [e.target.name]: e.target.value });
  };

  const refnew = useRef(null);
  const refClosenew = useRef(null);
  const updateNote = (note) => {
    refnew.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      efavourite: note.favourite,
    });
  };
  const show = (note) => {
    setNote((prevNote) => ({
      ...prevNote,
      efavourite: prevNote.efavourite === "false" ? "true" : "false",
    }));
  };
  const handleChange = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.efavourite);
    refClosenew.current.click();
  };
  const onnewChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const dailyTodos = todos.filter(
    (todo) =>
      dayjs(todo.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
  );
  const pendingTodos = dailyTodos.filter(
    (todo) => todo.status === "false"
  ).length;
  const completedTodos = dailyTodos.filter(
    (todo) => todo.status === "true"
  ).length;

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
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body container">
              <form>
                <div className="my-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    id="photo"
                    name="photo"
                    ref={profilephoto}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="image">
                  <img
                    src={
                      photoFile
                        ? URL.createObjectURL(photoFile)
                        : `http://10.10.240.185:2000${form.photo}`
                    }
                    onClick={profileChange}
                    height="100"
                    width="100"
                    style={{
                      marginLeft: "40%",
                      borderRadius: "50%",
                      border: "1px solid black",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    alt="Profile"
                  />
                </div>
                <label htmlFor="username">Username</label>
                <div className="my-1">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={tempForm.username}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="name">Name</label>
                <div className="my-1">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    required
                    minLength={3}
                    value={tempForm.name}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="email">Email</label>
                <div className="my-1">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={tempForm.email}
                    onChange={onChange}
                  />
                </div>
                <label htmlFor="bio">Bio</label>
                <div className="my-1">
                  <textarea
                    placeholder="Write your bio here..."
                    className="form-control"
                    id="bio"
                    name="bio"
                    minLength={0}
                    value={tempForm.bio}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        ref={refnew}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalnew"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModalnew"
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
                      onChange={onnewChange}
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
                      onChange={onnewChange}
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
                ref={refClosenew}
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
                onClick={handleChange}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex f_col justify-content-center">
        <div className="container">
          <div className="first d-flex f_col justify-content-center">
            <div className="image">
              <img
                src={
                  form.photo
                    ? `http://10.10.240.185:2000${form.photo}`
                    : "/profile.jpg"
                }
                style={{
                  borderRadius: "50%",
                  border: "1px solid black",
                  overflow: "hidden",
                  objectFit: "cover",
                  height: '12rem',
                  width: '12rem'
                }}
                alt="Profile"
              />
            </div>
            <div className="password">
              <h2>{form.username}</h2>
              <br />
              <strong>{form.name}</strong>
              <p>{form.email}</p>
              <p className="bio">{form.bio}</p>
              <button
                className="btn btn-primary password3"
                onClick={handleClick}
              >
                Edit
              </button>
            </div>
          </div>
          <div>
            <h2 className="my-5">Your favourite notes</h2>
            <div className="your-notes2">
              {notes &&
                notes.length > 0 &&
                notes.map((note) => {
                  return (
                    note.favourite === "true" && (
                      <Noteitem
                        key={note._id}
                        updateNote={updateNote}
                        note={note}
                      />
                    )
                  );
                })}
            </div>
          </div>
        </div>
        <div>
          <TodoChart
            completedCount={completedTodos}
            pendingCount={pendingTodos}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
