import React, { useContext, useState } from "react";
import { MyContext } from "./MyContext";
import { Routes, Route, Outlet } from "react-router-dom";
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
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
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
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={`app-container grid xl:grid-cols-[auto_1fr] min-h-screen`}>
      {/* Sidebar */}
      <div
        className={`side-bar hidden xl:block bg-red-600 h-screen transition-all duration-300 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        <SideBar2 expanded={expanded} setExpanded={setExpanded}>
          <SideBarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            alert
          />

          <SideBarItem
            icon={<BarChart3 size={20} />}
            text="Statistics"
            active
          />
          <SideBarItem icon={<UserCircle size={20} />} text="Users" />
          <SideBarItem icon={<Boxes size={20} />} text="Inventory" />
          <SideBarItem icon={<Package size={20} />} text="Orders" alert />
          <SideBarItem icon={<Receipt size={20} />} text="Billings" />

          <hr className="my-3" />

          <SideBarItem icon={<Settings size={20} />} text="Settings" />
          <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
        </SideBar2>
      </div>

      {/* Header and Outlet */}
      <div className="header-outlet-container flex flex-col">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
}

function StatisticsLayout() {
  return (
    <div className="statistics-layout-container">
      <Outlet />
    </div>
  );
}
