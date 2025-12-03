import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Step 1: Get existing users or empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Step 2: Check if email already exists
    const userExists = existingUsers.find((u) => u.email === email);

    if (userExists) {
      alert("This email is already registered!");
      return;
    }

    // Step 3: Create new user
    const newUser = { email, password };

    // Step 4: Add new user to array
    existingUsers.push(newUser);

    // Step 5: Save updated array to localStorage
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Enter Email"
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <Link className="auth-link" to="/login">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
