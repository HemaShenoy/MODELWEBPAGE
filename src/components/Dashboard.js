
import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../Dashboard.css";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dash-container">
        <div className="dash-card">

          <div className="ring-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>

          <h1 className="welcome-title">Welcome to Champ</h1>
          <p className="welcome-desc">Dashboard loaded successfully.</p>
        </div>
      </div>
    </div>
  );
}
