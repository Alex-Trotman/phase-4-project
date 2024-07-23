import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../MyContext";
import "../styles/Signup.css"; // Ensure the import path is correct
import { useFormik } from "formik";
import * as yup from "yup";

function Signup() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Line 15 signup.js, user is set");
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
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("There was an error signing up!", error);
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
      <div className="signup-container">
        <form onSubmit={formik.handleSubmit} className="signup-form">
          <h2>Sign Up</h2>
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
          <button type="submit" className="signup-button" disabled={formik.isSubmitting}>
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
