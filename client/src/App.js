import React, { useContext, useState } from "react";
import { MyContext } from "./MyContext";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar"; // Import the NavBar component
import SideBar from "./components/SideBar";
import SideBar2, { SideBarItem } from "./components/SideBar2";
import DashboardHeader from "./components/DashboardHeader";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import LogsPage from "./pages/LogsPage";
import Habits from "./pages/Habits";
import Footer from "./components/Footer";
import Logout from "./pages/Logout";
import Today from "./pages/Today";
import Week from "./pages/Week";
import Month from "./pages/Month";
import Statistics from "./pages/Statistics";
import "./styles/App.css"; // Import the CSS file
import StatisticsCategoryPage from "./pages/StatisticsCategoryPage";
import StatisticsHabitPage from "./pages/StatisticsHabitPage";
import MUIPLAYGROUND from "./MUIPLAYGROUND.jsx";
import Box from "@mui/material/Box";

import {
  MessageCircleQuestion,
  Receipt,
  Boxes,
  Package,
  ListChecks,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

export default function App() {
  const { categories } = useContext(MyContext);

  return (
    <div>
      {/* <Box sx={{ display: "flex" }}>
        <Routes>
          <Route path="/" element={<MUIPLAYGROUND />} />
        </Routes>
      </Box> */}

      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="app" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="statistics" element={<StatisticsLayout />}>
            <Route index element={<Statistics />} />
            <Route path=":categoryName" element={<StatisticsCategoryPage />} />
            <Route
              path=":categoryName/:habitName"
              element={<StatisticsHabitPage />}
            />
          </Route>
          <Route path="habits" element={<Habits />} />
          <Route path="today" element={<Today />} />
          <Route path="week" element={<Week />} />
          <Route path="month" element={<Month />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
          <Route path="logs/:habitId" element={<LogsPage />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

function HomeLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

function DashboardLayout() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  return (
    <div className="app-container flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white transition-all duration-300 transform ${
          expanded
            ? "translate-x-0 w-64 fixed top-0 left-0 h-full z-50 xl:relative xl:w-64"
            : "-translate-x-full w-64 fixed top-0 left-0 h-full z-50 xl:translate-x-0 xl:relative xl:w-20"
        }`}
      >
        <SideBar2 expanded={expanded} setExpanded={setExpanded}>
          <SideBarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            path="/app"
            active={location.pathname === "/app"} // Dynamically set active prop
          />
          <SideBarItem
            icon={<BarChart3 size={20} />}
            text="Statistics"
            path="/app/statistics"
            active={location.pathname.startsWith("/app/statistics")} // Dynamically set active prop
          />
          <SideBarItem
            icon={<Boxes size={20} />}
            text="Categories"
            path="/app/categories"
            active={location.pathname === "/app/categories"} // Dynamically set active prop
          />
          <SideBarItem
            icon={<ListChecks size={20} />}
            text="Habits"
            path="/app/habits"
            active={location.pathname === "/app/habits"} // Dynamically set active prop
          />
          <hr className="my-3" />
          <SideBarItem
            icon={<Settings size={20} />}
            text="Settings"
            path=""
            active={location.pathname === "/app/settings"} // Dynamically set active prop
          />
        </SideBar2>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader setExpanded={setExpanded} expanded={expanded} />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function StatisticsLayout() {
  return (
    <div className="statistics-layout-container w-full h-full">
      <Outlet />
    </div>
  );
}
