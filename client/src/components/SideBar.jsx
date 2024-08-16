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
    <aside className="sidebar flex flex-col">
      {/* User profile section */}
      <div className="sidebar-profile bg-blue-700 px-8 flex py-3 items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="sidebar-profile-image w-10 h-10 rounded-full mr-3"
        />
        <span className="sidebar-profile-username text-lg">
          {user ? user.username : "user"}
        </span>
      </div>
      {/* New div wrapping the rest of the sidebar content */}
      <div className="p-6">
        {" "}
        {/* Add your desired padding here */}
        <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300">
          <Link
            to="/dashboard"
            className="sidebar-link flex items-center text-inherit no-underline"
          >
            <FaChessBoard className="sidebar-icon" />
            Dashboard
          </Link>
        </div>
        {/* Filter through different views of habits (Today, Week, Month etc...) */}
        <div className="sidebar-section mt-5">
          <div className="sidebar-section-title flex items-center text-inherit no-underline my-2 text-base uppercase font-bold ">
            <FaChess className="sidebar-icon" />
            Views
          </div>
          <ul className="sidebar-nav">
            <li className="sidebar-item my-3 hover:bg-gray-300">
              <Link
                to="/dashboard/today"
                className="sidebar-link flex items-center text-inherit no-underline"
              >
                <FaChessPawn className="sidebar-icon" />
                Today
              </Link>
            </li>
            <li className="sidebar-item my-3 hover:bg-gray-300">
              <Link
                to="/dashboard/week"
                className="sidebar-link flex items-center text-inherit no-underline"
              >
                <FaChessKnight className="sidebar-icon" />
                This Week
              </Link>
            </li>
            <li className="sidebar-item my-3 hover:bg-gray-300">
              <Link
                to="/dashboard/month"
                className="sidebar-link flex items-center text-inherit no-underline"
              >
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
          <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300">
            <Link
              to="/dashboard/categories"
              className="sidebar-link flex items-center text-inherit no-underline"
            >
              <MdEdit className="sidebar-icon" />
              Categories
            </Link>
          </div>
          <ul className="sidebar-nav">
            {isLoading ? (
              <li className="sidebar-item my-3">Loading...</li>
            ) : delayedCategories.length === 0 ? (
              <li className="sidebar-item my-3">No categories</li>
            ) : (
              delayedCategories.map((category) => (
                <li
                  key={category.id}
                  className="sidebar-item my-3 hover:bg-gray-300"
                >
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
        <div className="sidebar-section hover:bg-gray-300">
          <div className="sidebar-section-title my-2 text-base uppercase font-bold">
            <Link
              to="/dashboard/habits"
              className="sidebar-link flex items-center text-inherit no-underline"
            >
              <MdEdit className="sidebar-icon" />
              Habits
            </Link>
          </div>
        </div>
      </div>{" "}
      {/* End of new wrapper div */}
    </aside>
  );
}

export default SideBar;
