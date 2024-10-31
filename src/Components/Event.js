import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaRunning, FaUsers, FaUserTie, FaUserSecret, FaChevronLeft } from 'react-icons/fa';
import { IoTrophyOutline } from 'react-icons/io5';
import logo from '../Images/MatchMaster.png';

const Event = () => {
  const { id } = useParams(); // Get the event ID from the URL params
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playersDetails, setPlayersDetails] = useState([]);
  const [message, setMessage] = useState('');

  const handleCreateMatches = async () => {
    try {
      // Use the id from useParams as the eventId
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
      } catch (error) {
        setError('Error fetching event details');
        setLoading(false);
      }
    };

    const fetchPlayerDetails = async (playerIds) => {
      try {
        console.log(playerIds);
        const response = await axios.post("http://localhost:4000/api/event/user-profile/list", {
          playerIds: playerIds,
        });
        setPlayersDetails(response.data); // Save the players details
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #08096b, #00e6d4)'
      }}>
        <div className="spinner-border text-white" role="status">
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
        background: 'linear-gradient(to bottom right, #08096b, #00e6d4)',
        color: '#ffffff'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(to bottom right, #08096b, #00e6d4)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Match Master Logo" style={{ width: '80px', height: '80px', marginRight: '1rem' }} />
            <div>
              <h1 style={{ color: '#08096b', margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>Event Details</h1>
              {event && <p style={{ color: '#4a5568', margin: '0.5rem 0 0 0', fontSize: '1.2rem' }}>{event.name}</p>}
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: '#08096b',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#00e6d4'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#08096b'}
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
                <p style={{ color: '#08096b', fontSize: '1.1rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '0.5rem' }}>{event.organizer_id.name}</p>
              ) : (
                <p style={{ color: '#dc3545' }}>Organizer details not available</p>
              )}
            </Section>

            <Section title="Umpires" icon={<FaUserSecret />}>
              {event.umpire_ids && event.umpire_ids.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {event.umpire_ids.map((umpire) => (
                    <li key={umpire._id} style={{ backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '0.5rem', color: '#08096b', fontSize: '1.1rem' }}>{umpire.name}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#dc3545' }}>No umpires assigned.</p>
              )}
            </Section>

            <Section title="Players" icon={<FaUsers />}>
              {event.players && event.players.length > 0 ? (
                <>
                  <ul
                    style={{
                      listStyleType: 'none',
                      padding: 0,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {playersDetails.map(player => (
            <li key={player.id}>
              {player.username}
            </li>
          ))}
                  </ul>
                  <button
                    onClick={handleCreateMatches}
                    style={{
                      backgroundColor: 'navy',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '1rem',
                    }}
                  >
                    Create Matches
                  </button>
                  {message && <p>{message}</p>}
                </>
              ) : (
                <p style={{ color: '#dc3545' }}>No players assigned.</p>
              )}
            </Section>

            <Section title="Matches" icon={<IoTrophyOutline />}>
              {event.matches && event.matches.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {event.matches.map((match) => (
                    <li key={match._id} style={{ 
                      backgroundColor: '#f0f4f8', 
                      padding: '1rem', 
                      borderRadius: '0.5rem', 
                      marginBottom: '1rem', 
                      color: '#08096b',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{match.player1} vs {match.player2}</span>
                      <span style={{ 
                        backgroundColor: match.status === 'completed' ? '#4CAF50' : '#FFA500',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem'
                      }}>{match.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#dc3545' }}>No matches scheduled.</p>
              )}
            </Section>
          </>
        ) : (
          <p style={{ color: '#dc3545', fontSize: '1.2rem', textAlign: 'center' }}>Event not found.</p>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div style={{
    backgroundColor: '#f0f4f8',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  }}
  >
    <div style={{ marginRight: '1.5rem', color: '#08096b', fontSize: '2rem' }}>{icon}</div>
    <div>
      <h3 style={{ fontSize: '1rem', color: '#4a5568', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#08096b', margin: 0 }}>{value}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <div style={{ marginBottom: '3rem' }}>
    <h2 style={{ color: '#08096b', display: 'flex', alignItems: 'center', marginBottom: '1.5rem', fontSize: '1.75rem' }}>
      <span style={{ marginRight: '0.75rem', backgroundColor: '#f0f4f8', padding: '0.5rem', borderRadius: '50%' }}>{icon}</span>
      {title}
    </h2>
    {children}
  </div>
);

export default Event;