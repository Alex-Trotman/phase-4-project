import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";
import { FaChessBoard } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaChess } from "react-icons/fa";
import { FaChessPawn } from "react-icons/fa";

function SideBar({ categories }) {
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

      <div className="sidebar-section-title">
        <Link to="/dashboard" className="sidebar-link">
          <FaChessBoard className="sidebar-icon" />
          Dashboard
        </Link>
      </div>

      {/* Filter through different views of habits (Today, Week, Month etc...) */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <Link to="/views" className="sidebar-link">
            <FaChess className="sidebar-icon" />
            Views
          </Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/today">
              <FaChessPawn />
              Today
            </Link>
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
        <div className="sidebar-section-title">
          <Link to="/dashboard/habits" className="sidebar-link">
            <MdEdit className="sidebar-icon" />
            Habits
          </Link>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/all-habits">All Habits</Link>
          </li>
          {/* <li className="sidebar-item">
            <Link to="/new-habit">Add New Habit</Link>
          </li> */}
        </ul>
      </div>

      {/* Separation line */}
      <hr className="sidebar-separator" />

      {/* List user's categories */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <Link to="/dashboard/categories" className="sidebar-link">
            <MdEdit className="sidebar-icon" />
            Categories
          </Link>
        </div>
        <ul className="sidebar-nav">
          {/* {categories.map((category) => (
            <li key={category} className="sidebar-item">
              <Link to={`/dashboard/categories/${category}`}>{category}</Link>
            </li>
          ))} */}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
