import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { FaTrophy, FaUsersLine, FaDollarSign } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import logo from '../Images/MatchMaster.png'; // Import your logo here
import DrawComponent from '../Components/DrawComponent.js'; // Adjust the import path as needed

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [newMatch, setNewMatch] = useState({ eventId: '', player1: '', player2: '', date: '' });
  const [activeTab, setActiveTab] = useState('events');
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    sport: '',
    ageGroup: '',
    matchType: "knockout",
    players: [],
  });

  const [matchDraw, setMatchDraw] = useState([]);
  const navigate = useNavigate();
  const [token, setToken]= useState("");
  
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Replace with your token key
    navigate('/login');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const localtoken = localStorage.getItem('token'); 
      setToken(localtoken);
      const [eventsRes, usersRes, matchesRes, subscriptionRes] = await Promise.all([
        axios.get('http://localhost:4000/api/event/getEventsByOrganizer',
          {
            headers:{
              Authorization:`Bearer ${localtoken}`,
            }
          }
      ),
        axios.get('http://localhost:4000/api/admin/users'),
      ]);
      setEvents(eventsRes.data);
      const unverified = usersRes.data.filter(user => (user.role === 'player' || user.role === 'umpire') && !user.verified); // Filter unverified players and umpires
      setUnverified(unverified); // Only show unverified users
      setSubscription(subscriptionRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/event/create', newEvent,{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      setEvents([...events, res.data]);
      const generatedMatchDraw = await createMatchesForEvent(res.data._id, newEvent.players, newEvent.matchType);
      setMatchDraw(generatedMatchDraw);
      // Reset new event state
      setNewEvent({ name: '', date: '', sport: '', ageGroup: '', matchType: 'knockout', players: [] });
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
        event_id: eventId,   // Use event_id to pass the eventId correctly
        player1_id: player1, // Assuming player1 and player2 are user IDs
        player2_id: player2,
        umpire_id: 'umpireIdHere', // Pass the correct umpire ID, you may fetch this separately
        match_date: newEvent.date, // Ensure the date is passed correctly
        status: 'scheduled'
      });
      
      createdMatches.push(res.data); // Store created match data
    }
      fetchData(); // Refresh data to show the newly created matches
      return matchDraw; // Return the match draw
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
    navigate('/organizer-subscribe');
  };

  return (
    <div className="min-vh-100 custom-gradient p-4">
    <div className="container">
    <header
  className="d-flex justify-content-between align-items-center mb-4"
  style={{
    backgroundColor: '#000', // Black background
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  }}
>
  <div className="d-flex align-items-center">
    <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-1" style={{ width: '50px' }} />
    <h1 className="h3 fw-bold mb-0" style={{ color: '#CCFF00' }}>Organizer Dashboard</h1> {/* #CCFF00 color */}
  </div>
  <button
    className="btn fw-bold"
    onClick={handleLogout}
    style={{
      color: '#fff', // White text
      backgroundColor: '#555', // Grey button background
      borderColor: '#CCFF00', // Border color
      transition: 'background 0.3s ease, color 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#CCFF00'; // Change background to #CCFF00 on hover
      e.target.style.color = '#000'; // Black text on hover
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = '#555'; // Revert to grey background
      e.target.style.color = '#fff'; // Revert to white text
    }}
  >
    Logout
  </button>
</header>

      <div className="row g-4 mb-4">
  {[
    { title: "Total Events", value: events.length, icon: IoCalendarNumberSharp, color: "bg-dark" },
    { title: "Total Matches", value: matches.length, icon: FaTrophy, color: "bg-dark" },
    { title: "Unverified Users", value: unverified.length, icon: FaUsersLine, color: "bg-dark" },
  ].map((item, index) => (
    <div key={index} className="col-md-6 col-lg-3">
      <div 
        className={`card ${item.color} text-white card-pop`}
        style={{
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="card-subtitle">{item.title}</h6>
            <item.icon className="fs-4 icon-pop" style={{ transition: 'color 0.3s ease' }} />
          </div>
          <h2 className="card-title mb-0">{item.value}</h2>
        </div>
      </div>
    </div>
  ))}

  {/* Subscription Status Integrated into the Card Grid */}
  <div className="col-md-6 col-lg-3">
    <div 
      className="card bg-dark text-white card-pop"
      style={{
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease-in-out',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="card-subtitle">Subscription Status</h6>
          <FaDollarSign className="fs-4 icon-pop" style={{ transition: 'color 0.3s ease' }} />
        </div>
        <button 
          className="btn btn-primary mt-3 subscribe-button"
          style={{
            backgroundColor: '#CCFF00',
            borderColor: '#CCFF00',
            color: '#000',
            borderRadius: '10px',
            transition: 'background 0.3s ease-in-out',
          }}
          onClick={handleSubscribe}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#AABB00')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#CCFF00')}
        >
          Subscribe Now
        </button>
      </div>
    </div>
  </div>
</div>
        <ul className="nav nav-tabs mb-4 gap-4">
  <li className="nav-item fw-bold">
    <button
      className={`nav-link bg-white ${activeTab === 'events' ? 'active' : ''}`}
      onClick={() => setActiveTab('events')}
      style={{
        color: activeTab === 'events' ? '#0dcaf0' : '#000',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#0dcaf0')}
      onMouseLeave={(e) => (e.target.style.color = activeTab === 'events' ? '#0dcaf0' : '#000')}
    >
      Events
    </button>
  </li>
  <li className="nav-item fw-bold">
    <button
      className={`nav-link bg-white ${activeTab === 'analytics' ? 'active' : ''}`}
      onClick={() => setActiveTab('analytics')}
      style={{
        color: activeTab === 'analytics' ? '#0dcaf0' : '#000',
        transition: 'color 0.3s ease',
      }}
      onMouseEnter={(e) => (e.target.style.color = '#0dcaf0')}
      onMouseLeave={(e) => (e.target.style.color = activeTab === 'analytics' ? '#0dcaf0' : '#000')}
    >
      Analytics
    </button>
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
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
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
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="eventSport" className="form-label">Sport</label>
                    <select
                      className="form-select"
                      id="eventSport"
                      value={newEvent.sport}
                      onChange={(e) => setNewEvent({ ...newEvent, sport: e.target.value })}
                      required
                    >
                      <option value="">Select a sport</option>
                      <option value="table-tennis">Table Tennis</option>
                      <option value="carom">Carom</option>
                      <option value="chess">Chess</option>
                      <option value="badminton">Badminton</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="eventAgeGroup" className="form-label">Age Group</label>
                    <select
                      className="form-select"
                      id="eventAgeGroup"
                      value={newEvent.ageGroup}
                      onChange={(e) => setNewEvent({ ...newEvent, ageGroup: e.target.value })}
                      required
                    >
                      <option value="">Select age group</option>
                      <option value="under-12">Under 12</option>
                      <option value="under-15">Under 15</option>
                      <option value="under-18">Under 18</option>
                      <option value="adult">Adult</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="matchType" className="form-label">Match Type</label>
                    <select
                      className="form-select"
                      id="matchType"
                      value={newEvent.matchType}
                      onChange={(e) => setNewEvent({ ...newEvent, matchType: e.target.value })}
                      required
                    >
                      <option value="knockout">Knockout</option>
                      <option value="league">League</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-secondary fw-bold mt-3" style={{ backgroundColor: 'navy', color: 'white' }}>
                  Create Event and Generate Draw
                </button>
              </form>
            </div>
          </div>
          <div>
               {/* Include the DrawComponent */}
        {matchDraw.length > 0 && <DrawComponent draw={matchDraw} />}
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
                              <button className="btn btn-outline-secondary fw-bold"onClick={() => navigate(`/organizer-dashboard/event/${event._id}`)}>View</button>
                              <button className="btn btn-outline-secondary fw-bold ms-2"onClick={() => navigate(`/organizer-dashboard/event/edit/${event._id}`)}>Edit</button>
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