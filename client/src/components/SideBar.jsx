import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";

function SideBar() {
  const { user } = useContext(MyContext);
  return (
    <aside className="sidebar">
      {/* User profile section */}
      <div className="sidebar-profile">
        <img
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="sidebar-profile-image"
        />
        <span className="sidebar-profile-username">
          {user ? user.username : "user"}
        </span>
      </div>

      <h3 className="sidebar-section-title">
        <Link to="/dashboard">Dashboard</Link>
      </h3>

      {/* Filter through different views of habits (Today, Week, Month etc...) */}
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Views</h3>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/today">Today</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/week">This Week</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/month">This Month</Link>
          </li>
        </ul>
      </div>

      {/* Separation line */}
      <hr className="sidebar-separator" />

      {/* Habits section */}
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">Habits</h3>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/all-habits">All Habits</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/new-habit">Add New Habit</Link>
          </li>
        </ul>
      </div>

      {/* Separation line */}
      <hr className="sidebar-separator" />

      {/* List user's categories */}
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">
          <Link to="/dashboard/categories">Categories</Link>
        </h3>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/dashboard/categories/health">Health</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/categories/work">Work</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/categories/hobbies">Hobbies</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/categories/fitness">Fitness</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/categories/personal">Personal</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/categories/other">Other</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
