import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Correct the import path

function NavBar() {
  return (
    // <nav className="navbar">
    //   <div className="navbar-brand">
    //     <Link to="/">Habit tracker</Link>{" "}
    //     {/* Replace "MyBrand" with your brand name or logo */}
    //   </div>
    //   <ul className="nav-list">
    //     <li className="nav-item">
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/about">About</Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/login">Login</Link>
    //     </li>
    //   </ul>
    // </nav>

    <nav className="bg-transparent p-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-800 text-2xl font-light italic">
          <Link to="/">Habit Tracker</Link>
        </div>
        <ul className="flex space-x-6">
          <li className="text-gray-600 hover:text-black hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-600 hover:text-black hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-gray-600 hover:text-black hover:underline">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
