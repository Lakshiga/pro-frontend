import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IoMenu } from 'react-icons/io5';
import logo from '../Images/MatchMaster.png';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle navigation to the home page and then scroll to section
  const handleNavigation = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home page first if not already there
      navigate('/');
    }
    setTimeout(() => {
      // Scroll to the section after navigating to home
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure navigation has completed
  };

  return (
    <div>
      {/* Navbar */}
      <header
        className="px-5 py-2 d-flex align-items-center border-bottom sticky-top shadow-sm"
        style={{ backgroundColor: '#fff', borderColor: '#CCFF00' }}
      >
        {/* Logo */}
        <a className="d-flex align-items-center justify-content-center text-decoration-none" href="/">
          <img src={logo} alt="Match Master Logo" width={75} height={70} className="me-1" />
        </a>

        {/* Centered Navigation Links */}
        <nav className={`ms-auto ${isMenuOpen ? 'd-flex' : 'd-none'} d-md-flex gap-4`}>
          {['Home', 'Features', 'Sports', 'Testimonials', 'Pricing'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavigation(item.toLowerCase())}
              className="text-decoration-none fw-bold d-flex align-items-center btn p-0"
              style={{ color: '#000000', background: 'none', border: 'none' }}
            >
              {item}
              <AiOutlineArrowRight
                style={{ fontSize: '14px', color: '#00cc00', marginLeft: '5px', transform: 'rotate(-45deg)' }}
              />
            </button>
          ))}
        </nav>

        {/* Login Button */}
        <a href="/login" className="btn w-15 py-2 ms-5 fw-bold" style={{ backgroundColor: '#CCFF00', color: '#000000' }}>
          Log In
        </a>

        {/* Mobile Menu Icon */}
        <button className="btn d-md-none ms-2" style={{ color: '#CCFF00' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <IoMenu />
        </button>
      </header>

      {/* Page Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(204, 255, 0, 0.1)', padding: '24px 0', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', textAlign: 'center' }}>
            © {new Date().getFullYear()} Match Master. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
