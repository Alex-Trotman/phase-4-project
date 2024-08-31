// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/DashboardHeader.css";

// function DashboardHeader() {
//   return (
//     <div className="header bg-blue-700 flex items-center p-5 text-white min-h-[64px]">
//       <div className="header-right text-base ml-auto">
//         <Link
//           to="/logout"
//           className="header-logout transition duration-300 hover:text-black hover:underline"
//         >
//           Logout
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default DashboardHeader;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/DashboardHeader.css";

function DashboardHeader({ setExpanded, expanded }) {
  return (
    <div className="header bg-blue-700 flex items-center p-5 text-white min-h-[64px]">
      {/* Toggle Button for Sidebar (Visible on small screens) */}
      <button
        className="block xl:hidden mr-4"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

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
