import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../components/style.css";

const BikersZone = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="container-fluid bg-dark text-light px-0 py-2">
        <div className="row gx-0 d-none d-lg-flex" style={{ display: "flex" }}>
          <div className="col-lg-7 px-5 text-start">
            <div className="h-100 d-inline-flex align-items-center me-4">
              <i className="bi bi-telephone me-2"></i>
              <span>+977-9846690222</span>
            </div>
            <div className="h-100 d-inline-flex align-items-center">
              <i className="bi bi-envelope me-2"></i>
              <span>bebaspandey9@gmail.com</span>
            </div>
          </div>
          <div className="col-lg-5 px-5 text-end">
            <span style={{color:"black",marginRight:"5px"}}>Follow us:</span>
            <ul className="list-unstyled list-social d-inline-flex mx-n2">
              <li><a href="https://www.facebook.com/bebas.pandey.5"><i className="bi bi-facebook" style={{marginRight:"5px"}}></i></a></li>
              <li><a href="https://twitter.com/BebasPandey"><i className="bi bi-twitter"style={{marginRight:"5px"}}></i></a></li>
              <li><a href="https://www.instagram.com/bebaspandey/"><i className="bi bi-instagram"style={{marginRight:"5px"}}></i></a></li>
              <li><a href="/"><i className="bi bi-linkedin"style={{marginRight:"5px"}}></i></a></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h1 className="m-0">Bikers Zone</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Service
                </Link>
              </li>


              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none" }} // Removes button styling
                >
                  Brands
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/royal-enfield">Royal-Enfield</Link></li>
                  <li><Link className="dropdown-item" to="/ducati">Ducati</Link></li>
                  <li><Link className="dropdown-item" to="/harley-davidson">Harley-Davidson</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/booking">
                  Booking
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                 <button className="lbtn">Login</button> 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </div>

  );
};

export default BikersZone;
