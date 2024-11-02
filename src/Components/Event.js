import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaRunning, FaUsers, FaUserTie, FaUserSecret, FaChevronLeft } from 'react-icons/fa';
import { IoTrophyOutline } from 'react-icons/io5';
import logo from '../Images/MM logo.jpeg';

const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playersDetails, setPlayersDetails] = useState([]);
  const [UmpireDetails, setUmpiresDetails] = useState([]);
  const [message, setMessage] = useState('');
  const [matches, setMatches] = useState([]);


  const handleCreateMatches = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/event/${id}/generate-matches`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to generate matches");
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/event/getEventsByEventId/${id}`);
        setEvent(response.data);
        setLoading(false);
        fetchPlayerDetails(response.data.players);
        fetchUmpireDetails(response.data.umpire_ids);
      } catch (error) {
        setError('Error fetching event details');
        setLoading(false);
      }
    };

    const fetchPlayerDetails = async (playerIds) => {
      try {
        const response = await axios.post("http://localhost:4000/api/user-profile/list", {
          playerIds: playerIds,
        });
        setPlayersDetails(response.data);
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    const fetchUmpireDetails = async (playerIds) => {
      try {
        const response = await axios.post("http://localhost:4000/api/user-profile/umpire-list", {
          umpireIds: playerIds,
        });
        setUmpiresDetails(response.data);
      } catch (error) {
        console.error("Error fetching umpire details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  // Fetch matches for the specific event
  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/match/event/${event._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });
      setMatches(response.data); // Update state with matches data
    } catch (error) {
      console.error('Error fetching matches:', error.message);
    }
  };

  // Fetch matches when component mounts or event changes
  useEffect(() => {
    if (event && event._id) { // Check if event and event._id are defined
      fetchMatches();
    }
  }, [event]);

  if (loading) {

    
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
        <div className="spinner-border text-ccff00" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: 'black',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#111',
        borderRadius: '1rem',
        boxShadow: '0 0 30px rgba(204, 255, 0, 0.2)',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Match Master Logo" style={{ width: '80px', height: '80px', marginRight: '1rem' }} />
            <div>
              <h1 style={{ color: '#CCFF00', margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>Event Details</h1>
              {event && <p style={{ color: '#d4d4d4', margin: '0.5rem 0 0 0', fontSize: '1.2rem' }}>{event.name}</p>}
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: '#CCFF00',
              color: 'black',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.5)';
            }}
          >
            <FaChevronLeft style={{ marginRight: '0.5rem' }} /> Back
          </button>
        </header>

        {event ? (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              <InfoCard icon={<FaCalendarAlt />} title="Date" value={new Date(event.date).toLocaleDateString()} />
              <InfoCard icon={<FaRunning />} title="Sport" value={event.sport} />
              <InfoCard icon={<FaUsers />} title="Age Group" value={event.ageGroup} />
              <InfoCard icon={<IoTrophyOutline />} title="Match Type" value={event.matchType} />
            </div>

            <Section title="Organizer" icon={<FaUserTie />}>
              {event.organizer_id ? (
                <p style={{ color: '#CCFF00', fontSize: '1.1rem', backgroundColor: '#222', padding: '1rem', borderRadius: '0.5rem' }}>{event.organizer_id.name}</p>
              ) : (
                <p style={{ color: '#ff6b6b' }}>Organizer details not available</p>
              )}
            </Section>

            <Section title="Umpires" icon={<FaUserSecret />}>
              {event.umpire_ids && event.umpire_ids.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {UmpireDetails.map(umpire => (
                      <li key={umpire.id} style={{
                        backgroundColor: '#222',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        color: '#CCFF00',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(204, 255, 0, 0.2)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.2)';
                      }}
                      >{umpire.username}</li>
                    ))}
                </ul>
              ) : (
                <p style={{ color: '#ff6b6b' }}>No umpires assigned.</p>
              )}
            </Section>

            <Section title="Players" icon={<FaUsers />}>
              {event.players && event.players.length > 0 ? (
                <>
                  <ul style={{
                    listStyleType: 'none',
                    padding: 0,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                  }}>
                    {playersDetails.map(player => (
                      <li key={player.id} style={{
                        backgroundColor: '#222',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        color: '#CCFF00',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 10px rgba(204, 255, 0, 0.2)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.2)';
                      }}
                      >{player.username}</li>
                    ))}
                  </ul>
                  <button
                    onClick={handleCreateMatches}
                    style={{
                      backgroundColor: '#CCFF00',
                      color: 'black',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      marginTop: '1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 0 10px rgba(204, 255, 0, 0.5)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.8)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.5)';
                    }}
                  >
                    Create Matches
                  </button>
                  {message && <p style={{ color: '#CCFF00', marginTop: '1rem' }}>{message}</p>}
                </>
              ) : (
                <p style={{ color: '#ff6b6b' }}>No players assigned.</p>
              )}
            </Section>

            <Section title="Matches" icon={<IoTrophyOutline />}>
  {matches && matches.length > 0 ? (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {matches.map((match) => (
        match && match._id ? ( // Check if match is not null and has an _id
          <li
            key={match._id}
            style={{
              backgroundColor: '#222',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              color: '#CCFF00',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px rgba(204, 255, 0, 0.2)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(204, 255, 0, 0.2)';
            }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              {match.player1 || 'Unknown Player 1'} vs {match.player2 || 'Unknown Player 2'}
            </span>
            <span style={{
              backgroundColor: match.status === 'completed' ? '#4CAF50' : '#FFA500',
              color: 'black',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.9rem'
            }}>
              {match.status || 'Unknown Status'}
            </span>
          </li>
        ) : null // Render null if match is invalid
      ))}
    </ul>
  ) : (
    <p style={{ color: '#ff6b6b' }}>No matches scheduled.</p>
  )}
</Section>
          </>
        ) : (
          <p style={{ color: '#ff6b6b', fontSize: '1.2rem', textAlign: 'center' }}>Event not found.</p>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div style={{
    backgroundColor: '#222',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 15px rgba(204, 255, 0, 0.2)',
    transition: 'all 0.3s ease',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 0 25px rgba(204, 255, 0, 0.4)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 0 15px rgba(204, 255, 0, 0.2)';
  }}
  >
    <div style={{ marginRight: '1.5rem', color:  '#CCFF00', fontSize: '2rem' }}>{icon}</div>
    <div>
      <h3 style={{ fontSize: '1rem', color: '#d4d4d4', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#CCFF00', margin: 0 }}>{value}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{ color: '#CCFF00', display: 'flex', alignItems: 'center', marginBottom: '1.5rem', fontSize: '1.75rem' }}>
      <span style={{ marginRight: '0.75rem', backgroundColor: '#222', padding: '0.5rem', borderRadius: '50%' }}>{icon}</span>
      {title}
    </h2>
    {children}
  </div>
);

export default Event;