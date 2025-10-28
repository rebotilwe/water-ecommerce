import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.message) {
      alert('Please fill in the required fields: Subject and Message.');
      return;
    }

    alert('Thank you for contacting Thirsti! We’ll get back to you soon.');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact" id="contact">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Please fill in the form below and we’ll get in touch as soon as possible.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name (optional)"
            value={formData.fullName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (optional)"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject *"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Message *"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-details">
          <p><strong>Email:</strong> info@thirsti.co.za</p>
          <p><strong>Phone:</strong> +27 21 555 1234</p>
          <p><strong>Address:</strong> 45 Crystal Springs Road, Cape Town, South Africa</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
