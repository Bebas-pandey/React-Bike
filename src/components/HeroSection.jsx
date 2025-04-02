import React from "react";
import "../components/style.css"; // Import styles if needed
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const HeroSection = () => {
  return (
    <div className="container-fluid p-0">
      <div className="hero position-relative text-center">
        <img
          className="image1"
          src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/11/RE_Meteor_650.jpg?fit=1200%2C675&ssl=1"
          alt="Bike"
        />
        <img
          className="image2"
          src="https://img.onmanorama.com/content/dam/mm/en/news/business/images/2021/2/7/royal-enfield-meteor-350-1.jpg"
          alt="Bike"
        />
        <div className="hero-content position-absolute top-50 start-50 translate-middle text-white">
          <h1 className="heading-1">Create your own Happiness on Ride</h1>
          <a href="/" className="btn btn-success py-sm-3 px-sm-4 sunil">
            Explore More
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
