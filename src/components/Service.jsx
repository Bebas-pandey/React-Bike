import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../components/style.css"


 
  


const serviceData = [
  {
    brand: "Royal Enfield",
    serviceImg: "https://www.royalenfield.com/node/assets/service-platform/Group.jpg",
    description: "Comprehensive servicing, engine tuning, and customization for Royal Enfield bikes."
  },
  {
    brand: "Harley-Davidson",
    serviceImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNX5v5H-Wc1drh8vHrRG8tld9DKkMzWdBVaw&s",
    description: "Expert maintenance, performance upgrades, and detailing services for Harley-Davidson models."
  },
  {
    brand: "Ducati",
    serviceImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTvtp6J1FwH0ig6OqX9AZDUiVknFWyKirDMg&s",
    description: "Precision servicing, high-performance tuning, and specialized care for Ducati motorcycles."
  }
];
const blogPosts = [
    {
      title: "The Importance of  Bike Maintenance",
      content: "Regular servicing keeps your motorcycle in peak condition, enhances safety, and extends its lifespan. Always check oil levels, brakes, and tire pressure."
    },
    {
      title: "How to Prepare Your Bike for a Long Ride",
      content: "Before a long trip, inspect your bike’s engine, chain, and tires. Ensure all fluids are topped up, and carry essential tools for emergency repairs."
    },
    {
      title: "Understanding Motorcycle Engine Tuning",
      content: "Engine tuning improves performance, fuel efficiency, and ride smoothness. Regularly clean filters and use high-quality fuel for better performance."
    }
  ];
  const testimonials = [
    {
      name: "Pramod Ghimire",
      role: "CEO, Company Inc.",
      message: "This service exceeded my expectations. The team was professional, efficient, and delivered high-quality results. Highly recommend!"
    },
    {
      name: "Sumit Thapa",
      role: "Marketing Manager, Tech Co.",
      message: "An outstanding experience from start to finish. They understood our needs and helped us achieve our goals with ease."
    },
    {
      name: "Bibek Bishwokarma",
      role: "Founder, Creative Studio",
      message: "I am truly impressed by the level of expertise and dedication. Our project was handled with care and precision."
    }
  ];

 
  

  const Service = () => {
    return (
      <div className="beb">
        {/* Service Section */}
        <div className="container1 text-center mt-5">
          <h2>
          <button className="btn btn-success ms-3">Our Services
            </button>
          </h2>
          <p>We provide premium maintenance and servicing for high-performance motorcycles.</p>
          <div className="row">
            {serviceData.map((service, index) => (
              <div className="col-md-4" key={index}>
                <h4>{service.brand} Services</h4>
                <img src={service.serviceImg} className="img-fluid mb-3" alt={`${service.brand} Service`} />
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Blog Section */}
        <div className="container2 text-center mt-5">

        <div className="container mt-5">
          <h2 className="text-center">Bike Servicing Blogs</h2>
          <div className="row">
            {blogPosts.map((blog, index) => (
              <div className="col-md-4" key={index}>
                <div className="card p-3 mb-3 shadow">
                  <h5>{blog.title}</h5>
                  <p>{blog.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        
        
    
        <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-list">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-message">"{testimonial.message}"</p>
              <p className="testimonial-author">
                - {testimonial.name}, <span className="testimonial-role">{testimonial.role}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

  



      
    </div>
    
  );
};


export default Service;
