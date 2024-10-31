import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate if not already imported
import { FaCalendarAlt, FaTrophy, FaCheckCircle } from 'react-icons/fa';

const EventList = ({ events, applyForEvent }) => (
  <div style={{ opacity: 1, transition: 'opacity 0.15s linear' }}>
    <div style={{ backgroundColor: 'white', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', transition: 'box-shadow 0.3s ease-in-out' }}>
      <div style={{ padding: '1.25rem' }}>
        <h5 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Active Events</h5>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', marginBottom: '1rem', color: '#212529' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Date</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Sport</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} style={{ transition: 'background-color 0.15s ease-in-out' }}>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{event.name}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{new Date(event.date).toLocaleDateString()}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{event.sport}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>
                    <button 
                      onClick={() => applyForEvent(event._id)} 
                      style={{
                        color: '#08096b',
                        backgroundColor: 'transparent',
                        borderColor: '#08096b',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        borderRadius: '0.2rem',
                        cursor: 'pointer',
                        transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.color = '#fff';
                        e.target.style.backgroundColor = '#08096b';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.color = '#08096b';
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const MatchList = ({ matches, events, user, updateScore }) => (
  <div style={{ opacity: 1, transition: 'opacity 0.15s linear' }}>
    <div style={{ backgroundColor: 'white', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', transition: 'box-shadow 0.3s ease-in-out' }}>
      <div style={{ padding: '1.25rem' }}>
        <h5 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>Match List</h5>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', marginBottom: '1rem', color: '#212529' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Event</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Player 1</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Player 2</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Date</th>
                <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Score</th>
                {user.role === 'umpire' && <th style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match._id} style={{ transition: 'background-color 0.15s ease-in-out' }}>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{events.find(e => e._id === match.eventId)?.name || 'N/A'}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{match.player1}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{match.player2}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{new Date(match.date).toLocaleDateString()}</td>
                  <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>{match.score || 'Not available'}</td>
                  {user.role === 'umpire' && (
                    <td style={{ padding: '0.75rem', borderTop: '1px solid #dee2e6' }}>
                      <button
                        onClick={() => {
                          const score = prompt('Enter the score:');
                          if (score) updateScore(match._id, score);
                        }}
                        style={{
                          color: '#fff',
                          backgroundColor: '#08096b',
                          borderColor: '#08096b',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          borderRadius: '0.2rem',
                          cursor: 'pointer',
                          transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#00e6d4';
                          e.target.style.borderColor = '#00e6d4';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#08096b';
                          e.target.style.borderColor = '#08096b';
                        }}
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

const UserDashboard = ({ user = { _id: '1', name: 'John Doe', role: 'player' } }) => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // initialize navigate for navigation
  const [token, setToken] = useState(""); // initialize token state


  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };

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
      alert('Score updated successfully!');
    } catch (error) {
      console.error('Error updating score:', error);
      setErrorMessage('Failed to update score. Please try again.');
    }
  };

  const applyForEvent = async (eventId) => {
    try {
      await axios.post(`http://localhost:4000/api/event/${eventId}/apply`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Applied to event successfully!');
      fetchData(); // Refresh the events list
    } catch (error) {
      console.error('Error applying for event:', error);
      setErrorMessage('Failed to apply for event. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #08096b, #00e6d4)',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/MatchMaster.png" alt="Match Master Logo" width="60" height="60" style={{ marginRight: '1rem', objectFit: 'contain' }} />
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              margin: 0,
              color: '#00e6d4'
            }}>
              {user.role === 'umpire' ? 'Umpire Dashboard' : 'Player Dashboard'}
            </h1>
          </div>
          <button className="btn btn-outline-secondary fw-bold"
            onClick={handleLogout}
            style={{
              color: '#fff',
              backgroundColor: 'transparent',
              borderColor: '#08096b',
              padding: '0.375rem 0.75rem',
              fontSize: '1rem',
              lineHeight: '1.5',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              transition: 'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#fff';
              e.target.style.backgroundColor = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#fff';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -15px 1.5rem' }}>
          <div style={{ flex: '0 0 33.333333%', maxWidth: '33.333333%', padding: '0 15px', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#00e6d4', borderRadius: '0.25rem', overflow: 'hidden', transition: 'box-shadow 0.3s ease-in-out' }}>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Total Events</h6>
                  <FaCalendarAlt style={{ color: '#08096b' }} />
                </div>
                <h2 style={{ marginTop: '0.5rem', marginBottom: '0', fontSize: '2.5rem', fontWeight: 'bold' }}>{events.length}</h2>
              </div>
            </div>
          </div>
          <div style={{ flex: '0 0 33.333333%', maxWidth: '33.333333%', padding: '0 15px', marginBottom: '1.5rem' }}>
            <div style={{ backgroundColor: '#00e6d4', borderRadius: '0.25rem', overflow: 'hidden', transition: 'box-shadow 0.3s ease-in-out' }}>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h6 style={{ color: '#6c757d', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Total Matches</h6>
                  <FaTrophy style={{ color: '#08096b' }} />
                </div>
                <h2 style={{ marginTop: '0.5rem', marginBottom: '0', fontSize: '2.5rem', fontWeight: 'bold' }}>{matches.length}</h2>
              </div>
            </div>
          </div>
          {user.role === 'umpire' && (
            <div style={{ flex: '0 0 33.333333%', maxWidth: '33.333333%', padding: '0 15px', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '0.25rem', overflow: 'hidden', boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)', transition: 'box-shadow 0.3s ease-in-out' }}>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h6 style={{ color: '#6c757d', marginBottom:  '0.5rem', fontSize: '0.875rem' }}>Umpire Status</h6>
                    <FaCheckCircle style={{ color: '#08096b' }} />
                  </div>
                  <h2 style={{ marginTop: '0.5rem', marginBottom: '0', fontSize: '2.5rem', fontWeight: 'bold' }}>Active</h2>
                </div>
              </div>
            </div>
          )}
        </div>

        {errorMessage && <div style={{
          padding: '0.75rem 1.25rem',
          marginBottom: '1rem',
          border: '1px solid transparent',
          borderRadius: '0.25rem',
          color: '#721c24',
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb'
        }}>{errorMessage}</div>}

        <ul style={{
          display: 'flex',
          paddingLeft: 0,
          marginBottom: '1.5rem',
          listStyle: 'none',
          borderBottom: '1px solid #dee2e6'
        }}>
          <li style={{ marginRight: '0.5rem' }}>
            <button 
              style={{
                border: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: activeTab === 'events' ? '#fff' : 'transparent',
                color: activeTab === 'events' ? '#08096b' : '#495057',
                borderBottom: activeTab === 'events' ? '2px solid #08096b' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
          </li>
          <li style={{ marginRight: '0.5rem' }}>
            <button 
              style={{
                border: 'none',
                padding: '0.5rem 1rem',
                backgroundColor: activeTab === 'matches' ? '#fff' : 'transparent',
                color: activeTab === 'matches' ? '#08096b' : '#495057',
                borderBottom: activeTab === 'matches' ? '2px solid #08096b' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActiveTab('matches')}
            >
              Matches
            </button>
          </li>
        </ul>

        <div>
          {activeTab === 'events' && <EventList events={events} applyForEvent={applyForEvent} />}
          {activeTab === 'matches' && <MatchList matches={matches} events={events} user={user} updateScore={updateScore} />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;