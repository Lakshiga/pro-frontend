import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Images/MM logo.jpeg';
import { Link } from 'react-router-dom';

export default function Register({ closeModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      role: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.username || !formData.email || !formData.password || !formData.role) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setFormData({ username: '', email: '', password: '', role: '' });
  
      // Display the success toast
      toast.success('Registration successful!');
  
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page after the success message
      }, 2000); // Delay of 2 seconds to give time for the toast to appear
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'An error occurred during registration');
      } else {
        toast.error('An error occurred during registration');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="shadow-lg rounded p-4"
      style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
    >
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />


      <div className="card w-100" style={{ maxWidth: '28rem', backgroundColor: 'black' }}>
        <div className="card-header text-center">
          <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
          <h2 className="card-title h4 fw-bold" style={{ color: '#CCFF00' }}>Create an Account</h2>
          <p className="card-text" style={{ color: '#FFFFFF' }}>Enter your details to register for Match Master</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label" style={{ color: '#CCFF00' }}>Name</label>
              <input 
                id="name" 
                name="username" 
                placeholder="John Doe" 
                className="form-control" 
                required 
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#CCFF00' }}>Email</label>
              <input 
                id="email" 
                name="email" 
                placeholder="example@gmail.com" 
                type="email" 
                className="form-control" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#CCFF00' }}>Password</label>
              <div className="input-group">
                <input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  required 
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button 
                  type="button" 
                  className="btn btn-outline-secondary" 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{ color: '#CCFF00', borderColor: '#CCFF00' }}
                >
                  {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label" style={{ color: '#CCFF00' }}>Select Role</label>
              <select 
                id="role" 
                name="role" 
                className="form-select" 
                required 
                value={formData.role}
                onChange={handleRoleChange}
              >
                <option value="">Choose role...</option>
                <option value="organizer">Organizer</option>
                <option value="umpire">Umpire</option>
                <option value="player">Player</option>
              </select>
            </div>
            <motion.button
              type="submit"
              className="btn w-100 mt-3"
              style={{ backgroundColor: '#CCFF00', color: 'black' }}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Register
            </motion.button>
          </form>
        </div>
        <div className="card-footer text-center" style={{ color: 'white' }}>
              <small className="text-white"> By registering, you agree to our <Link to="/terms-of-service" className="text-decoration-none" style={{ color: '#CCFF00' }}>Terms of Service</Link> and <Link to="/privacy-policy" className="text-decoration-none" style={{ color: '#CCFF00' }}>Privacy Policy</Link>
              </small>
        </div>
      </div>
    </motion.div>
  );
}
