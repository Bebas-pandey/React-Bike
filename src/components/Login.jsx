import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    setFormData({ email: "", password: "" });
    setIsLoggedIn(true); // Show success message
  };

  return (
    <section 
      className="login-container d-flex align-items-center justify-content-center flex-column text-center"
      style={{
        backgroundImage: "url('https://previews.123rf.com/images/avtorpainter/avtorpainter2103/avtorpainter210300001/166200144-burning-skull-evil-person-skull-biker-sits-on-a-bike-skull-riding-a-motorcycle-tattoo-biker.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white"
      }}
    >
      {!isLoggedIn ? (
        <div className="login-box p-5 shadow" style={{ maxWidth: "500px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "10px", color: "black" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
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

            <button type="submit" className="submit-btn">Login</button>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>
        </div>
      ) : (
        <h1 className="congrats-text " style={{color:"blue"}}>
          🎉 Congratulations! You have successfully logged in!
        </h1>
      )}
    </section>
  );
};

export default Login;
