import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Event = () => {
  const { id } = useParams(); // Fetch the event id from the URL
  const [event, setEvent] = useState(null); // State for event details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch event details from the server
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/event/getEventsByEventId/${event._id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  return (
    <div className="container mt-4">
      {event ? (
        <div>
          <h2>{event.name}</h2>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Sport:</strong> {event.sport}</p>
          <p><strong>Age Group:</strong> {event.ageGroup}</p>
          <p><strong>Match Type:</strong> {event.matchType}</p>
          <p><strong>Status:</strong> {event.status}</p>

          {/* Organizer Details */}
          <div>
            <h4>Organizer</h4>
            {event.organizer_id ? (
              <p>{event.organizer_id.name}</p> // Assuming organizer details include the name
            ) : (
              <p>Organizer details not available</p>
            )}
          </div>

          {/* Umpires List */}
          <div>
            <h4>Umpires</h4>
            {event.umpire_ids && event.umpire_ids.length > 0 ? (
              <ul>
                {event.umpire_ids.map((umpire) => (
                  <li key={umpire._id}>{umpire.name}</li> // Assuming umpire details include the name
                ))}
              </ul>
            ) : (
              <p>No umpires assigned.</p>
            )}
          </div>

          {/* Players List */}
          <div>
            <h4>Players</h4>
            {event.players && event.players.length > 0 ? (
              <ul>
                {event.players.map((player, index) => (
                  <li key={index}>{player}</li> // Displaying player names from the array
                ))}
              </ul>
            ) : (
              <p>No players assigned.</p>
            )}
          </div>

          {/* Matches List */}
          <div>
            <h4>Matches</h4>
            {event.matches && event.matches.length > 0 ? (
              <ul>
                {event.matches.map((match) => (
                  <li key={match._id}>
                    Match: {match.player1} vs {match.player2} - Status: {match.status}
                  </li> // Assuming each match includes player1, player2, and match status
                ))}
              </ul>
            ) : (
              <p>No matches scheduled.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Event not found.</p>
      )}
    </div>
  );
};

export default Event;
