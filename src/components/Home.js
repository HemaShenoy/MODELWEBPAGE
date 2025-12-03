import React from "react";
import "./Home.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="home-container">
      <div className="hero-box">
        <h1 className="hero-title">🏆 National Championship 2025</h1>
        <p className="hero-subtitle">
          Welcome{user ? `, ${user.email}` : ""}! Get the latest updates, match schedules,
          rankings, and player statistics — all in one place.
        </p>
      </div>

      <div className="cards-wrapper">
        <div className="info-card">
          <h2>⚽ Upcoming Matches</h2>
          <p>View complete schedule and live match updates.</p>
        </div>

        <div className="info-card">
          <h2>👥 Top Players</h2>
          <p>Track player performance, stats, and rankings.</p>
        </div>

        <div className="info-card">
          <h2>📊 Points Table</h2>
          <p>Check standings and team progress throughout the season.</p>
        </div>

        <div className="info-card">
          <h2>📰 News & Highlights</h2>
          <p>Daily highlights, photos, and official announcements.</p>
        </div>
      </div>
    </div>
  );
}
