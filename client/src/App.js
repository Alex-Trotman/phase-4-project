import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import { Routes, Route, Outlet, useParams  } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar"; // Import the NavBar component
import SideBar from "./components/SideBar";
import SideBar2 from "./components/SideBar2";
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

export default function App() {
  const { categories } = useContext(MyContext);

  return (
    <div>
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
            {categories.map((category) => {
              return <Route path={`statistics/:${category.id}`} element={<Hello />} />
            })}
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

function Hello(){
  const { categoryId } = useParams();
  return <h1>{categoryId}</h1>;
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
  return (
    <div className="app-container">
      {/* <SideBar /> */}
      <SideBar2 />
      <DashboardHeader />
      <Outlet />
    </div>
  );
}

function StatisticsLayout(){
  return (
    <div className="">
      <Outlet />
    </div>
  )
}
