import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/style.css"

const CallToAction = () => {
  return (
    <div id="call-to-action" className="container-fluid dipika dark-overlay mt-5 p-5">
      <div className="container">
        <div className="bebas row">
          <div className="col-lg-3 col-md-4 col-sm-3 col-4 text-white">
            <h2><b>1234</b></h2>
            <span><b>Happy Clients</b></span>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-3 col-4 text-white">
            <h2><b>1234</b></h2>
            <span><b>Bikes Completed</b></span>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-3 col-4 text-white">
            <h2><b>1234</b></h2>
            <span><b>Dedicated Staff</b></span>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-3 col-4 text-white">
            <h2><b>1234</b></h2>
            <span><b>Awards Achieved</b></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
