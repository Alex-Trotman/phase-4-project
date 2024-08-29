import React, { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SideBar.css";
import { MyContext } from "../MyContext";
import { MdDashboard, MdCategory } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { ChevronFirst, ChevronLast } from "lucide-react";
const SideBarContext = createContext();

export default function SideBar2({ children, expanded, setExpanded }) {
  const { user, categories, fetchCategories } = useContext(MyContext);
  const [delayedCategories, setDelayedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [expanded, setExpanded] = useState(true);

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
    // Old sidebar

    // <aside className="sidebar flex flex-col w-64 h-screen">
    //   {/* User profile section */}
    //   <div className="sidebar-profile bg-lime-700 px-8 flex py-3 items-center min-h-[64px]">
    //     <img
    //       src="https://via.placeholder.com/40"
    //       alt="User profile"
    //       className="sidebar-profile-image w-10 h-10 rounded-full mr-3"
    //     />
    //     <span className="sidebar-profile-username text-lg text-white">
    //       {user ? user.username : "user"}
    //     </span>
    //   </div>
    //   <div className="p-6 bg-white h-full">
    //     <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
    //       <Link
    //         to="/app"
    //         className="sidebar-link flex items-center text-inherit no-underline"
    //       >
    //         <MdDashboard className="sidebar-icon h-7 w-7 mr-3" />
    //         Dashboard
    //       </Link>
    //     </div>
    //     <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
    //       <Link
    //         to="/app/statistics"
    //         className="sidebar-link flex items-center text-inherit no-underline"
    //       >
    //         <IoIosStats className="sidebar-icon h-7 w-7 mr-3" />
    //         Statistics
    //       </Link>
    //     </div>
    //     <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
    //       <Link
    //         to="/app/categories"
    //         className="sidebar-link flex items-center text-inherit no-underline"
    //       >
    //         <MdCategory className="sidebar-icon h-7 w-7 mr-3" />
    //         Categories
    //       </Link>
    //     </div>
    //     <div className="sidebar-section-title my-2 text-base uppercase font-bold hover:bg-gray-300 p-2 rounded-md">
    //       <Link
    //         to="/app/habits"
    //         className="sidebar-link flex items-center text-inherit no-underline"
    //       >
    //         <FaListCheck className="sidebar-icon h-7 w-7 mr-3" />
    //         Habits
    //       </Link>
    //     </div>
    //   </div>
    // </aside>

    // Start new fancy sidebar
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/261.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SideBarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SideBarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <IoMdMore size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SideBarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SideBarContext);
  return (
    <li
      className={`
    relative flex items-center py-2 px-3 my-1 
    font-medium rounded-md cursor-pointer 
    transition-colors
    ${
      active
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-indigo-50 text-gray-600"
    }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
}
// YouTube tutorial for new fancy sidebar
// https://www.youtube.com/watch?v=NFrFhBJPTmI&t=1s
