
import React, { useState } from "react";
import "./settings.css";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [email] = useState(user?.email || "");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="settings-container">
      <h1 className="settings-title">⚙️ Settings</h1>


      <div className="settings-card">
        <h2>Profile Information</h2>

        <div className="setting-row">
          <label>Email:</label>
          <input type="text" value={email} disabled />
        </div>
      </div>

      
      <div className="settings-card">
        <h2>Notifications</h2>

        <div className="setting-row">
          <label>Enable Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>
      </div>

      
      <div className="settings-card">
        <h2>Change Password</h2>

        <div className="setting-row">
          <label>New Password:</label>
          <input type="password" placeholder="Enter new password" />
        </div>

        <div className="setting-row">
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm password" />
        </div>

        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
}
