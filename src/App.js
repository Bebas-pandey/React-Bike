import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import BikersZone from "./components/BikersZone";
import HeroSection from "./components/HeroSection";
import TopFeatures from './components/Top-features';
import AboutSection from './components/AboutSection';
import CallToAction from './components/CallToAction';
import FeaturesSection from './components/FeaturesSection';
import ProjectSection from './components/ProjectSection';
import Footer from './components/Footer';
import RoyalEnfield from "./components/RoyalEnfield";
import Ducati from "./components/Ducati";
import HarleyDavidson from "./components/HarleyDavidson";
import Service from "./components/Service";
import Contact from "./components/Contact";
import Booking from "./components/Booking";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Navbar & Main UI */}
        <BikersZone />
        

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<>
            
            <HeroSection/>
            <TopFeatures />
            <AboutSection />
            <CallToAction />
            <FeaturesSection />
            <ProjectSection />
          
            
            
          </>} />
        
          
          <Route path="/royal-enfield" element={<RoyalEnfield />} />
          <Route path="/ducati" element={<Ducati />} />
          <Route path="/harley-davidson" element={<HarleyDavidson />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
         

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
