import React from "react";
import './About.css';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import './Dashboard';
import Dashboard from "./Dashboard";
export default function About() {
  const navigateToDashboard = () => {
    // Update this path to the actual URL where Dashboard.js is accessible
    window.location.href = "/Dashboard";
  };
  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Introduction Section */}
        <div id="introduction" className="introduction-section">
          <h1 className="introduction-title">Welcome to Disaster Management System</h1>
          <p className="introduction-description">
            We are committed to building resilient communities and saving lives. Through the integration
            of technology, community collaboration, and expertise, we aim to minimize the impact of disasters 
            and ensure swift recovery. Together, we can make a difference.
          </p>
        </div>

        {/* About Section */}
        <h1 id="about" className="about-title">About Disaster Management</h1>
        <p className="about-description">
          Disaster Management focuses on preparing, responding, and recovering from disasters in the most
          effective way possible. Our system is designed to provide communities with the tools they need
          to face emergencies confidently and reduce risks.
        </p>

        {/* Features Section */}
        <div id="features" className="features-section">
          <h2 className="features-title">Key Features</h2>
          <ul className="features-list">
            <li className="feature-item">Real-time alerts for faster decision-making</li>
            <li className="feature-item">Efficient resource allocation for disaster response</li>
            <li className="feature-item">Advanced risk assessment tools for early detection</li>
            <li className="feature-item">Interactive disaster training modules for communities</li>
          </ul>
        </div>

        {/* Statistics Section */}
        <div id="statistics" className="statistics-section">
          <h2 className="statistics-title">Our Impact in Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">500+</h3>
              <p className="stat-description">Lives Saved</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">200+</h3>
              <p className="stat-description">Communities Trained</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">100+</h3>
              <p className="stat-description">Emergency Resources Deployed</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-description">Disasters Managed</p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div id="gallery" className="images-section">
          <h2 className="images-title">Gallery</h2>
          <p className="gallery-description">
            Explore our work in action through these impactful moments.
          </p>
          <div className="image-grid">
            <img src="images/DisasterRS.jpg" alt="Disaster Relief Efforts" className="grid-image" />
            <img src="images/EmergencyResponseTeam.jpg" alt="Emergency Response Team" className="grid-image" />
            <img src="images/floodManagement.jpg" alt="Flood Management" className="grid-image" />
            <img src="images/communitytraining.jpg" alt="Community Training" className="grid-image" />
            <img src="images/pexels-pixabay-47863.jpg" alt="Rescue Operations" className="grid-image" />
            <img src="images/pexels-roger-brown-3435524-5125690.jpg" alt="Disaster Planning" className="grid-image" />
          </div>
        </div>

        {/* Mission Section */}
        <div id="mission" className="mission-section">
          <h2 className="mission-title">Our Mission</h2>
          <p className="mission-description">
            Our mission is to empower individuals and communities with the knowledge, resources, and tools 
            they need to reduce the risks and impacts of disasters. Together, we aim to build a safer and 
            more prepared world for future generations.
          </p>
        </div>
        <Dashboard/>
      </div>
    </>
  );
}
