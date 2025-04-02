import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/style.css"

const TopFeatures = () => {
  return (
    <div className="container-fluid top-feature py-5 pt-lg-0">
      <div className="container py-5 pt-lg-0">
        <div className="row gx-0">
          {/* No Hidden Cost Feature */}
          <div
            className="col-lg-4 wow fadeIn"
            data-wow-delay="0.1s"
            style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeIn" }}
          >
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: "160px" }}>
              <div className="d-flex">
                <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                <div className="ps-4">
                  <h4>No Hidden Cost</h4>
                  <span>No more costs are needed for the ride</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Team Feature */}
          <div
            className="col-lg-4 wow fadeIn"
            data-wow-delay="0.1s"
            style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeIn" }}
          >
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: "160px" }}>
              <div className="d-flex">
                <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="ps-3">
                  <h4>Dedicated Team</h4>
                  <span>Best bikes are available here</span>
                </div>
              </div>
            </div>
          </div>

          {/* 24/7 Available Feature */}
          <div
            className="col-lg-4 wow fadeIn"
            data-wow-delay="0.1s"
            style={{ visibility: "visible", animationDelay: "0.1s", animationName: "fadeIn" }}
          >
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: "160px" }}>
              <div className="d-flex">
                <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="ps-3">
                  <h4>24/7 Available</h4>
                  <span>You can book anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFeatures;
