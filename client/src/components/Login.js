import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure the import path is correct
import { MyContext } from "../MyContext";

function Login() {
  const { user, setUser } = useContext(MyContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Line 15 login.js, user is set");
      navigate("/dashboard");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This ensures cookies are sent with the request
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful", data);
        console.log("User data from login:", data); // Log data.user
        setUser(data); // Set the user state
        // navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Habit tracker</Link>
        </div>
      </nav>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="signup-link">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
