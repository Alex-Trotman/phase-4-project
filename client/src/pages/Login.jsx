import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Ensure the import path is correct
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../assets/logo.svg";

function Login() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Line 15 login.js, user is set");
      navigate("/app");
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
          navigate("/app");
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
    // <div>
    //   <nav className="navbar">
    //     <div className="navbar-brand">
    //       <Link to="/">Habit tracker</Link>
    //     </div>
    //   </nav>
    //   <div className="login-container">
    //     <form onSubmit={formik.handleSubmit} className="login-form">
    //       <h2>Login</h2>
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
    //       <button type="submit" className="login-button" disabled={formik.isSubmitting}>
    //         Login
    //       </button>
    //       <div className="signup-link">
    //         Don’t have an account? <Link to="/signup">Sign up</Link>
    //       </div>
    //     </form>
    //   </div>
    // </div>

    <div>
      <nav className="bg-transparent p-4 px-8">
        <div className="flex justify-between items-center ">
          <div className="text-black text-3xl">
            <Link to="/">
              <img src={logo} className=""></img>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2 className="text-3xl font-light text-center mb-6">Login</h2>
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
            Login
          </button>
          <div className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-gray-800 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
