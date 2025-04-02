import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/style.css"

const Footer = () => {
  return (
    <footer id="footer" className="footer text-center p-3">
      <div className="row">
        <ul className="list-unstyled list-social d-flex justify-content-center gap-3">
          <li>
            <a
              href="https://www.facebook.com/bebas.pandey.5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/BebasPandey"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/bebaspandey/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/bebaspandey" // Add actual LinkedIn URL
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </li>
        </ul>
        <p>© 2022-2023, All Rights Reserved</p>
        <p>Designed by: <b>Bebas Pandey</b></p>
      </div>
    </footer>
  );
};

export default Footer;
