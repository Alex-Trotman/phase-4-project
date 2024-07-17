import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";
import { FaChessBoard } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaChess } from "react-icons/fa";
import { FaChessPawn } from "react-icons/fa";
import { FaChessKnight } from "react-icons/fa";
import { FaChessBishop } from "react-icons/fa6";

function SideBar() {
  const { user, categories } = useContext(MyContext);
  const [delayedCategories, setDelayedCategories] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedCategories(categories);
    }, 1000); // Waits for 1 second before setting the categories

    return () => clearTimeout(timer); // Cleanup the timer
  }, [categories]);

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
          <FaChess className="sidebar-icon" />
          Views
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/dashboard/today" className="sidebar-link">
              <FaChessPawn className="sidebar-icon" />
              Today
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/week" className="sidebar-link">
              <FaChessKnight className="sidebar-icon" />
              This Week
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/dashboard/month" className="sidebar-link">
              <FaChessBishop className="sidebar-icon" />
              This Month
            </Link>
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
            <Link to="/all-habits" className="sidebar-link">
              All Habits
            </Link>
          </li>
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
          {delayedCategories === null ? (
            <li className="sidebar-item">Loading...</li>
          ) : (
            delayedCategories.map((category) => (
              <li key={category.name} className="sidebar-item">
                <Link
                  to={`/dashboard/category/${category.id}`}
                  className="sidebar-link"
                >
                  {category.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
