import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/style.css"

const FeaturesSection = () => {
  return (
    <div className="container-xxl dipika py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Left Section */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <p className="fs-5 fw-bold text-success">Why choosing us!</p>
            <h1 className="display-5 mb-4"><b>Few reasons why people choose us!</b></h1>
            <p className="mb-4">
              Choosing us for your next journey offers a host of benefits, including flexibility,
              eco-friendliness, affordability, and a more immersive travel experience. So, get ready to pedal your way to
              unforgettable memories and discover a destination from a unique perspective.
            </p>
            <button className="btn btn-success py-3 px-4" style={{ color: "black", fontSize: "larger" }}>
              Explore More
            </button>
          </div>

          {/* Right Section */}
          <div className="col-lg-6">
            <div className="row g-4 align-items-center">
              <div className="col-md-6">
                <div className="row g-4">
                  {/* 100% Satisfaction */}
                  <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                    <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                      <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: "90px", height: "90px" }}>
                        <i className="fa-solid fa-check fa-3x text-success"></i>
                      </div>
                      <h4 className="mb-0">100% Satisfaction</h4>
                    </div>
                  </div>

                  {/* Dedicated Team */}
                  <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                    <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                      <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: "90px", height: "90px" }}>
                        <i className="fa-solid fa-user fa-3x text-success"></i>
                      </div>
                      <h4 className="mb-0">Dedicated Team</h4>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modern Equipment */}
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
                <div className="text-center rounded py-5 px-4" style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}>
                  <div className="btn-square bg-light rounded-circle mx-auto mb-4" style={{ width: "90px", height: "90px" }}>
                    <i className="fa-solid fa-screwdriver-wrench fa-3x text-success"></i>
                  </div>
                  <h4 className="mb-0">Modern Equipment</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
