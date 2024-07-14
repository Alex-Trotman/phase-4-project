import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar"; // Import the NavBar component
import SideBar from "./components/SideBar";
import DashboardHeader from "./components/DashboardHeader";
import Categories from "./pages/Categories";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import "./App.css"; // Import the CSS file

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
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

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <DashboardHeader className="header" />
      <SideBar className="sidebar" />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
