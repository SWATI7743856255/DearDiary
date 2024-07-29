import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";

const host = "http://localhost:5000";

function Login() {
  const navigate = useNavigate();
  const { showAlert } = useContext(AlertContext);


  // Login 
  const login = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      showAlert("Login successfully", "success");
      navigate("/"); // Redirect to home page or desired route 

    } else {
      showAlert("Invalid credentials", "danger");
    }
  };

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form className="my-3" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
