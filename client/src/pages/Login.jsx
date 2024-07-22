import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure the import path is correct
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Line 15 login.js, user is set");
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This ensures cookies are sent with the request
        body: JSON.stringify(values),
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
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("There was an error logging in!", error);
          setErrors({ submit: error.message });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Habit tracker</Link>
        </div>
      </nav>
      <div className="login-container">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h2>Login</h2>
          {formik.errors.submit && <p className="error">{formik.errors.submit}</p>}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>
          <button type="submit" className="login-button" disabled={formik.isSubmitting}>
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
