import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
const Register = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: ""
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert("Registration Successful!");
      setFormData({ name: "", email: "", password: "" }); // Reset form
    };
  
    return (
      <section 
        className="login-container d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('https://png.pngtree.com/background/20230519/original/pngtree-motorcycle-rider-riding-down-an-autumn-highway-with-trees-in-the-picture-image_2669192.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh"
        }}
      >
        <div className="login-box p-5 shadow" style={{ maxWidth: "500px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
  
            <button type="submit" className="submit-btn">Register</button>
          </form>
          <div className="text-center mt-3">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </section>
    );
  };
  
  export  default Register ;