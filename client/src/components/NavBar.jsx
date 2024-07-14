import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"; // Correct the import path

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Habit tracker</Link>{" "}
        {/* Replace "MyBrand" with your brand name or logo */}
      </div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
