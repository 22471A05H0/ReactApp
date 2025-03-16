import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './Navbar.css';
import Home from './Home';
import About from './About';
import Donate from './Donate';
import Register from './Register';
import Login from './Login';
import Contactus from './Contactus';
import Admin from './Admin';
import ParentComponent from "./Parentcomponent";
import Dashboard from "./Dashboard";
function AlignmentExample() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
        <div className="navbar">
          <img
            src="images/dmslogo.jpg"
            className="logo"
            width={70}
            height={60}
            alt="Logo not found"
          />
          <button className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </button>
          <nav>
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
              <li><Link to="/Home">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Donate">Donate</Link></li>
              <li><Link to="/Register">Register</Link></li>
              <li><Link to="/Contactus">Contactus</Link></li>
              <li><Link to="/Admin">Admin</Link></li>
            </ul>
          </nav>
        </div>
      {/*  <div className="content">
         <Routes>
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Donate" element={<Donate />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Parent" element={<ParentComponent />} />
          </Routes> 
        </div>*/}
    
    </>
  );
}

export default AlignmentExample;
