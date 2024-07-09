import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/habits">Habits</Link>
      <br />
      <Link to="/categories">Categories</Link>
    </div>
  );
}

export default Dashboard;
