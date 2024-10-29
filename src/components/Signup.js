import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [icon, setIcon] = useState("visibility_off");
  const [view, setView] = useState("password");
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const show = () => {
    if (icon === "visibility_off") {
      setIcon("visibility");
      setView("text");
    } else {
      setIcon("visibility_off");
      setView("password");
    }
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, cpassword } = credentials;
    if (cpassword !== password) {
      alert("Please enter correct password");
    } else {
      const response = await fetch(
        `http://10.10.240.185:2000/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials.username,
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
      } else {
        alert("These credentials already exist.");
      }
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="main">
      <div className="signup1">
        <img src="/VisionPro.png" alt="Header" height="250"></img>
        <h2 className="text-white">Welcome to</h2>
        <h2 className="text-white">iNotebook!</h2>
        <div className="text-white">Your notes are secured in the cloud</div>
      </div>
      <div className="signup2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password">
            <input
              type={view}
              className="form-control"
              id="password"
              name="password"
              minLength={3}
              required
              onChange={onChange}
            />
            <span
              className="material-symbols-outlined password2"
              onClick={show}
            >
              {icon}
            </span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              minLength={3}
              required
              onChange={onChange}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary mt-5">
              Sign Up
            </button>
            <button
              className="btn link"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
