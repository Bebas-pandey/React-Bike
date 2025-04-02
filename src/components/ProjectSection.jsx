import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/style.css"

const ProjectSection = () => {
  return (
    <div className="container-xxl dipika py-5">
    <div className="container">
      {/* Title */}
      <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s">
        <p className="fs-5 fw-bold text-success">Our Bikes</p>
        <h1 className="display-5 mb-5">Some Of Our<br /> Wonderful Bikes</h1>
      </div>

      {/* Filter Buttons */}
      <div className="row wow fadeInUp" data-wow-delay="0.3s">
        <div className="col-12 text-center">
          <ul className="list-inline rounded mb-5" id="portfolio-filters">
            <li className="mx-2 all-btn" style={{ color: "black", fontSize: "larger" }}>All Bikes</li>
            <li className="mx-2" style={{ color: "black", fontSize: "larger" }}>Available Bikes</li>
            <li className="mx-2" style={{ color: "black", fontSize: "larger" }}>Upcoming Bikes</li>
          </ul>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-section py-5">
        <div className="row rounded">
          <div className="row mb-4">
            {/* Image 1 */}
            <div className="col-sm-4">
              <img
                src="https://images.ctfassets.net/x7j9qwvpvr5s/2zObufbN3202W383oubfdU/0309141d4a0bf38fb8ce27e34dba849e/Ducati-Diavel-V4-MY23-overview-gallery-1920x1080-01.jpg"
                className="img-fluid"
                alt="Ducati Diavel V4"
              />
            </div>

            {/* Image 2 */}
            <div className="col-sm-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlvx08s4DVjj8mhwkSnFLWRazBYkYBPDvGEA&usqp=CAU"
                className="img-fluid"
                alt="Sporty red and black bike"
              />
            </div>

            {/* Image 3 */}
            <div className="col-sm-4">
              <img
                src="https://w0.peakpx.com/wallpaper/390/31/HD-wallpaper-harley-davidson-bike-clouds-cold-motocycle-old-road-sky.jpg"
                className="img-fluid"
                alt="Harley Davidson on an open road"
              />
            </div>

            {/* Image 4 */}
            <div className="col-sm-4">
              <img
                src="https://cdn.wallpapersafari.com/38/34/EVPCw5.jpg"
                className="img-fluid"
                alt="Matte black cruiser bike"
              />
            </div>

            {/* Image 5 */}
            <div className="col-sm-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lj1UC-6zHnB1ZuuKn8GYEyEMdFNfNzFQ2Q&usqp=CAU"
                className="img-fluid"
                alt="Adventure motorcycle in a scenic location"
              />
            </div>

            {/* Image 6 */}
            <div className="col-sm-4">
              <img
                src="https://images.ctfassets.net/x7j9qwvpvr5s/16GItSEFvXzd45FwcLIejJ/9a313cbb35489cf40d6a16d75aa1fb71/Ducati-Hypermotard-950-RVE-MY24-overview-gallery-906x510-01.jpg?fm=webp&q=90"
                className="img-fluid"
                alt="Ducati Hypermotard 950 RVE"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProjectSection;
