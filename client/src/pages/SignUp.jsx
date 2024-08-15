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
    // <div>
    //   <nav className="navbar">
    //     <div className="navbar-brand">
    //       <Link to="/">Habit tracker</Link>
    //     </div>
    //   </nav>
    //   <div className="signup-container">
    //     <form onSubmit={formik.handleSubmit} className="signup-form">
    //       <h2>Sign Up</h2>
    //       {formik.errors.submit && <p className="error">{formik.errors.submit}</p>}
    //       <div className="form-group">
    //         <label htmlFor="username">Username:</label>
    //         <input
    //           type="text"
    //           id="username"
    //           name="username"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.username}
    //           required
    //         />
    //         {formik.touched.username && formik.errors.username ? (
    //           <p className="error">{formik.errors.username}</p>
    //         ) : null}
    //       </div>
    //       <div className="form-group">
    //         <label htmlFor="password">Password:</label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           onChange={formik.handleChange}
    //           onBlur={formik.handleBlur}
    //           value={formik.values.password}
    //           required
    //         />
    //         {formik.touched.password && formik.errors.password ? (
    //           <p className="error">{formik.errors.password}</p>
    //         ) : null}
    //       </div>
    //       <button type="submit" className="signup-button" disabled={formik.isSubmitting}>
    //         Sign Up
    //       </button>
    //       <div className="login-link">
    //         Already have an account? <Link to="/login">Login</Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div>
      <nav className="bg-transparent p-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-800 text-2xl font-light italic">
            <Link to="/">Habit Tracker</Link>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-light text-center mb-6">Sign Up</h2>
          {formik.errors.submit && (
            <p className="text-red-500 text-sm mb-4">{formik.errors.submit}</p>
          )}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-light mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.username}
              </p>
            ) : null}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-light mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300"
            disabled={formik.isSubmitting}
          >
            Sign Up
          </button>
          <div className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-800 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
