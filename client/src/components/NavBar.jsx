import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Correct the import path

function NavBar() {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-8 py-4">
        <div className="text-black text-3xl">
          <Link to="/">Habit Tracker</Link>
        </div>
        <ul className="flex space-x-6">
          <li className="text-black text-2xl hover:text-gray-300 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-black text-2xl hover:text-gray-300 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-black text-2xl hover:text-gray-300 hover:underline">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
