import React, { useState } from "react";
import ParentComponent from "./Parentcomponent"; // Import ParentComponent
import './Admin.css'; // Import Admin styles
import Navbar from './Navbar';
const Admin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if admin is logged in
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Mock authentication logic
    if (formData.email === "admin@admin.com" && formData.password === "admin123") {
      setIsLoggedIn(true);
      setError(null);
    } else {
      setError("Invalid email or password!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({ email: "", password: "" });
  };

  if (isLoggedIn) {
    return <ParentComponent onLogout={handleLogout} />;
  }

  return (
    <>
    <Navbar/>
    <div className="admin-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Admin;
