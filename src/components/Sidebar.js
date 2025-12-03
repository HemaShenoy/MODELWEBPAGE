
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="logo">
          <img
            src={require("../badminton-logo-vector.jpg")}
            alt="Logo"
            className={collapsed ? "logo-img collapsed" : "logo-img"}
          />
          {!collapsed && <span className="logo-text">Champ</span>}
        </div>
      </div>

      {/* Floating Toggle Button */}
      <FaBars className="toggle-floating" onClick={toggleSidebar} />

      {/* Navigation Items */}
      <ul className="nav-list">

        <li>
          <Link to="/home">
            <FaHome className="icon" />
            {!collapsed && <span>Home</span>}
          </Link>
        </li>

        {/* PUBLIC MENU */}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt className="icon" />
                {!collapsed && <span>Login</span>}
              </Link>
            </li>


          </>
        )}

        {/* AUTH MENU */}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/dashboard">
                <FaChartBar className="icon" />
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>

            <li>
              <Link to="/settings">
                <FaCog className="icon" />
                {!collapsed && <span>Settings</span>}
              </Link>
            </li>

            <li onClick={logout}>
              <div className="logout-link">
                <FaSignOutAlt className="icon" />
                {!collapsed && <span>Logout</span>}
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
