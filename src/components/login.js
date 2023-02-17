import React, { useState } from 'react';
import "./login.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
      await axios.post('http://localhost:5000/api/login', { email, password }).then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      }).catch((err) => {
        console.log(err);
        navigate("/")
      });
  };
  return (
    <html lang="en">
      <head>
        {/* <meta charset="UTF-8" /> */}
        <meta className="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Login Page</title>
      </head>
      <body>
        <div className="form-container">
          <div className="col-md-4">
          <h1 className="headi"><b>Employee Management System</b></h1>
          <br/>
            <form onSubmit={handleSubmit}>
            <div className="shadow-lg p-3 mb-4 bg-body-danger-bg-subtle rounded-3">
              <div className="form-group mt-4">
                <label htmlFor="email" className="headi"><b>Email:</b></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  onChange={(event)=>setEmail(event.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password" className="headi"><b>Password:</b></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  onChange={(event)=>setPassword(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-dark body-danger-subtle mt-3  gap-5">Login</button>
              </div>
            </form>

          </div>
        </div>
        
      </body>
      
    </html>
  );
};

export default Login;
