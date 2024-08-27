import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";
import { MdDashboard, MdCategory } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";

function SideBar2() {
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
    <aside className="sidebar flex flex-col w-auto">
      {/* User profile section */}
      <div className="sidebar-profile bg-lime-700 px-8 flex py-3 items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="User profile"
          className="sidebar-profile-image w-10 h-10 rounded-full mr-3"
        />
        <span className="sidebar-profile-username text-lg text-white">
          {user ? user.username : "user"}
        </span>
      </div>
      <div className="p-6 bg-white h-full">
        {/* Create new habit 
        
        1. Habit name
        2. Habit Description
        3. What kind of habit is it? (Boolean vs numeric)
        4. Chart type (line/pie/bar/heatmap)
        
        
        */}
        {/* Create new category */}
        {/* Manage/view habits */}
        {/* Manage/view categories */}
        {/* Customize dashboard */}

        <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
          <Link
            to="/app"
            className="sidebar-link flex items-center text-inherit no-underline"
          >
            <MdDashboard className="sidebar-icon h-7 w-7 mr-3" />
            Dashboard
          </Link>
        </div>
        <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
          <Link
            to="/app/statistics"
            className="sidebar-link flex items-center text-inherit no-underline"
          >
            <IoIosStats className="sidebar-icon h-7 w-7 mr-3" />
            Statistics
          </Link>
        </div>
        <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
          <Link
            to="/app/categories"
            className="sidebar-link flex items-center text-inherit no-underline"
          >
            <MdCategory className="sidebar-icon h-7 w-7 mr-3" />
            Categories
          </Link>
        </div>
        <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
          <Link
            to="/app/habits"
            className="sidebar-link flex items-center text-inherit no-underline"
          >
            <FaListCheck className="sidebar-icon h-7 w-7 mr-3" />
            Habits
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default SideBar2;
