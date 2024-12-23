import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaRunning, FaUsers, FaUserTie, FaUserSecret, FaChevronLeft } from 'react-icons/fa';
import { IoTrophyOutline } from 'react-icons/io5';
import logo from "../Images/new MM logo.png";


const Event = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playersDetails, setPlayersDetails] = useState([]);
  const [umpireDetails, setUmpireDetails] = useState([]);
  const [message, setMessage] = useState('');
  const [matches, setMatches] = useState([]);

  const handleCreateMatches = useCallback(async () => {
    try {
      const response = await axios.post(`https://pro-backend-yaj1.vercel.app/api/event/${id}/generate-matches`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to generate matches");
    }
  }, [id]);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await axios.get(`https://pro-backend-yaj1.vercel.app/api/event/getEventsByEventId/${id}`);
      setEvent(response.data);
      setLoading(false);
      fetchPlayerDetails(response.data.players);
      fetchUmpireDetails(response.data.umpire_ids);
    } catch (error) {
      setError('Error fetching event details');
      setLoading(false);
    }
  }, [id]);

  const fetchPlayerDetails = useCallback(async (playerIds) => {
    try {
      const response = await axios.post("https://pro-backend-yaj1.vercel.app/api/user-profile/list", {
        playerIds: playerIds,
      });
      setPlayersDetails(response.data);
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  }, []);

  const fetchUmpireDetails = useCallback(async (umpireIds) => {
    try {
      const response = await axios.post("https://pro-backend-yaj1.vercel.app/api/user-profile/umpire-list", {
        umpireIds: umpireIds,
      });
      setUmpireDetails(response.data);
    } catch (error) {
      console.error("Error fetching umpire details:", error);
    }
  }, []);

  const fetchMatches = useCallback(async () => {
    if (event && event._id) {
      try {
        const response = await axios.get(`https://pro-backend-yaj1.vercel.app/api/match/event/${event._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error.message);
      }
    }
  }, [event]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#121212',
      }}>
        <div style={{ 
          border: '4px solid rgba(174, 25, 27, 0.1)', 
          borderLeftColor: '#AE191B',  
          borderRadius: '50%',  
          width: '40px',  
          height: '40px',  
          animation: 'spin 1s linear infinite',
        }}></div>
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
        backgroundColor: '#121212', 
        color: '#AE191B', 
        fontSize: '1.2rem',
      }}>
        {error}
      </div>
    );
  }

  const containerStyle = { 
    minHeight: '100vh', 
    padding: '2rem', 
    backgroundColor: '#121212', 
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
  };

  const contentStyle = { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '2rem', 
    backgroundColor: '#1e1e1e', 
    borderRadius: '1rem', 
    boxShadow: '0 0 30px rgba(174, 25, 27, 0.3)', 
  };

  const headerStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '2rem',
  };

  const logoTitleStyle = { 
    display: 'flex',  
    alignItems: 'center', 
  };

  const logoStyle = { 
    width: '80px', 
    height: '80px', 
    marginRight: '1rem', 
  };

  const titleStyle = { 
    color: '#AE191B', 
    margin: 0, 
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
  };

  const subtitleStyle = { 
    color: '#d4d4d4', 
    margin: '0.5rem 0 0 0', 
    fontSize: '1.2rem', 
  };

  const backButtonStyle = { 
    backgroundColor: '#AE191B', 
    color: 'white', 
    padding: '0.75rem 1.5rem', 
    borderRadius: '0.5rem', 
    border: 'none', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    transition: 'all 0.3s ease', 
    boxShadow: '0 0 10px rgba(174, 25, 27, 0.5)',
  };

  const infoCardsStyle = { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
    gap: '1.5rem', 
    marginBottom: '3rem', 
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <header style={headerStyle}>
          <div style={logoTitleStyle}>
            <img src="/new MM logo.png" alt="Match Master Logo" style={logoStyle} />
            <div>
              <h1 style={titleStyle}>Event Details</h1>
              {event && <p style={subtitleStyle}>{event.name}</p>}
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={backButtonStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(174, 25, 27, 0.8)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(174, 25, 27, 0.5)';
            }}
          >
            <FaChevronLeft style={{ marginRight: '0.5rem' }} /> Back
          </button>
        </header>

        {event ? (
          <>
            <div style={infoCardsStyle}>
              <InfoCard icon={<FaCalendarAlt />} title="Date" value={new Date(event.date).toLocaleDateString()} />
              <InfoCard icon={<FaRunning />} title="Sport" value={event.sport} />
              <InfoCard icon={<FaUsers />} title="Age Group" value={event.ageGroup} />
              <InfoCard icon={<IoTrophyOutline />} title="Match Type" value={event.matchType} />
            </div>

            <Section title="Organizer" icon={<FaUserTie />}>
              {event.organizer_id ? (
                <p style={{  
                  color: '#AE191B',  
                  fontSize: '1.1rem',  
                  backgroundColor: '#2a2a2a',  
                  padding: '1rem',  
                  borderRadius: '0.5rem',
                  border: '1px solid #AE191B',
                }}>{event.organizer_id.name}</p>
              ) : (
                <p style={{ color: '#AE191B' }}>Organizer details not available</p>
              )}
            </Section>

            <Section title="Umpires" icon={<FaUserSecret />}>
              {umpireDetails && umpireDetails.length > 0 ? (
                <ul style={{  
                  listStyleType: 'none',  
                  padding: 0,  
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '1rem' 
                }}>
                  {umpireDetails.map(umpire => (
                    <li key={umpire.id} style={{
                      backgroundColor: '#2a2a2a',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      color: '#AE191B',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 0 10px rgba(174, 25, 27, 0.2)',
                      border: '1px solid #AE191B',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(174, 25, 27, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(174, 25, 27, 0.2)';
                    }}
                    >{umpire.username}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#AE191B' }}>No umpires assigned.</p>
              )}
            </Section>

            <Section title="Players" icon={<FaUsers />}>
              {playersDetails && playersDetails.length > 0 ? (
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
                        backgroundColor: '#2a2a2a', 
                        padding: '1rem', 
                        borderRadius: '0.5rem', 
                        color: '#AE191B', 
                        fontSize: '1.1rem', 
                        transition: 'all 0.3s ease', 
                        boxShadow: '0 0 10px rgba(174, 25, 27, 0.2)',
                        border: '1px solid #AE191B',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(174, 25, 27, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(174, 25, 27, 0.2)';
                      }}
                      >{player.username}</li>
                    ))}
                  </ul>
                  <button
                    onClick={handleCreateMatches}
                    style={{ 
                      backgroundColor: '#AE191B',
                      color: 'white',
                      padding: '0.75rem 1.5rem', 
                      border: 'none', 
                      borderRadius: '0.5rem', 
                      cursor: 'pointer', 
                      marginTop: '1rem', 
                      fontWeight: 'bold', 
                      transition: 'all 0.3s ease', 
                      boxShadow: '0 0 10px rgba(174, 25, 27, 0.5)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(174, 25, 27, 0.8)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(174, 25, 27, 0.5)';
                    }}
                  >
                    Create Matches
                  </button>
                  {message && <p style={{ color: '#AE191B', marginTop: '1rem' }}>{message}</p>}
                </>
              ) : (
                <p style={{ color: '#AE191B' }}>No players assigned.</p>
              )}
            </Section>

            <Section title="Matches" icon={<IoTrophyOutline />}>
              {matches && matches.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {matches.map((match) => (
                    match && match._id ? (
                      <li
                        key={match._id}
                        style={{ 
                          backgroundColor: '#2a2a2a', 
                          padding: '1rem', 
                          borderRadius: '0.5rem',
                          marginBottom: '1rem',
                          color: '#AE191B',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 0 10px rgba(174, 25, 27, 0.2)',
                          border: '1px solid #AE191B',
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(174, 25, 27, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = '0 0 10px rgba(174, 25, 27, 0.2)';
                        }}
                      >
                        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                          {match.player1 || 'Player 1'} vs {match.player2 || 'Player 2'}
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
                    ) : null
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#AE191B' }}>No matches scheduled.</p>
              )}
            </Section>
          </>
        ) : (
          <p style={{ color: '#AE191B', fontSize: '1.2rem', textAlign: 'center' }}>Event not found.</p>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div style={{
    backgroundColor: '#2a2a2a',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 0 15px rgba(174, 25, 27, 0.2)',
    transition: 'all 0.3s ease',
    border: '1px solid #AE191B',
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 0 25px rgba(174, 25, 27, 0.4)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 0 15px rgba(174, 25, 27, 0.2)';
  }}
  >
    <div style={{ marginRight: '1.5rem', color: '#AE191B', fontSize: '2rem' }}>{icon}</div>
    <div>
      <h3 style={{ fontSize: '1rem', color: '#d4d4d4', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#AE191B', margin: 0 }}>{value}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{ color: '#AE191B', display: 'flex', alignItems: 'center', marginBottom: '1.5rem', fontSize: '1.75rem' }}>
      <span style={{ marginRight: '0.75rem', backgroundColor: '#2a2a2a', padding: '0.5rem', borderRadius: '50%' }}>{icon}</span>
      {title}
    </h2>
    {children}
  </div>
);

export default Event;