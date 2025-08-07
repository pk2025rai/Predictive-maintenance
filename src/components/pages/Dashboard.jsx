import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaUserCog, FaCog } from "react-icons/fa";
import { MdSensors } from "react-icons/md";
import "../styles/Prototype.css";
// import clientlogo from '../assets/clientlogo.png'
import "../styles/analytics.css";
import image from "../assets/analytics.png";
import ing from "../assets/resoluteai.png";
import pre from "../assets/pre.png";
import client from "../assets/client.webp";
import admin from "../assets/admin.png";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const wrapper = document.querySelector(".hamburger-hover-wrapper");
      if (wrapper && !wrapper.contains(event.target)) {
        setHamburgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Home";
      case "/sensors":
        return "Sensor's Health";
      case "/configuration":
        return "Configuration";
      case "/user-management":
        return "User Management";
      default:
        return "";
    }
  };

  const currentPage = getPageTitle(location.pathname);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="logo">
          <img src={image} alt="AnalyticsKart Logo" />
        </div>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/sensors"
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <MdSensors />
            <span>Sensor's Health</span>
          </NavLink>

          <NavLink
            to="/configuration"
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaCog />
            <span>Configuration</span>
          </NavLink>

          <NavLink
            to="/user-management"
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            <FaUserCog />
            <span>User Management</span>
          </NavLink>
        </nav>

        <div className="footer-logo">
          <p
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              padding: "0 0 2px",
            }}
          >
            Powered by
          </p>
          <img src={ing} alt="ResoluteAI" />
        </div>
      </div>
      <div className="main-content">
        <header className="app-header">
          <div className="sidebar-toggle-wrapper">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <div className="toggle-icon"></div>
            </button>
            <div className="current-page-title">
              <h3>{currentPage}</h3>
            </div>
          </div>

          <div className="hamburger-hover-wrapper">
            <button
              className="hamburger-toggle"
              onClick={() => setHamburgerMenuOpen((prev) => !prev)}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>

            {isHamburgerMenuOpen && (
              <div className="hover-nav-card">
                <button
                  className="nav-button"
                  onClick={() => {
                    navigate("/");
                    setHamburgerMenuOpen(false);
                  }}
                >
                  <FaHome /> <span>Home</span>
                </button>
                <button
                  className="nav-button"
                  onClick={() => {
                    navigate("/sensors");
                    setHamburgerMenuOpen(false);
                  }}
                >
                  <MdSensors /> <span>Sensor's Health</span>
                </button>
                <button
                  className="nav-button"
                  onClick={() => {
                    navigate("/configuration");
                    setHamburgerMenuOpen(false);
                  }}
                >
                  <FaCog /> <span>Configuration</span>
                </button>
                <button
                  className="nav-button"
                  onClick={() => {
                    navigate("/user-management");
                    setHamburgerMenuOpen(false);
                  }}
                >
                  <FaUserCog /> <span>User Management</span>
                </button>
              </div>
            )}
          </div>

          <h1>Predictive Maintenance</h1>

          <div className="app-client">
            <img src={pre} alt="Client Logo" />
          </div>

          <div className="app-logo">
            <img src={admin} alt="Client Logo" />
          </div>
        </header>

        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
