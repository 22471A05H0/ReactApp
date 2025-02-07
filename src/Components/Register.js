import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import from firebase/auth
import { auth, db } from "./firebase"; // Import auth and db from your firebase.js file
import { ref, set } from "firebase/database"; // Import Firebase Database functions
import "./Register.css";
import { Link,useNavigate } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
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
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid;

      // Save additional user details to the database
      await set(ref(db, `users/${userId}`), {
        username: formData.username,
        email: formData.email,
      });

      setSuccess("Registration successful");
      setFormData({ email: "", password: "", username: "" });
      setErrors({});
      navigate("/");
    } catch (error) {
      setErrors({ auth: error.message });
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        {success && <p className="success-message">{success}</p>}
        {errors.auth && <p className="error-message">{errors.auth}</p>}

        <div className={`form-group ${errors.username ? "error" : ""}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

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

        <button type="submit" className="submit-button">Register</button>
        <div className="additional-links">
          <p>Already a member? <Link to="/">Login here</Link></p>
          <p>Admin Login <Link to="/Admin">here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
