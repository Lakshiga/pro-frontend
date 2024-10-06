import React, { useState } from 'react'
import { Button } from "../Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Components/ui/card"
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaUsersLine } from "react-icons/fa6";
import { LuAward } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaTableTennisSolid } from "react-icons/lia";
import { FaChess } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import logo from '../Images/MatchMaster.png'; // Import your logo here
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Importing FontAwesome Icons from React Icons
import "../CSS/HomePage.css"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="px-4 py-3 d-flex align-items-center border-bottom bg-white sticky-top shadow-sm">
        <a className="d-flex align-items-center justify-content-center text-decoration-none" href="#">
          <img src={logo} alt="Match Master Logo" width={85} height={80} className="me-2" />
          <span className="h5 fw-bold " style={{ color: 'navy' }} >Match Master</span>
        </a>
        <nav className={`ms-auto ${isMenuOpen ? 'd-flex' : 'd-none'} d-md-flex gap-3`}>
          {['Features', 'Sports', 'Testimonials', 'Pricing'].map((item) => (
            <a key={item} className="text-secondary text-decoration-none fw-bold" href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <a href="/login" className="btn w-15 py-2 custom-gradient ms-3 fw-bold"style={{ color: '#00e6d4' }}>Log In</a>
        <button className="btn btn-outline-secondary d-md-none ms-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <IoMenu />
        </button>
      </header>

      <main className="flex-grow-1">
        <section className="py-5 custom-gradient text-white">
          <div className="container text-center">
          <h1 className="display-4 fw-bold">Revolutionize Your <span style={{ color: '#00e6d4' }}>Sports Management</span></h1>
          <p className="lead">From organizing tournaments to tracking scores, Match Master streamlines your entire sports management process.</p>
            <a href="/register" className="btn btn-light me-2 fw-bold"style={{ color: 'navy' }}>Get Started for Free</a>
            <a href="#features" className="btn btn-outline-light fw-bold">Learn More</a>
          </div>
        </section>

        <section id="features" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5"style={{ color: 'navy' }}>Powerful Features</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
              {[
                { icon: IoCalendarNumberSharp, title: "Event Management", description: "Create and manage sports events with customizable schedules and brackets." },
                { icon: FaUsersLine, title: "Player Registration", description: "Streamline the registration process for players and teams." },
                { icon: LuAward, title: "Score Tracking", description: "Real-time score updates and automated result calculations." },
                { icon: FaRegStar, title: "Performance Analytics", description: "Gain insights into player and team performance with advanced analytics." },
                { icon: LuAward, title: "Tournament Creation", description: "Easily set up and manage tournaments of any size or format." },
                { icon: FaArrowRightLong, title: "Live Updates", description: "Keep participants and spectators informed with live event updates." },
              ].map((feature, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 text-center shadow-sm">
                    <div className="card-body">
                      <feature.icon className="fs-1 mb-3"style={{ color: 'navy' }} />
                      <h5 className="card-title">{feature.title}</h5>
                      <p className="card-text">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sports" className="py-5 custom-gradient">
          <div className="container">
            <h2 className="text-center mb-5 text-white">Supported Sports</h2>
            <div className="row row-cols-2 row-cols-md-4 g-4">
              {[
                { icon: LiaTableTennisSolid, name: "Table Tennis" },
                { icon: FaChess, name: "Chess" },
                { icon: FaDribbble, name: "Carom" },
                { icon: LuAward, name: "Badminton" },
              ].map((sport, index) => (
                <div key={index} className="col text-center">
                  <div className="bg-white rounded-circle p-4 shadow-lg mb-3 d-flex justify-content-center align-items-center mx-auto" style={{width: '100px', height: '100px'}}>
                    <sport.icon className="fs-1" style={{ color: 'navy' }} />
                  </div>
                  <h3 className="text-white">{sport.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-5 bg-white">
          <div className="container">
            <h2 className="text-center mb-5" style={{ color: 'navy' }}>What Our Users Say</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {[
                { name: "Alex Johnson", role: "Tournament Organizer", quote: "Match Master has revolutionized how we manage our annual chess tournament. It's a game-changer!" },
                { name: "Sarah Lee", role: "Badminton Coach", quote: "The performance analytics have helped us improve our training strategies. Highly recommended!" },
                { name: "Mike Chen", role: "Table Tennis Player", quote: "As a player, I love how easy it is to track my matches and see my progress over time." },
              ].map((testimonial, index) => (
                <div key={index} className="col">
                  <div className="card h-100 border-primary">
                    <div className="card-header w-100 py-2 custom-gradient text-white text-white">
                      <h5 className="card-title mb-0">{testimonial.name}</h5>
                      <small>{testimonial.role}</small>
                    </div>
                    <div className="card-body">
                      <p className="card-text fw-bold">"{testimonial.quote}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-5 custom-gradient">
          <div className="container">
            <h2 className="text-center mb-5 text-white fw-bold">Simple, Transparent Pricing</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {[
                { name: "Basic", price: "$29", features: ["Up to 5 events", "100 player registrations", "Basic analytics", "Email support"] },
                { name: "Pro", price: "$79", features: ["Unlimited events", "Unlimited registrations", "Advanced analytics", "Priority support", "Custom branding"] },
                { name: "Enterprise", price: "Custom", features: ["All Pro features", "Dedicated account manager", "API access", "On-premise deployment option"] },
              ].map((plan, index) => (
                <div key={index} className="col">
                  <div className="card h-100 text-center">
                    <div className="card-header bg-white">
                      <h5 className="card-title fw-bold" style={{ color: 'navy' }}>{plan.name}</h5>
                      <div className="display-4 fw-bold">{plan.price}</div>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled fw-bold">
                        {plan.features.map((feature, fIndex) => (
                          <li key={fIndex} className="mb-2">
                            <IoMdCheckmarkCircleOutline className="text-success me-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer bg-white">
                      <Link to="/register" className="btn w-100 py-2 custom-gradient text-white">Get Started</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-5 custom-gradient text-white">
          <div className="container text-center">
            <h2 className="mb-4 fw-bold">Ready to Transform Your Sports Management?</h2>
            <p className="lead mb-4">Join thousands of satisfied users and take your sports events to the next level with Match Master.</p>
            <Link to="/register" className="btn btn-light btn-lg fw-bold "style={{ color: 'navy' }}>Start Your Free Trial</Link>
          </div>
        </section>
      </main>

      <footer className="py-4 bg-light border-top">
      <div className="container">
        <div className="row justify-content-center text-center"> {/* Center the entire row */}
          <div className="col-12 mb-3"> {/* Center the text and icons */}
            <p className="mb-0 text-muted">© 2024 Match Master. All rights reserved.</p>
          </div>
          <div className="col-12">
            <nav className="nav justify-content-center"> {/* Center the nav links and icons */}
              <Link className="nav-link text-muted" to="#">Terms of Service</Link>
              <Link className="nav-link text-muted" to="#">Privacy Policy</Link>
              <Link className="nav-link text-muted" to="#">Contact Us</Link>
              {/* Social Media Icons */}
              <a href="https://www.facebook.com" className="nav-link text-muted" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} /> {/* Facebook Icon */}
              </a>
              <a href="https://www.twitter.com" className="nav-link text-muted" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} /> {/* Twitter Icon */}
              </a>
              <a href="https://www.instagram.com" className="nav-link text-muted" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} /> {/* Instagram Icon */}
              </a>
              <a href="mailto:info@matchmaster.com" className="nav-link text-muted">
                <FaEnvelope size={24} /> {/* Email Icon */}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}