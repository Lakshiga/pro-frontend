// import React, { useState } from 'react';
// import { motion } from "framer-motion";
// import { IoMdEyeOff } from "react-icons/io";
// import { FaEye } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import axios from 'axios';
// import logo from '../Images/MatchMaster.png'; // Import your logo here
// import "../CSS/Login.css";

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState(''); // State for success message
//   const navigate = useNavigate(); // useNavigate for redirecting after login

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMessage(''); // Clear previous success message

//     try {
//       const res = await axios.post('http://localhost:4000/api/auth/login', formData);

//       const { token, role, verified } = res.data;

//       // Store the token and role in localStorage
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);

//       // Check if the user is an organizer and if they are verified
//       if (role && role.toLowerCase() === 'organizer') {
//         if (verified) {
//           setSuccessMessage('Login successful as organizer. Redirecting to your dashboard...');
//           navigate('/organizer-dashboard');
//         } else {
//           setError('Your account is awaiting admin verification.');
//         }
//       } 
//       // Check if the user is an admin
//       else if (role && role.toLowerCase() === 'admin') {
//         setSuccessMessage('Login successful as admin. Redirecting to admin dashboard...');
//         navigate('/admin-dashboard');
//       } 
//       // If the user has any other role
//       else {
//         setSuccessMessage('Login successful. Redirecting to the home page...');
//         navigate('/');
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         setError(error.response.data.message || 'Login failed. Please check your email and password.');
//       } else {
//         setError('Login failed. Please check your email and password.');
//       }
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center custom-gradient p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="card w-100" style={{ maxWidth: '28rem' }}>
//           <div className="card-header text-center">
//             <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
//             <h2 className="card-title h4 fw-bold" style={{ color: 'navy' }}>Welcome Back</h2>
//             <p className="card-text text-muted">Log in to your Match Master account</p>
//           </div>
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   id="email"
//                   name="email"
//                   placeholder="john@example.com"
//                   type="email"
//                   className="form-control"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <div className="input-group">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     className="form-control"
//                     required
//                     value={formData.password}
//                     onChange={handleInputChange}
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
//                   </button>
//                 </div>
//               </div>
//               {error && <p className="text-danger">{error}</p>}
//               {successMessage && <p className="text-success">{successMessage}</p>} {/* Success message display */}
//               <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: 'navy', color: 'white' }}>
//                 Log In
//               </button>
//             </form>
//           </div>
//           <div className="card-footer text-center">
//             <Link to="/forgot-password" className="fw-bold text-decoration-none">Forgot your password?</Link>
//             <p className="mt-2">
//               Don't have an account ?   
//               <Link to="/register" className="fw-bold text-decoration-none">  Register </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// src/pages/Login.js
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import logo from '../Images/MM logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ closeModal, setShowRegisterModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      const { token, role, verified } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'organizer') {
        if (verified) {
          toast.success('Login successful as organizer. Redirecting to your dashboard...');
          setTimeout(() => navigate('/organizer-dashboard'), 2000);
        } else {
          toast.error('Your account is awaiting admin verification.');
        }
      } else if (role === 'admin') {
        toast.success('Login successful as admin. Redirecting to admin dashboard...');
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        toast.success('Login successful. Redirecting to user dashboard...');
        setTimeout(() => navigate('/user-dashboard'), 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="shadow-lg rounded p-4"
      style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <div className="card w-100" style={{ maxWidth: '28rem', backgroundColor: 'black' }}>
        <div className="card-header text-center">
          <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
          <h2 className="card-title h4 fw-bold" style={{ color: '#CCFF00' }}>Welcome Back</h2>
          <p className="card-text" style={{ color: '#FFFFFF' }}>Log in to your Match Master account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#CCFF00' }}>Email</label>
              <input id="email" name="email" placeholder="john@example.com" type="email" className="form-control" required value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#CCFF00' }}>Password</label>
              <div className="input-group">
                <input id="password" name="password" type={showPassword ? "text" : "password"} className="form-control" required value={formData.password} onChange={handleInputChange} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ color: '#CCFF00', borderColor: '#CCFF00' }}>
                  {showPassword ? <FaEye /> : <IoMdEyeOff />}
                </button>
              </div>
            </div>
            <motion.button 
              type="submit" 
              className="btn w-100 mt-3" 
              style={{ backgroundColor: '#CCFF00', color: 'black' }}
              initial={{ scale: 0.9 }} 
              whileHover={{ scale: 1.05 }} 
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Log In
            </motion.button>         
           </form>
        </div>
        <div className="card-footer text-center">
          <p className="card-text text-white">Don't have an account?
            <button onClick={() => setShowRegisterModal(true)} className="btn btn-link text-decoration-none text-warning fw-bold">Register</button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}






// // src/pages/Login.js
// import React, { useState } from 'react';
// import { motion } from "framer-motion";
// import { IoMdEyeOff } from "react-icons/io";
// import { FaEye } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from '../Images/MM logo.jpeg';

// export default function Login({ closeModal }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await axios.post('http://localhost:4000/api/auth/login', formData);
//       const { token, role, verified } = res.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', role);

//       // Navigate based on role and verification status
//       if (role === 'organizer') {
//         if (verified) {
//           navigate('/organizer-dashboard');
//         } else {
//           setError('Your account is awaiting admin verification.');
//         }
//       } else if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else {
//         navigate('/user-dashboard');
//       }
//     } catch (error) {
//       setError('Login failed. Please check your credentials and try again.');
//     }
//   };

//   return (
//     <div className="p-4" style={{ backgroundColor: '#1a1a1a', color: '#CCFF00', borderRadius: '10px' }}>
//       <div className="text-center mb-4">
//         <img src={logo} alt="Match Master Logo" width={70} height={70} className="mb-2" />
//         <h2 className="h4 fw-bold">Welcome Back</h2>
//         <p style={{ color: '#FFFFFF' }}>Log in to your Match Master account</p>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input id="email" name="email" type="email" className="form-control" required value={formData.email} onChange={handleInputChange} />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <div className="input-group">
//             <input id="password" name="password" type={showPassword ? "text" : "password"} className="form-control" required value={formData.password} onChange={handleInputChange} />
//             <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ color: '#CCFF00', borderColor: '#CCFF00' }}>
//               {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
//             </button>
//           </div>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//         <motion.button
//           type="submit"
//           className="btn w-100 mt-3"
//           style={{ backgroundColor: '#CCFF00', color: 'black' }}
//           initial={{ scale: 0.9 }}
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           Log In
//         </motion.button>
//       </form>
//       <div className="text-center mt-3">
//         <Link to="/forgot-password" className="fw-bold text-decoration-none" style={{ color: '#CCFF00' }}>Forgot your password?</Link>
//         <p className="mt-2" style={{ color: '#FFFFFF' }}>Don't have an account? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#CCFF00' }}>Register</Link></p>
//       </div>
//     </div>
//   );
// }
