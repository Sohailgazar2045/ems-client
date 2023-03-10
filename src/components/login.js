import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [IncorrectPassword , setIncorrectPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    axios
      .post("http://localhost:5000/api/login", { email, password })
      .then((res) => {
        const { token, role } = res.data;
        console.log(res.data);
        localStorage.setItem("token", token);
        if (role) {
          localStorage.setItem("role", role);
        }
        navigate("/dashboard");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            setIncorrectPassword(err.response.data.message);
          } else {
            console.log(err);
          }
        }
        navigate("/");
      });
  };

  return (
    <html lang="en">
      <head>
        <meta
          className="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Login Page</title>
      </head>
      <body>
        <div className="form-container">
          <div className="col-md-4">
            <h1 className="headi">
              <b>Employee Management System</b>
            </h1>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="shadow-lg p-3 mb-4 bg-body-danger-bg-subtle rounded-3">
                <div className="form-group mt-4">
                  <label htmlFor="email" className="headi">
                    <b>Email:</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="password" className="headi">
                    <b>Password:</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                  {IncorrectPassword && (
                    <div className="text-danger">{IncorrectPassword}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-dark body-danger-subtle mt-3  gap-5"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Login;
