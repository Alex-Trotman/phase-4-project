import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Signup.css"; // Ensure the import path is correct

function Signup() {
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

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || "Sign up failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Sign up successful", data);
        setUser(data);
        // Redirect to the dashboard or another page
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
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
      <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
