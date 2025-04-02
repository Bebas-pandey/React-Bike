// src/components/Booking.jsx

import React, { useState } from 'react';  // Add this import
import "../components/style.css";
const Booking = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      bikeModel: '',
      date: '',
      time: '',
      message: ''
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
      alert('Bike booking request submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        bikeModel: '',
        date: '',
        time: '',
        message: ''
      });
    };
  
    return (
      <section className="booking">
        <div className="booking-overlay">
          <h2>Book Your Bike</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="bikeModel">Select Bike Model</label>
              <select 
                id="bikeModel" 
                name="bikeModel" 
                value={formData.bikeModel} 
                onChange={handleInputChange} 
                required
              >
                <option value="">Select a Model</option>
                <option value="Royal-Enfield">Royal Enfield</option>
                <option value="Ducati">Ducati</option>
                <option value="Harley-Davidson">Harley Davidson</option>
              </select>
            </div>
  
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                value={formData.time} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange} 
                required 
              />
            </div>
  
            <button type="submit" className="submit-btn">Submit Booking</button>
          </form>
        </div>
      </section>
    );
  };
  

export default Booking;
