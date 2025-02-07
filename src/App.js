import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Donate from './Components/Donate';
import Register from './Components/Register';
import Login from './Components/Login';
import Contactus from './Components/Contactus';
import Admin from './Components/Admin';
import ParentComponent from "./Components/Parentcomponent";
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Donate" element={<Donate />} />
            <Route path="/Register" element={<Register />} />
           
            <Route path="/Contactus" element={<Contactus />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
