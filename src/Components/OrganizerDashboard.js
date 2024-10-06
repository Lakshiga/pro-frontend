import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTrophy, FaUsersLine, FaDollarSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import "../CSS/OrganizerDashboard.css"
import logo from '../Images/MatchMaster.png'; // Import your logo here


const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', sport: '' });
  const [newMatch, setNewMatch] = useState({ eventId: '', player1: '', player2: '', date: '' });
  const [activeTab, setActiveTab] = useState('events');

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, matchesRes, usersRes, subscriptionRes] = await Promise.all([
        axios.get('/api/organizer/events'),
        axios.get('/api/organizer/matches'),
        axios.get('/api/organizer/unverified-users'),
        axios.get('/api/organizer/subscription')
      ]);
      setEvents(eventsRes.data);
      setMatches(matchesRes.data);
      setUnverifiedUsers(usersRes.data);
      setSubscription(subscriptionRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/organizer/events', newEvent);
      setEvents([...events, res.data]);
      setNewEvent({ name: '', date: '', sport: '' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const createMatch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/organizer/matches', newMatch);
      setMatches([...matches, res.data]);
      setNewMatch({ eventId: '', player1: '', player2: '', date: '' });
    } catch (error) {
      console.error('Error creating match:', error);
    }
  };

  const verifyUser = async (userId) => {
    try {
      await axios.post(`/api/organizer/verify-user/${userId}`);
      setUnverifiedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleSubscribe = () => {
    navigate('/organizer/subscribe');
  };

  return (
    <div className="min-vh-100 custom-gradient p-4">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
          <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-1" />
            <h1 className="h3 fw-bold text-white mb-0">Organizer Dashboard</h1>
          </div>
          <button className="btn btn-outline-light">Logout</button>
        </header>

        <div className="row g-4 mb-4">
          {[
            { title: "Total Events", value: events.length, icon: IoCalendarNumberSharp, color: "bg-info" },
            { title: "Total Matches", value: matches.length, icon: FaTrophy, color: "bg-info" },
            { title: "Unverified Users", value: unverifiedUsers.length, icon: FaUsersLine, color: "bg-info" },
            { title: "Subscription Status", value: subscription?.status || 'Inactive', icon: FaDollarSign, color: "bg-info" },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className={`card ${item.color} text-white`}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-subtitle">{item.title}</h6>
                    <item.icon className="fs-4" />
                  </div>
                  <h2 className="card-title mb-0">{item.value}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>Events</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>Matches</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>User Verification</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>Analytics</button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'events' && (
            <div className="tab-pane fade show active">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Create New Event</h5>
                  <form onSubmit={createEvent}>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label htmlFor="eventName" className="form-label">Event Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="eventName"
                          value={newEvent.name}
                          onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="eventDate" className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="eventDate"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="eventSport" className="form-label">Sport</label>
                        <select
                          className="form-select"
                          id="eventSport"
                          value={newEvent.sport}
                          onChange={(e) => setNewEvent({...newEvent, sport: e.target.value})}
                          required
                        >
                          <option value="">Select a sport</option>
                          <option value="table-tennis">Table Tennis</option>
                          <option value="carom">Carom</option>
                          <option value="chess">Chess</option>
                          <option value="badminton">Badminton</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Event</button>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Event List</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
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
                              <button className="btn btn-outline-primary btn-sm">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="tab-pane fade show active">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Create New Match</h5>
                  <form onSubmit={createMatch}>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label htmlFor="matchEvent" className="form-label">Event</label>
                        <select
                          className="form-select"
                          id="matchEvent"
                          value={newMatch.eventId}
                          onChange={(e) => setNewMatch({...newMatch, eventId: e.target.value})}
                          required
                        >
                          <option value="">Select an event</option>
                          {events.map((event) => (
                            <option key={event.id} value={event.id}>{event.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="matchDate" className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="matchDate"
                          value={newMatch.date}
                          onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="player1" className="form-label">Player 1</label>
                        <input
                          type="text"
                          className="form-control"
                          id="player1"
                          value={newMatch.player1}
                          onChange={(e) => setNewMatch({...newMatch, player1: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="player2" className="form-label">Player 2</label>
                        <input
                          type="text"
                          className="form-control"
                          id="player2"
                          value={newMatch.player2}
                          onChange={(e) => setNewMatch({...newMatch, player2: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Match</button>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Match List</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Player 1</th>
                          <th>Player 2</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matches.map((match) => (
                          <tr key={match.id}>
                            <td>{events.find(e => e.id === match.eventId)?.name}</td>
                            <td>{match.player1}</td>
                            <td>{match.player2}</td>
                            <td>{new Date(match.date).toLocaleDateString()}</td>
                            <td>
                              <button className="btn btn-outline-primary btn-sm">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="tab-pane fade show active">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Unverified Users</h5>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Registration Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unverifiedUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                            <td>
                              <button onClick={() => verifyUser(user.id)} className="btn btn-success btn-sm">Verify</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="tab-pane fade show active">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Performance Analytics</h5>
                  <div className="d-flex align-items-center justify-content-center" style={{height: '300px'}}>
                    <p className="text-muted">Analytics visualization coming soon!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;