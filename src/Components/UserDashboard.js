import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaTrophy, FaCheckCircle } from 'react-icons/fa';
import "../CSS/UserDashboard.css";

// Separate component for Event List
const EventList = ({ events }) => (
  <div className="tab-pane fade show active">
    <div className="card bg-white shadow">
      <div className="card-body">
        <h5 className="card-title mb-4">Event List</h5>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Sport</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.sport}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Separate component for Match List
const MatchList = ({ matches, events, user, updateScore }) => (
  <div className="tab-pane fade show active">
    <div className="card bg-white shadow">
      <div className="card-body">
        <h5 className="card-title mb-4">Match List</h5>
        <div className="table-responsive">
          <table className="table table-hover">
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
                <tr key={match.id}>
                  <td>{events.find(e => e.id === match.eventId)?.name || 'N/A'}</td>
                  <td>{match.player1}</td>
                  <td>{match.player2}</td>
                  <td>{new Date(match.date).toLocaleDateString()}</td>
                  <td>{match.score || 'Not available'}</td>
                  {user.role === 'umpire' && (
                    <td>
                      <button
                        onClick={() => {
                          const score = prompt('Enter the score:');
                          if (score) updateScore(match.id, score);
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        Update Score
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const UserDashboard = ({ user = { id: '1', name: 'John Doe', role: 'user' } }) => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsRes, matchesRes] = await Promise.all([
        axios.get('http://localhost:4000/api/event/active'),
        axios.get('/api/matches')
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
      await axios.put(`/api/matches/${matchId}`, { score });
      setMatches(matches.map(match => 
        match.id === matchId ? { ...match, score } : match
      ));
      alert('Score updated successfully!');
    } catch (error) {
      console.error('Error updating score:', error);
      setErrorMessage('Failed to update score. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 custom-gradient p-4">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <img src="/MatchMaster.png" alt="Match Master Logo" width="60" height="60" className="me-3" />
            <h1 className="h3 fw-bold text-primary mb-0">
              {user.role === 'umpire' ? 'Umpire Dashboard' : 'User Dashboard'}
            </h1>
          </div>
          <button className="btn btn-outline-primary">Logout</button>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card bg-info">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle text-muted">Total Events</h6>
                  <FaCalendarAlt className="text-primary" />
                </div>
                <h2 className="card-title mt-2 mb-0">{events.length}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="card-subtitle text-muted">Total Matches</h6>
                  <FaTrophy className="text-primary" />
                </div>
                <h2 className="card-title mt-2 mb-0">{matches.length}</h2>
              </div>
            </div>
          </div>
          {user.role === 'umpire' && (
            <div className="col-md-4">
              <div className="card bg-white shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-subtitle text-muted">Umpire Status</h6>
                    <FaCheckCircle className="text-primary" />
                  </div>
                  <h2 className="card-title mt-2 mb-0">Active</h2>
                </div>
              </div>
            </div>
          )}
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveTab('matches')}
            >
              Matches
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === 'events' && <EventList events={events} />}
          {activeTab === 'matches' && <MatchList matches={matches} events={events} user={user} updateScore={updateScore} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
