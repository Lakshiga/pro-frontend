import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../Images/MM logo.jpeg';
import Layout from '../Components/Layout.js';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await axios.post('http://localhost:4000/api/contact', formData);
      setSuccessMessage('Your message has been sent successfully. We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <Layout>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        padding: '1rem',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <div style={{
            width: '100%',
            maxWidth: '28rem',
            backgroundColor: 'black',
            borderRadius: '0.375rem',
            boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(204, 255, 0, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.3)'}
          >
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid #CCFF00',
              textAlign: 'center',
            }}>
              <img src={logo} alt="Match Master Logo" style={{
                width: '60px',
                height: '60px',
                marginBottom: '0.5rem',
              }} />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#CCFF00',
                marginBottom: '0.5rem',
              }}>Contact Us</h2>
              <p style={{ color: '#d4d4d4' }}>We'd love to hear from you</p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="name" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#d4d4d4',
                  }}>Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid #CCFF00',
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#d4d4d4',
                  }}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid #CCFF00',
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="message" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#d4d4d4',
                  }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '0.25rem',
                      border: '1px solid #CCFF00',
                      backgroundColor: 'black',
                      color: 'white',
                      minHeight: '100px',
                    }}
                  ></textarea>
                </div>
                {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
                {successMessage && <p style={{ color: '#CCFF00', marginBottom: '1rem' }}>{successMessage}</p>}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#CCFF00',
                    color: 'black',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
            <div style={{
              padding: '1rem',
              borderTop: '1px solid #CCFF00',
              textAlign: 'center',
              backgroundColor: 'black',
            }}>
              <Link to="/" style={{
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#CCFF00',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#d4d4d4'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#CCFF00'}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}