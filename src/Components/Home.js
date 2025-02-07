import React from "react";
import "./Home.css";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="content">
        <h1 className="fade-in">Disaster Management System</h1>
        <p className="fade-in delay">Ensuring safety and preparedness for all.</p>
        <span className="caption fade-in delay-long">"Preparedness today ensures safety tomorrow."</span>
      </div>
    </div>
  );
};

export default Home;
