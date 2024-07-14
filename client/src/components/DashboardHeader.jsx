import React from "react";
import { Link } from "react-router-dom";
// import "../styles/DashboardHeader.css";

function DashboardHeader() {
  return (
    <div className="header">
      <div>All habits</div>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

export default DashboardHeader;
