import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardHeader.css";

function DashboardHeader() {
  return (
    <div className="header">
      <div className="header-left"></div>
      <input type="text" className="header-search" placeholder="Search..." />
      <div className="header-right">
        <Link to="/logout" className="header-logout">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
