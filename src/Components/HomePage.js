import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoCalendarNumberSharp } from "react-icons/io5";
import { FaUsersLine, FaChess, FaDribbble } from "react-icons/fa6";
import { FaFacebook, FaTwitter, FaInstagram , FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import { LuAward } from "react-icons/lu";
import { FaRegStar, FaArrowRightLong } from "react-icons/fa6";
import { LiaTableTennisSolid } from "react-icons/lia";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineArrowRight } from 'react-icons/ai'; // Use the right arrow
import { motion } from 'framer-motion';
import { Modal } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../Images/new MM logo.png';


export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // Unified state for modal type (login or register)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openLoginModal = () => setActiveModal('login');
  const openRegisterModal = () => setActiveModal('register');
  const closeModal = () => setActiveModal(null); // Close any modal
  

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#fff', color: '#0A2472' }}>
      <header className="px-5 py-2 d-flex align-items-center border-bottom sticky-top shadow-sm" style={{ backgroundColor: '#f1f1f1', borderColor: '#CCFF00' }}>
        {/* Logo */}
        <a
  className="d-flex align-items-center justify-content-center text-decoration-none"
  href="#"
>
  <img
    src={logo}
    alt="Match Master Logo"
    width={95}
    height={70}
    className="me-1"
    style={{
      transform: 'scale(2.0)', // Adjust scale to zoom the logo
    }}
  />
</a>


   {/* Centered Navigation Links */}
<nav className={`ms-auto ${isMenuOpen ? 'd-flex' : 'd-none'} d-md-flex gap-4`}>
  {['Home', 'Features', 'Sports', 'Testimonials', 'Pricing'].map((item) => (
    <a
      key={item}
      onClick={(e) => {
        e.preventDefault();
        const section = document.getElementById(item.toLowerCase());
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className="text-decoration-none fw-bold d-flex align-items-center"
      style={{
        color: '#000000',
        cursor: 'pointer',
        transition: 'transform 0.3s ease', // Smooth transition for zoom effect
      }}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Zoom in on hover
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset scale on hover out
    >
      {item}
      <AiOutlineArrowRight
        style={{
          fontSize: '14px',
          color: '#0A2472',
          marginLeft: '5px',
          transform: 'rotate(-30deg)',
        }}
      />
    </a>
  ))}
</nav>

{/* Login Button */}
<button
  onClick={openLoginModal}
  className="btn w-15 py-2 ms-5 fw-bold"
  style={{
    backgroundColor: '#000000',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'transform 0.3s ease', // Smooth transition for zoom effect
  }}
  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')} // Zoom in on hover
  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')} // Reset scale on hover out
>
  Log In
</button>


        {/* Mobile Menu Icon */}
        <button className="btn d-md-none ms-2" style={{ color: '#000000' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <IoMenu />
        </button>
      </header>

      {/* Login Modal */}
      <Modal show={activeModal === 'login'} onHide={closeModal} centered>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', padding: '0' }}>
          <Login closeModal={closeModal} setShowRegisterModal={openRegisterModal} />
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={activeModal === 'register'} onHide={closeModal} centered>
        <Modal.Body style={{ backgroundColor: '#1a1a1a', padding: '0' }}>
          <Register closeModal={closeModal} />
        </Modal.Body>
      </Modal>

      <main className="flex-grow-1">
        
      <section
  id="home"
  style={{position: "relative",height: "600px", overflow: "hidden", display: "flex", alignItems: "center",}}  >

      {/* Background Video */}
  <video autoPlay loop muted playsInline src="/blue.mp4" style={{   position: "absolute",top: 0,left: 0,width: "100%",height: "100%",objectFit: "cover",zIndex: 0, }}/>

      {/* Overlay for dimming effect */}
      <div style={{ position: "absolute", top: 0, left: 0,right: 0,bottom: 0,backgroundColor: "rgba(0, 0, 0, 0.4)",zIndex: 0, }}/>

      {/* Animated Background Elements */}
      <div style={{ position: "absolute", top: 0, left: 0,right: 0,bottom: 0,overflow: "hidden",zIndex: 1,}} >

        {/* Diagonal Light Effect */}
        <motion.div initial={{ opacity: 0 }}animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{duration: 4,repeat: Infinity,ease: "easeInOut",}}
          style={{position: "absolute",top: "-50%",left: "0", width: "200%", height: "80%", background:"linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)", transform: "rotate(-45deg)", transformOrigin: "0% 0%",}}/>

        {/* Animated Wave */}
        <svg style={{position: "absolute",left: 0, top: 0, width: "100%", height: "80%", opacity: 0.1, }} viewBox="0 0 800 600">
          <motion.path d="M -100 300 Q 150 100 400 300 T 900 300" fill="none" stroke="#0A2472"strokeWidth="2"initial={{ pathLength: 0, opacity: 0 }}animate={{  pathLength: [0, 1], opacity: [0.2, 0.5, 0.2],  pathOffset: [0, 1],}}
            transition={{duration: 5,repeat: Infinity,ease: "easeInOut", }}/>
          <motion.path d="M -100 350 Q 150 150 400 350 T 900 350" fill="none"stroke="#0A2472"strokeWidth="2"initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0.2, 0.5, 0.2], pathOffset: [0, 1], }}
            transition={{ duration: 5, delay: 0.5,repeat: Infinity,ease: "easeInOut",}} />
        </svg>
      </div>

      <div className="container"
        style={{ maxWidth: "1200px",margin: "0 auto",padding: "120px 20px",position: "relative", zIndex: 2,}}>
        <div className="row align-items-center">
          <motion.div className="col-lg-6"initial={{ opacity: 0, x: -50 }}animate={{ opacity: 1, x: 0 }}transition={{ duration: 0.8 }} ><span
           style={{display: "block",fontSize: "14px", textTransform: "uppercase",letterSpacing: "2px",marginBottom: "16px",color: "#ffffff",fontWeight: "bold",}}>PROFESSIONAL MATCH MANAGEMENT</span>
            <motion.h1
              style={{fontSize: "72px",fontWeight: "900",lineHeight: 1.1, marginBottom: "30px", color: "#ffffff", }} >Transform with{" "}
              <motion.span
                animate={{color: ["#ffffff"], }}
                transition={{duration: 3,repeat: Infinity,ease: "easeInOut",}}
                style={{ display: "block", fontSize: "72px", }}> Sports Management
              </motion.span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}transition={{ delay: 0.3 }}
             style={{fontSize: "20px",color: "#ffffff", marginBottom: "40px",lineHeight: 1.6,maxWidth: "500px",}}>
              From organizing tournaments to tracking scores, Match Master
              streamlines your entire sports management process.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}transition={{ delay: 0.6 }} className="d-flex gap-3">
              <motion.a href="/register" whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(204, 255, 0, 0.2)",border: "2px solid #ffffff" }} whileTap={{ scale: 0.95 }} className="btn" style={{ padding: "15px 40px", backgroundColor: "#0A2472", color: "#ffffff", borderRadius: "30px", fontWeight: "600", fontSize: "18px",border: "2px solid #ffffff" }}>
                Get Started
              </motion.a>
              <motion.a href="#features"whileHover={{  scale: 1.05,  backgroundColor: "rgba(0, 0, 0, 0.05)",}}whileTap={{ scale: 0.95 }}className="btn"
                style={{padding: "15px 40px",border: "2px solid #ffffff",color: "#ffffff", borderRadius: "30px", fontWeight: "600", fontSize: "18px" }}>
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div  className="col-lg-6"  initial={{ opacity: 0, x: 50 }}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.8 }}  style={{ position: "relative" }} >
            {/* Light Effect Behind Image */}
            <motion.div animate={{scale: [1, 1.1, 1],opacity: [0.3, 0.6, 0.3],}} transition={{duration: 4,repeat: Infinity,ease: "easeInOut",}} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "140%",  height: "140%", background:   "radial-gradient(circle, rgba(204, 255, 0, 0.15) 0%, transparent 70%)", filter: "blur(40px)", }} />

            {/* Trainer Image with Container */}
            <div style={{position: "relative",overflow: "hidden",  borderRadius: "20px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)", }}>
              <motion.div initial={{ scale: 1.2 }} animate={{ scale: 1 }}  transition={{ duration: 0.8 }} style={{   position: "relative",  zIndex: 2,  }} >
                <img src="/Pasted image (2).png" alt="Professional Trainer"
                  style={{ width: "110%", height: "110%", display: "block",paddingBottom:"10px"
                  }}/>
              </motion.div>

              {/* Animated Gradient Overlay */}
              <motion.div  animate={{  background: [   "linear-gradient(45deg, rgba(204, 255, 0, 0.2), rgba(0, 255, 0, 0.2))",   "linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(204, 255, 0, 0.2))", ], }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", }}
                style={{  position: "absolute", top: 0,left: 0,right: 0,bottom: 0,zIndex: 1, opacity: 0.1, }} /></div>
          </motion.div>
        </div>
      </div>
    </section>


    <section id="features" style={{   backgroundColor: '#111111', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      <motion.div  initial={{ opacity: 0, y: -20 }}   animate={{ opacity: 1, y: 0 }}   transition={{ duration: 0.6 }}   className="container">
        <h2 className="text-center mb-5" style={{  color: 'white',  fontSize: '3.5rem',  fontWeight: 'bold', position: 'relative', display: 'inline-block', left: '50%', transform: 'translateX(-50%)'}}>
          Features
          <motion.div  style={{  position: 'absolute',   bottom: '-10px',  left: '0',    right: '0',    height: '3px',  transformOrigin: 'left'}} initial={{ scaleX: 0 }}  animate={{ scaleX: 1 }}  transition={{ duration: 0.8, delay: 0.2 }}/>
        </h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {[
            { Icon: IoCalendarNumberSharp, title: "Event Management", description: "Create and manage sports events with customizable schedules and brackets." },
            { Icon: FaUsersLine, title: "Player Registration", description: "Streamline the registration process for players and teams." },
            { Icon: LuAward, title: "Score Tracking", description: "Real-time score updates and automated result calculations." },
            { Icon: FaRegStar, title: "Performance Analytics", description: "Gain insights into player and team performance with advanced analytics." },
            { Icon: LuAward, title: "Tournament Creation", description: "Easily set up and manage tournaments of any size or format." },
            { Icon: FaArrowRightLong, title: "Live Updates", description: "Keep participants and spectators informed with live event updates." },
          ].map((feature, index) => (
            <motion.div  className="col"  key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <motion.div  className="card h-100"
                style={{  backgroundColor: '#D4D4D4',  borderColor: '#0A2472', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(204, 255, 0, 0.1)' }} whileHover={{  scale: 1.05,  boxShadow: '0 8px 25px rgba(204, 255, 0, 0.2)' }} transition={{ duration: 0.3 }}>
                <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
                  <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}
                    style={{  position: 'relative',  width: '80px',  height: '80px',  display: 'flex',  justifyContent: 'center',alignItems: 'center',marginBottom: '1rem'}}>
                    <feature.Icon style={{   color: '#0A2472',   fontSize: '3rem',   position: 'relative', zIndex: 2}} />
<motion.div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '80%',
    border: '4px solid rgba(10, 36, 114, 0.3)', // Updated color to #0A2472 with transparency
  }}
  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
/>

                  </motion.div>
                  <h5 className="card-title mb-3" style={{ color: '#0A2472',   fontSize: '1.50rem',   fontWeight: 'bold'  }}>  {feature.title} </h5>
                  <p className="card-text text-center" style={{  color: '#0A2472',  fontSize: '1rem', lineHeight: '1.5' }}>{feature.description}  </p>
              </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Background animation */}
      <motion.div
        style={{ position: 'absolute',top: 0,left: 0,right: 0,bottom: 0,background: 'radial-gradient(circle, rgba(204, 255, 0, 0.05) 0%, transparent 70%)',pointerEvents: 'none'  }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3]}}
        transition={{duration: 8,repeat: Infinity,ease: 'easeInOut'}}/>
    </section>

    
        <section id="sports"  style={{padding: '80px 0',backgroundColor: '#FFFFFF',color: '#000000', textAlign: 'center', position: 'relative',overflow: 'hidden'}}>

      {/* Background Pattern */}
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 30%, rgba(204, 255, 0, 0.05) 0%, transparent 25%), radial-gradient(circle at 80% 70%, rgba(204, 255, 0, 0.05) 0%, transparent 25%)', zIndex: 0
      }} />
      <div style={{maxWidth: '1200px',margin: '0 auto',padding: '0 20px',position: 'relative',zIndex: 1
      }}>
        <div style={{fontSize: '24px',textTransform: 'uppercase',letterSpacing: '2px',color: '#0A2472',marginBottom: '16px',fontWeight: 600
        }}>
          Our Services
        </div>
        <h2 style={{fontSize: '40px',fontWeight: 'bold',marginBottom: '20px',color: '#000000',lineHeight: 1.2
        }}>
          Sports Management Solutions
        </h2>
        <p style={{fontSize: '18px',color: 'rgba(0, 0, 0, 0.7)',maxWidth: '800px',margin: '0 auto 60px',lineHeight: 1.6
        }}>
          Professional sports management tools to enhance your tournaments and events
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', justifyContent: 'center', alignItems: 'start'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '16px', transition: 'transform 0.3s ease', cursor: 'pointer',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#0A2472', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(204, 255, 0, 0.2)',border: '4px solid black'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1A43BF';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 36, 114, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#0A2472';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 36, 114, 0.2)';
              }}
            >
              <LiaTableTennisSolid style={{ fontSize: '64px', color: '#FFFFFF' }} />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600',  color: '#000000',  marginBottom: '10px'}}>  Table Tennis</h3>
            <p style={{ fontSize: '16px', color: 'rgba(0, 0, 0, 0.7)', lineHeight: 1.6, maxWidth: '280px' }}>
              Professional table tennis training and tournament management for all skill levels
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '16px', transition: 'transform 0.3s ease', cursor: 'pointer'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#0A2472', display: 'flex', alignItems: 'center', justifyContent: 'center',marginBottom: '20px',transition: 'all 0.3s ease',  boxShadow: '0 10px 30px rgba(204, 255, 0, 0.2)',border: '4px solid black'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1A43BF';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 36, 114, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#0A2472';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 36, 114, 0.2)';
              }}
            >
              <FaChess style={{  fontSize: '64px', color: '#FFFFFF'
              }} />
            </div>
            <h3 style={{fontSize: '24px',fontWeight: '600',color: '#000000', marginBottom: '10px'}}>
              Chess
            </h3>
            <p style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.7)',lineHeight: 1.6, maxWidth: '280px' }}>
              Strategic chess competitions and rankings management for clubs and tournaments
            </p>
          </div>
          <div style={{  display: 'flex',  flexDirection: 'column',  alignItems: 'center',  gap: '20px',  padding: '20px',  borderRadius: '16px',  transition: 'transform 0.3s ease',  cursor: 'pointer'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#0A2472', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(204, 255, 0, 0.2)',border: '4px solid black' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#1A43BF';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 36, 114, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#0A2472';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 36, 114, 0.2)';
              }}
            >
              <FaDribbble style={{ fontSize: '64px',color: '#FFFFFF'}} />
            </div>
            <h3 style={{fontSize: '24px',fontWeight: '600',color: '#000000',marginBottom: '10px' }}>
              Carom
            </h3>
            <p style={{fontSize: '16px',color: 'rgba(0, 0, 0, 0.7)',lineHeight: 1.6,maxWidth: '280px'}}>
              Comprehensive carom billiards event organization and player tracking system
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px', borderRadius: '16px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-10px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{width: '160px', height: '160px', borderRadius: '50%', backgroundColor: '#0A2472', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',transition: 'all 0.3s ease',boxShadow: '0 10px 30px rgba(204, 255, 0, 0.2)', border: '4px solid black'}}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#1A43BF';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(10, 36, 114, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#0A2472';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 36, 114, 0.2)';
            }}
          >
            <LuAward style={{fontSize: '64px',color: '#FFFFFF'}} />
          </div>
          <h3 style={{fontSize: '24px',fontWeight: '600',color: '#000000',marginBottom: '10px'
          }}>
            Badminton
          </h3>
          <p style={{fontSize: '16px', color: 'rgba(0, 0, 0, 0.7)', lineHeight: 1.6, maxWidth: '280px'
          }}>
            Complete badminton tournament and league management solutions
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="testimonials" className="py-5 d-flex align-items-center" style={{ height: '520px', backgroundColor: '#333333', backgroundSize: 'cover' }}>
  <div className="container">
    <h2 className="text-center mb-5" style={{ color: '#FFFFFF' }}>What Our Users Say</h2>
    <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
      {[
        { name: "Alex Johnson", role: "Tournament Organizer", quote: "Match Master has revolutionized how we manage our annual chess tournament. It's a game-changer!" },
        { name: "Sarah Lee", role: "Badminton Coach", quote: "The performance analytics have helped us improve our training strategies. Highly recommended!" },
        { name: "Mike Chen", role: "Table Tennis Player", quote: "As a player, I love how easy it is to track my matches and see my progress over time." },
      ].map((testimonial, index) => (
        <div key={index} className="col">
          <div className="card h-100 text-center" style={{ backgroundColor: '#000000', borderColor: '#0A2472', borderRadius: '40px',color: '#000000' }}>
            <div className="card-header w-100 py-2 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#0A2472', color: '#FFFFFF' }}>
              <div>
                <h5 className="card-title mb-0">{testimonial.name}</h5>
                <small>{testimonial.role}</small>
              </div>
              <button className="btn btn-link" style={{ color: '#FFFFFF', fontSize: '1.5rem', textDecoration: 'none' }}data-bs-toggle="collapse" data-bs-target={`#collapseQuote${index}`}aria-expanded="false"  aria-controls={`collapseQuote${index}`} >&#9660;</button>
            </div>
            <div id={`collapseQuote${index}`} className="collapse">
              <div className="card-body">
                <p className="card-text fw-bold" style={{ color: '#FFFFFF' }}>"{testimonial.quote}"</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>
    {`
      .card-header {
        transition: background-color 0.3s ease;
      }
      .card-header:hover {
        background-color: #FFFFFF;
        color: #000000;
      }
      .btn-link {
        outline: none;
      }
    `}
  </style>
</section>

<section id="pricing" className="py-5" style={{ backgroundColor: '#d4d4d4' }}>
  <div className="container">
    <h1 className="text-center mb-5 fw-bold" style={{ color: '#000000' }}>Affordable, Transparent Pricing for Sports Management</h1>
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {[ 
        {
          name: "Basic Package",
          price: "$19",
          features: [
            { feature: "Access to create and manage events", included: true },
            { feature: "Player registration and verification", included: true },
            { feature: "Match scheduling (League and Knockout)", included: true },
            { feature: "AI-powered match prediction (basic)", included: true },
            { feature: "Score tracking and tallying for umpires", included: true },
            { feature: "Advanced monitoring tracking for players", included: true }

          ]
        },
        {
          name: "Premium Package",
          price: "$49",
          features: [
            { feature: "Access to create and manage events", included: true },
            { feature: "Player registration and verification", included: true },
            { feature: "Match scheduling (League and Knockout)", included: true },
            { feature: "AI-powered match prediction and player analytics", included: true },
            { feature: "Score tracking and tallying for umpires", included: true },
          ]
        },
        {
          name: "Pro Package",
          price: "$99",
          label: "Most Popular",
          features: [
            { feature: "Full access to event and match management", included: true },
            { feature: "AI-powered match predictions with real-time analysis", included: true },
            { feature: "Advanced player health analytics and reports", included: true },
            { feature: "Customizable training plans for players", included: true },
            { feature: "Priority support for organizers and umpires", included: true }
          ]
        }
      ].map((plan, index) => (
        <div key={index} className="col">
          <div className="card h-100 text-center animated-card" style={{ backgroundColor: '#FFFFFF', borderRadius: '35px', borderColor: '#000000', borderWidth: '6px', borderStyle: 'solid', animation: 'popEffect 2s infinite' }}>
            <div className="card-header" style={{ backgroundColor: '#FFFFFF', color: '#000000', padding: '1.5rem', borderBottom: '1px solid #000000', borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
              <h5 className="card-title fw-bold" style={{ color: '#000000' }}>{plan.name}</h5>
              <div className="display-4 fw-bold" style={{ color: '#000000' }}>{plan.price}</div>
              {plan.label && (
                <span className="badge" style={{ backgroundColor: '#0A2472', color: '#FFFFFF', position: 'absolute', top: '10px', right: '10px', padding: '0.5rem', borderRadius: '30px' }}>
                  {plan.label}
                </span>
              )}
            </div>
            <div className="card-body">
              <ul className="list-unstyled fw-bold" style={{ color: '#000000' }}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="mb-2">
                    <IoMdCheckmarkCircleOutline
                      style={{ color: feature.included ? '#0A2472' : '#CCCCCC' }}
                      className="me-2"
                    />
                    <span style={{ color: feature.included ? '#000000' : '#CCCCCC' }}>
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer" style={{ backgroundColor: 'transparent', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px' }}>
              <Link to="/register" className="btn w-100 py-2 fw-bold" style={{ backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '30px', fontSize: '19px' }}>GET NOW</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  <style>
  {`
    .animated-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border-radius: 15px;
    }
    .animated-card:hover {
      transform: scale(1.05);
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    }
    @keyframes popEffect {
      0%, 100% {
        box-shadow: 0px 0px 10px rgba(0, 51, 102, 0.5); /* Change to your new color */
      }
      50% {
        box-shadow: 0px 0px 20px rgba(0, 51, 102, 0.8); /* Change to your new color */
      }
    }

    .card-header {
      background-color: #0A2472; /* New color for the card header */
      color: #FFFFFF;
    }

    .btn {
      background-color: #0A2472; /* New color for the button */
      color: #FFFFFF;
    }
  `}
</style>

</section>


<section
  className="d-flex justify-content-center align-items-center"
  style={{
    height: '520px',
    backgroundSize: 'cover',
    backgroundColor: '#222222',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '800px',
      width: '90%',
      position: 'relative',
      zIndex: 2,
      boxShadow: '0 0 50px rgba(0, 123, 143, 0.5)', // Updated shadow to teal tone
    }}
  >
    <div className="container text-center">
      <motion.h2
        className="mb-4 fw-bold"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ color: '#ffffff' }}
      >
        Ready to Transform Your Sports Management?
      </motion.h2>
      <motion.p
        className="lead mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ color: '#FFFFFF' }}
      >
        Join thousands of satisfied users and take your sports events to the next level with Match Master.
      </motion.p>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/register"
          className="btn btn-lg fw-bold"
          style={{
            backgroundColor: '#0A2472', // Updated to teal
            color: '#ffffff',
            padding: '12px 30px',
            fontSize: '18px',
            borderRadius: '30px',
            transition: 'all 0.3s ease',
          }}
        >
          Start Your Free Trial
        </Link>
      </motion.div>
    </div>
  </motion.div>

  {/* Radiation animation effect */}
  {[...Array(3)].map((_, index) => (
    <motion.div
      key={index}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        borderRadius: '80%',
        border: '98px solid rgba(0, 123, 143, 0.1)', // Updated border color to teal
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 2, 1],
        opacity: [0.1, 0.5, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.8,
        ease: 'easeInOut',
      }}
    />
  ))}
</section>

      </main>
      
      <footer>

      {/* Main Footer */}
      <div style={{ backgroundColor: '#000000', padding: '80px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {/* Brand Section */}
            <div>
              <img  src={logo}  alt="Match Master Logo" style={{ height: '32px', marginBottom: '24px' }} />
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px', lineHeight: '1.6' }}>
                Whether you're organizing a tournament or managing a team, Match Master makes every moment count with powerful sports management tools.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[
                  { icon: FaFacebook, href: "https://facebook.com" },
                  { icon: FaTwitter, href: "https://twitter.com" },
                  { icon: FaInstagram, href: "https://instagram.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '40px', height: '40px',borderRadius: '50%',border: '1px solid rgba(255, 255, 255, 255)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',transition: 'all 0.3s ease'}}
                    whileHover={{ backgroundColor: '#ffffff', color: '#000000', scale: 1.1, }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Explore Section */}
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                Explore
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { text: "Articles", href: "/#home" },
                  { text: "FAQ", href: "/#home" },
                  { text: "Testimonials", href: "/#home" },
                  { text: "Gallery", href: "/#home" },
                  { text: "About Us", href: "/#home" },
                  { text: "Blog", href: "/#home" },
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.href}
                      style={{color: 'rgba(255, 255, 255, 0.7)',textDecoration: 'none',display: 'flex',alignItems: 'center',gap: '8px',transition: 'all 0.3s ease'}}
                    >
                      <span style={{ color: '#0A2472', fontSize: '14px' }}>→</span>
                      {link.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                Quick Links
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { text: "Terms of Service", href: "/terms-of-service" },
                  { text: "Privacy Policy", href: "/privacy-policy" },
                  { text: "Contact Us", href: "/contact-us" },
                  { text: "Support", href: "/terms-of-service" },
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={link.href}
                      style={{color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease' }}
                    >
                      <span style={{ color: '#0A2472', fontSize: '14px' }}>→</span>
                      {link.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>
                Contact
              </h3>
              <div>
                {[
                  { icon: FaMapMarkerAlt, label: "Address:", value: "Mann's school lane uducil chunnaakam" },
                  { icon: FaPhone, label: "Phone:", value: "0726012313" },
                  { icon: FaClock, label: "Working Hours:", value: "Mon-Fri: 8am - 4pm" },
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                    <div style={{width: '40px',height: '40px',borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 255)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A2472' }}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div style={{ color: '#FFFFFF', fontWeight: '500', marginBottom: '4px' }}>
                        {item.label}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(204, 255, 0, 0.1)', padding: '24px 0', backgroundColor: '#000000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px', textAlign: 'center' }}>
            © {new Date().getFullYear()} Match Master. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}