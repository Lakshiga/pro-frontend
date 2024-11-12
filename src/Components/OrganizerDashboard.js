import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTrophy, FaUsersLine, FaDollarSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../Images/MM logo.jpeg';
import DrawComponent from '../Components/DrawComponent.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import { Modal } from 'react-bootstrap';
import OrganizerSubscribe from './OrganizerSubscribe'; // Assuming this is your subscription form component


const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [toggle, setToggle] = useState(false); // Initialize 'toggle' as a state
  const [matches, setMatches] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [newMatch, setNewMatch] = useState({ eventId: '', player1: '', player2: '', date: '' });
  const [activeTab, setActiveTab] = useState('events');
  const [activeModal, setActiveModal] = useState(null); // State to control modal visibility
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    sport: '',
    ageGroup: '',
    matchType: "knockout",
    players: [],
  });

  const [matchDraw, setMatchDraw] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  // Function to open the login modal
  const openLoginModal = () => setActiveModal('login');
  const openSubscribeModal = () => setActiveModal('subscribe'); // Open subscribe modal

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
      const [eventsRes, usersRes, matchesRes, subscriptionRes] = await Promise.all([
        axios.get('http://localhost:4000/api/event/getEventsByOrganizer', {
          headers: {
            Authorization: `Bearer ${localtoken}`,
          }
        }),
        axios.get('http://localhost:4000/api/admin/users'),
      ]);
      setEvents(eventsRes.data);
      const unverified = usersRes.data.filter(user => (user.role === 'player' || user.role === 'umpire') && !user.verified);
      setUnverified(unverified);
      setSubscription(subscriptionRes.data);
      toast.success("Data loaded successfully!");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/event/create', newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setEvents([...events, res.data]);
      const generatedMatchDraw = await createMatchesForEvent(res.data._id, newEvent.players, newEvent.matchType);
      setMatchDraw(generatedMatchDraw);
      setNewEvent({ name: '', date: '', sport: '', ageGroup: '', matchType: 'knockout', players: [] });
      toast.success("Event created successfully!");
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const createMatchesForEvent = async (eventId, players, matchType) => {
    if (players.length < 2) {
      console.error('Not enough players to create matches.');
      return [];
    }
    const matchDraw = matchType === 'knockout' ? generateKnockoutDraw(players) : generateLeagueDraw(players);
    try {
      const createdMatches = [];

      for (const match of matchDraw) {
        const [player1, player2] = match.split(' vs ');
        
        const res = await axios.post('http://localhost:4000/api/match/create', {
          event_id: eventId,
          player1_id: player1,
          player2_id: player2,
          umpire_id: 'umpireIdHere',
          match_date: newEvent.date,
          status: 'scheduled'
        });
        
        createdMatches.push(res.data);
      }
      fetchData();
      toast.success("Matches created successfully!");
      return matchDraw;
    } catch (error) {
      console.error('Error creating matches:', error);
      return [];
    }
  };

  const generateKnockoutDraw = (players) => {
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    let matches = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      if (i + 1 < shuffledPlayers.length) {
        matches.push(`${shuffledPlayers[i]} vs ${shuffledPlayers[i + 1]}`);
      }
    }
    return matches;
  };

  const generateLeagueDraw = (players) => {
    const matches = [];
    const numPlayers = players.length;

    for (let i = 0; i < numPlayers; i++) {
      for (let j = i + 1; j < numPlayers; j++) {
        matches.push(`${players[i]} vs ${players[j]}`);
      }
    }

    return matches;
  };

  const handleSubscribe = () => {
    openSubscribeModal(); // Open the modal instead of navigating
    toast.info("Open Subscription Modal");
  };



  return (
    <div className="min-vh-100" style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '2rem' }}>
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-between align-items-center mb-4"
          style={{ backgroundColor: '#111111', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 20px rgba(204, 255, 0, 0.2)' }}
        >
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

          <div className="d-flex align-items-center">
            <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-1" style={{ width: '50px' }} />
            <h1 className="h3 fw-bold mb-0 ms-3" style={{ color: '#CCFF00' }}>Organizer Dashboard</h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(204, 255, 0, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="btn fw-bold"
            onClick={handleLogout}
            style={{ color: '#000000', backgroundColor: '#CCFF00', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', transition: 'all 0.3s ease' }}
          >
            Logout
          </motion.button>

          {/* Login Modal */}
          <Modal show={activeModal === 'login'} onHide={closeModal} centered>
            <Modal.Body style={{ backgroundColor: '#1a1a1a', padding: '0' }}>
              <Login closeModal={closeModal} />
            </Modal.Body>
          </Modal>

          {/* Subscription Modal */}
          <Modal show={activeModal === 'subscribe'} onHide={closeModal} centered>
            <Modal.Body>
              <OrganizerSubscribe closeModal={closeModal} /> {/* Subscription form component */}
            </Modal.Body>
          </Modal>
        </motion.header>

        <div className="row g-4 mb-4">
          {[
            { title: "Total Events", value: events.length, icon: IoCalendarNumberSharp },
            { title: "Total Matches", value: matches.length, icon: FaTrophy },
            { title: "Unverified Users", value: unverified.length, icon: FaUsersLine },
            { title: "Subscription", value: "Subscribe", icon: FaDollarSign, action: handleSubscribe },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)' }}
                className="card bg-dark text-white"
                style={{ borderRadius: '15px', border: '2px solid #CCFF00', overflow: 'hidden' }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-subtitle" style={{ color: '#d4d4d4' }}>{item.title}</h6>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <item.icon className="fs-4" style={{ color: '#CCFF00' }} />
                    </motion.div>
                  </div>
                  {item.action ? (
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(204, 255, 0, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      className="btn mt-2"
                      onClick={item.action}
                      style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', fontWeight: 'bold' }}
                    >
                      {item.value}
                    </motion.button>
                  ) : (
                    <h2 className="card-title mb-0" style={{ color: '#CCFF00' }}>{item.value}</h2>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.ul  initial={{ opacity: 0, y: 20 }}  animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5 }}  className="nav nav-tabs mb-4 gap-4"  style={{ borderBottom: '2px solid #CCFF00' }}>
          {['events', 'analytics'].map((tab) => (
            <li key={tab} className="nav-item">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                style={{ backgroundColor: activeTab === tab ? '#CCFF00' : 'transparent', color: activeTab === tab ? '#000000' : '#FFFFFF', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px 5px 0 0', fontWeight: 'bold', }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            </li>
          ))}
        </motion.ul>

        <div className="tab-content">
          {activeTab === 'events' && (
            <motion.div  initial={{ opacity: 0 }}  animate={{ opacity: 1 }}  transition={{ duration: 0.5 }} className="tab-pane fade show active">
              <div className="card mb-4" style={{ backgroundColor: '#111111', border: '2px solid #CCFF00', borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#CCFF00' }}>Create New Event</h5>
                  <form onSubmit={createEvent}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="eventName" className="form-label" style={{ color: '#d4d4d4' }}>Event Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="eventName"
                          value={newEvent.name}
                          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                          required
                          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #CCFF00' }}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="eventDate" className="form-label" style={{ color: '#d4d4d4' }}>Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="eventDate"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          required
                          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #CCFF00' }}
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="eventSport" className="form-label" style={{ color: '#d4d4d4' }}>Sport</label>
                        <select
                          className="form-select"
                          id="eventSport"
                          value={newEvent.sport}
                          onChange={(e) => setNewEvent({ ...newEvent, sport: e.target.value })}
                          required
                          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #CCFF00' }}
                        >
                          <option value="">Select a sport</option>
                          <option value="table-tennis">Table Tennis</option>
                          <option value="carom">Carom</option>
                          <option value="chess">Chess</option>
                          <option value="badminton">Badminton</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="eventAgeGroup" className="form-label" style={{ color: '#d4d4d4' }}>Age Group</label>
                        <select
                          className="form-select"
                          id="eventAgeGroup"
                          value={newEvent.ageGroup}
                          onChange={(e) => setNewEvent({ ...newEvent, ageGroup: e.target.value })}
                          required
                          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #CCFF00' }}
                        >
                          <option value="">Select age group</option>
                          <option value="under-12">Under 12</option>
                          <option value="under-15">Under 15</option>
                          <option value="under-18">Under 18</option>
                          <option value="adult">Adult</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="matchType" className="form-label" style={{ color: '#d4d4d4' }}>Match Type</label>
                        <select
                          className="form-select"
                          id="matchType"
                          value={newEvent.matchType}
                          onChange={(e) => setNewEvent({ ...newEvent, matchType: e.target.value })}
                          required
                          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #CCFF00' }}
                        >
                          <option value="knockout">Knockout</option>
                          <option value="league">League</option>
                        </select>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(204, 255, 0, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="btn btn-outline-secondary fw-bold mt-3"
                      style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none' }}
                    >
                      Create Event and Generate Draw
                    </motion.button>
                  </form>
                </div>
              </div>
              
              {matchDraw.length > 0 && <DrawComponent draw={matchDraw} />}
              
              <motion.div  initial={{ opacity: 0, y: 20 }}  animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.5 }}  className="card"  style={{ backgroundColor: '#111111', border: '2px solid #CCFF00', borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#CCFF00' }}>Event List</h5>
                  <div className="table-responsive">
                    <table className="table table-hover" style={{ color: '#FFFFFF' }}>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Date</th>
                          <th>Sport</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                            <td>{event.sport}</td>
                            <td>
                              <motion.button  whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)' }}  whileTap={{ scale: 0.95 }}  className="btn btn-outline-secondary fw-bold me-2"
                                onClick={() => navigate(`/organizer-dashboard/event/${event._id}`)}
                                style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none' }}
                              >
                                View
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-outline-secondary fw-bold"
                                onClick={() => navigate(`/organizer-dashboard/event/edit/${event._id}`)}
                                style={{ backgroundColor: '#CCFF00', color: '#000000', border: 'none' }}
                              >
                                Edit
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div  initial={{ opacity: 0 }}  animate={{ opacity: 1 }}  transition={{ duration: 0.5 }}  className="tab-pane fade show active"   >
              <div className="card" style={{ backgroundColor: '#111111', border: '2px solid #CCFF00', borderRadius: '15px' }}>
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#CCFF00' }}>Performance Analytics</h5>
                  <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                    <p className="text-muted">Analytics visualization coming soon!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;