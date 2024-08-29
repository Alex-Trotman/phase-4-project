import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardHeader.css";

function DashboardHeader() {
  return (
    // <div className="header">
    //   <div className="header-left"></div>
    //   <input type="text" className="header-search" placeholder="Search..." />
    //   <div className="header-right">
    //     <Link to="/logout" className="header-logout">
    //       Logout
    //     </Link>
    //   </div>
    // </div>

    // <div className="header bg-blue-700 flex justify-between items-center p-5 text-white min-h-[64px]">
    //   <div className="header-left"></div>
    //   {/* <input
    //     type="text"
    //     className="header-search w-96 h-10"
    //     placeholder="Search..."
    //   /> */}
    //   <div className="header-right text-base hover:text-lg transition duration-300">
    //     <Link to="/logout" className="header-logout">
    //       Logout
    //     </Link>
    //   </div>
    // </div>

    <div className="header bg-blue-700 flex items-center p-5 text-white min-h-[64px]">
      <div className="header-right text-base ml-auto">
        <Link
          to="/logout"
          className="header-logout transition duration-300 hover:text-black hover:underline"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default DashboardHeader;
