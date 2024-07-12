import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar"; // Import the NavBar component
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import "./App.css"; // Import the CSS file

export default function App() {
  const location = useLocation();
  // const showNavBar = ["/", "/about"].includes(location.pathname);

  return (
    <div>
      {/* {showNavBar && <NavBar />} */}
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
      {/* {showNavBar && <Footer />} */}
    </div>
  );
}

function HomeLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
