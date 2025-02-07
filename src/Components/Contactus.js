import React, { useState } from "react";
import "./Contactus.css";
import { db, ref, push } from "./firebase"; // Import Firebase functions
import Navbar from './Navbar';
export default function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Firebase functionality added here
    const contactRef = ref(db, "contacts");
    push(contactRef, formData)
      .then(() => {
        alert("Your message has been sent and stored in Firebase!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("Error storing data in Firebase:", error);
        alert("Failed to send your message. Please try again.");
      });
  };

  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="form-input"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="form-input"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="form-input"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="form-textarea"
          required
        ></textarea>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
    </>
  );
}
