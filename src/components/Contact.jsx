// src/components/Contact.jsx

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    alert('Form submitted!');
    // Here, you can handle form submission logic like sending the data to a backend or API
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <div className="contact-details">
        <p>If you have any questions, feel free to reach out to us!</p>
        <ul>
          <li><strong>Address:</strong> Tilottama-3-janakinagar,Rupandehi</li>
          <li><strong>Phone:</strong> 9846690222</li>
          <li><strong>Email:</strong> bebaspandey9@gmail.com</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
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
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
