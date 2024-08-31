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
    <aside
      className={`h-screen fixed z-50 top-0 left-0 transition-transform duration-300 transform ${
        expanded ? "translate-x-0" : "-translate-x-full"
      } xl:translate-x-0 xl:relative xl:w-auto`}
    >
      <nav className="flex flex-col h-full bg-white border-r shadow-sm">
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

export function SideBarItem({ icon, text, active, alert, path }) {
  const { expanded } = useContext(SideBarContext);
  return (
    <Link to={path}>
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
    </Link>
  );
}
