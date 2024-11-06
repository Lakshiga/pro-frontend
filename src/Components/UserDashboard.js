import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../Images/MM logo.jpeg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { Modal } from 'react-bootstrap';


const EventList = ({ events, applyForEvent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="card mb-4"
    style={{ backgroundColor: '#111111', border: '2px solid #CCFF00', borderRadius: '15px' }}
  >
    <div className="card-body">
      <h5 className="card-title mb-4" style={{ color: '#CCFF00' }}>Active Events</h5>
      <div className="table-responsive">
        <table className="table table-hover" style={{ color: '#FFFFFF' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Sport</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <motion.tr
                key={event._id}
                whileHover={{ backgroundColor: 'rgba(204, 255, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.sport}</td>
                <td>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => applyForEvent(event._id)}
                    className="btn btn-sm"
                    style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none' }}
                  >
                    Apply
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const MatchList = ({ matches, events, user, updateScore }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="card mb-4"
    style={{ backgroundColor: '#111111', border: '2px solid #CCFF00', borderRadius: '15px' }}
  >
    <div className="card-body">
      <h5 className="card-title mb-4" style={{ color: '#CCFF00' }}>Match List</h5>
      <div className="table-responsive">
        <table className="table table-hover" style={{ color: '#FFFFFF' }}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Date</th>
              <th>Score</th>
              {user.role === 'umpire' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <motion.tr
                key={match._id}
                whileHover={{ backgroundColor: 'rgba(204, 255, 0, 0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <td>{events.find(e => e._id === match.eventId)?.name || 'N/A'}</td>
                <td>{match.player1}</td>
                <td>{match.player2}</td>
                <td>{new Date(match.date).toLocaleDateString()}</td>
                <td>{match.score || 'Not available'}</td>
                {user.role === 'umpire' && (
                  <td>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const score = prompt('Enter the score:');
                        if (score) updateScore(match._id, score);
                      }}
                      className="btn btn-sm"
                      style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none' }}
                    >
                      Update Score
                    </motion.button>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const UserDashboard = ({ user = { _id: '1', name: 'John Doe', role: 'player' } }) => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // State to control modal visibility
  const [token, setToken] = useState("");


  // Function to open the login modal
  const openLoginModal = () => setActiveModal('login');

  // Function to close the modal
  const closeModal = () => setActiveModal(null);


   // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token from localStorage
    toast.success("Logged out successfully!"); // Show success toast

    setTimeout(() => {
      openLoginModal();// Open the login modal after a brief delay

       // Navigate away from the current page (e.g., to the home page or login page)
    navigate('/', { replace: true }); // This will navigate the user to the login page

    }, 2000); // Delay to show logout success before opening the login modal
  };

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try { 
      const localtoken = localStorage.getItem('token'); 
      setToken(localtoken);
      const headers = { Authorization: `Bearer ${localtoken}` };
      const [eventsRes, matchesRes] = await Promise.all([
        axios.get('http://localhost:4000/api/event/active', { headers }),
        axios.get('http://localhost:4000/api/match/match-player', { headers })
      ]);
      setEvents(eventsRes.data);
      setMatches(matchesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Failed to load data. Please try again later.');
    }
  };

  const updateScore = async (matchId, score) => {
    if (user.role !== 'umpire') return;
    try {
      await axios.put(`http://localhost:4000/api/matches/${matchId}`, { score });
      setMatches(matches.map(match => 
        match._id === matchId ? { ...match, score } : match
      ));
      toast.success('Score updated successfully!');
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const applyForEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:4000/api/event/${eventId}/apply`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Applied to event successfully!');
      fetchData();
    } catch (error) {
      console.error('Error applying for event:', error);
    }
  };

    return (
      <div className="min-vh-100" style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '2rem' }}>
        <div className="container">
          {/* Header with Dynamic Role Title */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="d-flex justify-content-between align-items-center mb-4"
            style={{ backgroundColor: '#111111', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)', }} >

           <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

            <div className="d-flex align-items-center">
              <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-1" style={{ width: '50px' }} />
              <h1 className="h3 fw-bold mb-0 ms-3" style={{ color: '#CCFF00' }}>
                {user.role === 'umpire' ? 'Umpire Dashboard' : 'Player Dashboard'}
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(204, 255, 0, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="btn fw-bold"
              onClick={handleLogout}
              style={{color: '#000000',backgroundColor: '#CCFF00', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'all 0.3s ease',}}>
              Logout
            </motion.button>

            {/* Login Modal */}
        <Modal show={activeModal === 'login'} onHide={closeModal} centered>
          <Modal.Body style={{ backgroundColor: '#1a1a1a', padding: '0' }}>
            <Login closeModal={closeModal} />
          </Modal.Body>
        </Modal>

          </motion.header>
  
          {/* Conditionally Render Stats Based on Role */}
          <div className="row g-4 mb-4">
            {[
              { title: "Total Events", value: events.length, icon: FaCalendarAlt },
              { title: "Total Matches", value: matches.length, icon: FaTrophy },
              { title: user.role === 'umpire' ? "Umpire Status" : "Player Status", value: "Active", icon: FaCheckCircle },
            ].map((item, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)' }}
                  className="card bg-dark text-white"
                  style={{borderRadius: '15px', border: '2px solid #CCFF00', overflow: 'hidden', }} >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-subtitle" style={{ color: '#d4d4d4' }}>{item.title}</h6>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="fs-4" style={{ color: '#CCFF00' }} />
                      </motion.div>
                    </div>
                    <h2 className="card-title mb-0" style={{ color: '#CCFF00' }}>{item.value}</h2>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
  
          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="alert alert-danger mb-4"
              role="alert"
            >
              {errorMessage}
            </motion.div>
          )}
  
          {/* Tab Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="nav nav-tabs mb-4 gap-4"
            style={{ borderBottom: '2px solid #CCFF00' }}
          >
            {['events', 'matches'].map((tab) => (
              <li key={tab} className="nav-item">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  style={{ backgroundColor: activeTab === tab ? '#CCFF00' : 'transparent',color: activeTab === tab ? '#000000' : '#FFFFFF',border: 'none',padding: '0.5rem 1rem',borderRadius: '5px 5px 0 0',fontWeight: 'bold',}}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              </li>
            ))}
          </motion.ul>
  
          {/* Conditionally Render Events and Matches */}
          <div className="tab-content">
            {activeTab === 'events' && <EventList events={events} applyForEvent={applyForEvent} />}
            {activeTab === 'matches' && <MatchList matches={matches} events={events} user={user} updateScore={updateScore} />}
          </div>
        </div>
      </div>
    );
  };

export default UserDashboard;