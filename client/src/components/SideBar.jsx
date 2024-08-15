import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";
import {
  FaChessBoard,
  FaChess,
  FaChessPawn,
  FaChessKnight,
  FaChessBishop,
} from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function SideBar() {
  const { user, categories, fetchCategories } = useContext(MyContext);
  const [delayedCategories, setDelayedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      if (categories.length === 0) {
        await fetchCategories();
      }
      setDelayedCategories(categories);
      setIsLoading(false);
    };

    fetchAndSetCategories();
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="sidebar ">
      {/* User profile section */}
      <div className="sidebar-profile bg-blue-700 flex">
        <img
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="sidebar-profile-image w-10 h-10 rounded-full"
        />
        <span className="sidebar-profile-username w-5 h-5">
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

      {/* List user's categories */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">
          <Link to="/dashboard/categories" className="sidebar-link">
            <MdEdit className="sidebar-icon" />
            Categories
          </Link>
        </div>
        <ul className="sidebar-nav">
          {isLoading ? (
            <li className="sidebar-item">Loading...</li>
          ) : delayedCategories.length === 0 ? (
            <li className="sidebar-item">No categories</li>
          ) : (
            delayedCategories.map((category) => (
              <li key={category.id} className="sidebar-item">
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
      </div>
    </aside>
  );
}

export default SideBar;
