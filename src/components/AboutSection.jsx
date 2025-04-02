import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AboutSection = () => {
    return (
        <div className="container-xxl dipika py-5 aboutkobackground">
            <div className="container">
                <div className="row g-5 align-items-end">

                    {/* Left Image */}
                    <div className="col-lg-3 col-md-3 wow fadeInUp" data-wow-delay="0.1s">
                        <img
                            className="img-4 rounded"
                            data-wow-delay="0.1s"
                            src="https://images.firstpost.com/wp-content/uploads/2021/09/royal-enfield-classic-350-launched-in-india.jpg?im=FitAndFill=(596,336)"
                            
                            alt="Bikers"
                            
                        />
                        <img
                            className="img-4 rounded"
                            data-wow-delay="0.1s"
                            src="https://images.firstpost.com/wp-content/uploads/2021/09/royal-enfield-classic-350-launched-in-india.jpg?im=FitAndFill=(596,336)"
                            
                            alt="Bikers"
                            
                        />
                    </div>

                    {/* Middle Content */}
                    <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
                        <h1 className="display-1 text-success mb-0">25</h1>
                        <p className="text-success mb-4">Years of Experience</p>
                        <h1 className="display-5 mb-4">We Make Your Ride Like A Roller-Coaster</h1>
                        <p className="mb-4">
                            They are the principal means of transportation in many regions. They also provide
                            a popular form of recreation, and have been adapted for use as children's toys,
                            general fitness, military and police applications, courier services, bicycle racing,
                            and bicycle stunts.
                        </p>
                        <a
                            className="btn btn-success py-3 px-4"
                            style={{ "--bs-btn-hover-bg": "floralwhite", color: "black", fontSize: "larger" }}
                            href="/"
                        >
                            Explore More
                        </a>
                    </div>

                    {/* Right Side - Award & Team Info */}
                    <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                        <div className="row g-5">

                            {/* Award Section */}
                            <div className="col-12 col-sm-6 col-lg-12">
                                <div className="border-start ps-4">
                                    <i className="fa-solid fa-award fa-3x text-success"></i>
                                    <h4 className="mb-3">Award Winning</h4>
                                    <span>Best Bikers of the Year, Nobel Prize in Hospitality</span>
                                </div>
                            </div>

                            {/* Dedicated Team Section */}
                            <div className="col-12 col-sm-6 col-lg-12">
                                <div className="border-start ps-4">
                                    <i className="fa-solid fa-user fa-3x text-success mb-3"></i>
                                    <h4 className="mb-3">Dedicated Team</h4>
                                    <span>We have dedicated trainers to provide the best riding experiences</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutSection;

