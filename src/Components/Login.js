import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, db } from "./firebase";
import { ref, set, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const user = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess("Login successful");
      setFormData({ email: "", password: "" });
      setErrors({});
      navigate("/Home");
    } catch (error) {
      setErrors({ auth: error.message });
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      await remove(userRef); // Remove from Realtime Database
      const user = auth.currentUser;
      await deleteUser(user); // Remove from Firebase Authentication
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const handleRegister = async (email, password) => {
    try {
      const snapshot = await get(ref(db, "users"));
      const users = snapshot.exists() ? snapshot.val() : {};
  
      const emailExists = Object.values(users).some((user) => user.email === email);
  
      if (emailExists) {
        alert("Email is already in use. Please log in or use a different email.");
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Save user data to Realtime Database
      await set(ref(db, `users/${userId}`), { email, password });
  
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  

  const handleRegisterNavigation = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        {success && <p className="success-message">{success}</p>}
        {errors.auth && <p className="error-message">{errors.auth}</p>}

        <div className={`form-group ${errors.email ? "error" : ""}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className={`form-group ${errors.password ? "error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <button type="submit" className="submit-button">Login</button>

        <p className="register-link">
          If not registered?{" "}
          <span onClick={handleRegisterNavigation} className="register-text">
            Register here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
