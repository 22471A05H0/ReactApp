import React, { useState, useEffect } from "react";
import { db, ref, push, set, update, remove, onValue } from "./firebase"; // Import Realtime Database functions
import "./Donate.css";
import Navbar from './Navbar';
export default function Donate() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    donationType: { food: false, clothes: false, others: false },
  });

  const [errors, setErrors] = useState({});
  const [donations, setDonations] = useState([]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.includes("@")) newErrors.email = "Valid email is required.";
    if (formData.phone.length < 10) newErrors.phone = "Phone number must be at least 10 digits.";
    return newErrors;
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        donationType: { ...formData.donationType, [name]: checked },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const donationsRef = ref(db, "donations");
      const newDonationRef = push(donationsRef); // Add a new donation entry
      await set(newDonationRef, formData);
      alert("Donation data submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        donationType: { food: false, clothes: false, others: false },
      });
    } catch (error) {
      console.error("Error adding donation data:", error);
    }
  };

  // Fetch Donations (Real-time)
  const fetchDonations = () => {
    const donationsRef = ref(db, "donations");
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setDonations(formattedData);
    });
  };

  // Update Donation
  const handleUpdate = async (id) => {
    const newName = prompt("Enter the new name:");
    if (newName) {
      try {
        const donationRef = ref(db, `donations/${id}`);
        await update(donationRef, { name: newName });
        alert("Donation data updated!");
      } catch (error) {
        console.error("Error updating donation:", error);
      }
    }
  };

  // Delete Donation
  const handleDelete = async (id) => {
    try {
      const donationRef = ref(db, `donations/${id}`);
      await remove(donationRef);
      alert("Donation data deleted!");
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  // Fetch donations on component mount
  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="donate-container">
      <h1 className="donate-title">Donate to Help People</h1>

      {/* Image Slider Section */}
      <div className="image-slider">
        <div className="image-slide">
          <img src="images/pexels-rdne-6646884.jpg" alt="Helping Hands" className="slider-image" />
        </div>
        <div className="image-slide">
          <img src="images/pexels-gustavo-fring-7156159.jpg" alt="Community Support" className="slider-image" />
        </div>
        {/* Add more images as needed */}
      </div>

      {/* Donation Form Section */}
      <form className="donate-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-input"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="form-input"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="food"
              checked={formData.donationType.food}
              onChange={handleChange}
            />
            Food
          </label>
          <label>
            <input
              type="checkbox"
              name="clothes"
              checked={formData.donationType.clothes}
              onChange={handleChange}
            />
            Clothes
          </label>
          <label>
            <input
              type="checkbox"
              name="others"
              checked={formData.donationType.others}
              onChange={handleChange}
            />
            Others
          </label>
        </div>

        <button type="submit" className="donate-button">
          Donate
        </button>
      </form>
    </div>
    </>
  );
}
