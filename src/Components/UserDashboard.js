import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaTrophy, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../Images/MM logo.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import { Modal } from "react-bootstrap";
import  UserContext from './UserContext';

const EventList = ({ events, applyForEvent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="card mb-4"
    style={{
      backgroundColor: "#111111",
      border: "2px solid #CCFF00",
      borderRadius: "15px",
    }}
  >
    <div className="card-body">
      <h5 className="card-title mb-4" style={{ color: "#CCFF00" }}>
        Active Events
      </h5>
      <div className="table-responsive">
        <table className="table table-hover" style={{ color: "#FFFFFF" }}>
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
                whileHover={{ backgroundColor: "rgba(204, 255, 0, 0.1)" }}
                transition={{ duration: 0.2 }}
              >
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.sport}</td>
                <td>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 10px rgba(204, 255, 0, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => applyForEvent(event._id)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#CCFF00",
                      color: "#000000",
                      border: "none",
                    }}
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
const AddScoreForm = ({ events, user }) => {
  const [player1Score, setPlayer1Score] = useState("");
  const [player2Score, setPlayer2Score] = useState("");
  const umpireId = localStorage.getItem("id");
  const [matchId, setMatchId] = useState("");
  const [score, setScore] = useState(null);
  const [umpireName, setUmpireName] = useState(""); // Umpire name state
 

  useEffect(() => {
    if (user && user.name) {
      // setUmpireId(user.name); // Set umpireId based on user.name

      // Fetch umpire details based on umpireId
      const fetchUmpireData = async () => {
        try {
          const response = await axios.get(
            `https://pro-backend-yaj1.vercel.app/api/umpires/${user.name}` // Fetch umpire by ID
          );
          setUmpireName(response.data.name); // Set umpire's name if found
        } catch (error) {
          console.error("Error fetching umpire data:", error);
          setUmpireName("Umpire not found"); // Default in case of error
        }
      };

      fetchUmpireData();
    }
  }, [user]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!player1Score || !player2Score) {
      toast.error("Both scores must be provided.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        toast.error("Authorization token is missing. Please log in.");
        return;
      }
  
      const response = await axios.post(
        `https://pro-backend-yaj1.vercel.app/api/score/add`,
        {
          match_id: matchId,
          player1_score: player1Score,
          player2_score: player2Score,
          umpire_id: umpireId, // Send umpireId as part of the request body if required
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token in the Authorization header
          },
        }
      );
  
      setScore(response.data.score);
      toast.success("Score added successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding score. Please try again.");
      console.error("Error adding score:", error);
    }
  };
  
  
  return (
    <div>
      {score ? (
        <h2>
          Score: {score.player1_score} - {score.player2_score}
        </h2>
      ) : (
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label style={{ color: 'black' }}>Player 1 Score:</label>
            <input
              type="number"
              className="form-control"
              value={player1Score}
              onChange={(event) => setPlayer1Score(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label style={{ color: 'black' }}>Player 2 Score:</label>
            <input
              type="number"
              className="form-control"
              value={player2Score}
              onChange={(event) => setPlayer2Score(event.target.value)}
            />
          </div>
          {/* <div className="form-group">
            <label style={{ color: 'black' }}>Umpire:</label>
            <input
              type="text"
              className="form-control"
              value={user._id} // Use fetched umpire name or fallback to user.name
              readOnly
            />
          </div> */}
          <button type="submit" className="btn btn-primary">
            Save Score
          </button>
        </form>
      )}
    </div>
  );
};

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const [matchesData, setMatchesData] = useState([]);

  const user = useContext(UserContext);
  const umpireId = localStorage.getItem("id");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal state
  const [editMatch, setEditMatch] = useState(null); // Match to edit
  const [role, setRole] = useState(localStorage.getItem('role') || 'player');// To store user role (player or umpire)

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Check the user's role (player or umpire)
        const userRole = user?.role; // Assuming user context holds the role info
        setRole(userRole);
        
        let response;
        if (userRole === 'player') {
          // Fetch match data for players
          response = await axios.get(`https://pro-backend-yaj1.vercel.app/api/match/match-player/${user.id}`);
        } else {
          // Fetch match data for umpires
          response = await axios.get(`https://pro-backend-yaj1.vercel.app/api/match/umpire/${umpireId}`);
        }

        const scores = response.data["matches"];

        setMatchesData(response.data["matches"])

        console.log("kzcnkzxnckzxnckzxcnnkxcknc",scores)


        const matches = response.data["matches"];

        // Extract unique event IDs
        const uniqueEventIds = [...new Set(matches.map(match => match.event_id._id))];
        
        console.log("Unique Event IDs:", uniqueEventIds);
              const localtoken = localStorage.getItem("token");
        
        
        // Call the API for each unique event ID
        const eventDetailsPromises = uniqueEventIds.map(async (eventId) => {
          try {
            const eventResponse = await axios.get(`https://pro-backend-yaj1.vercel.app/api/score/${eventId}`, {

              headers: {
                Authorization: `Bearer ${localtoken}` // Include the token in the Authorization header
              }
            });
            return { eventId, eventDetails: eventResponse.data };
          } catch (error) {
            console.error(`Error fetching details for event ID ${eventId}:`, error);
            return null; // Handle errors gracefully
          }
        });
        
        // Resolve all API calls
        Promise.all(eventDetailsPromises)
          .then((detailedEvents) => {
            // Filter out null results (from failed API calls)
            const validEvents = detailedEvents.filter(event => event !== null);
            console.log("Detailed Event Data:", validEvents);
            setMatches(validEvents)
        
            // Process the event details as needed
          })
          .catch((error) => {
            console.error("Error resolving event details:", error);
          });

        

        // const matchDetailsPromises = scores.map(async (score) => {
        //   const matchResponse = await axios.get(`http://localhost:4000/api/score/${scores[0].match_id}`);
        //   return { ...score, match: matchResponse.data };
        // });

        // const matchesWithDetails = await Promise.all(matchDetailsPromises);
        // setMatches(matchesWithDetails); // Set the fetched matches with detailed event data
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, [umpireId, user]);

  const handleEdit = (matchId) => {
    const matchToEdit = matches.find((match) => match.match_id === matchId);
    setEditMatch(matchToEdit); // Set the match to edit
    setIsEditModalOpen(true); // Open modal
  };

  const handleUpdate = async (updatedMatch) => {
    try {
      const response = await axios.put(
        `https://pro-backend-yaj1.vercel.app/api/score/updatescore/${updatedMatch.match_id}`,
        updatedMatch
      );
      
      
      setMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.match_id === updatedMatch.match_id ? updatedMatch : match
        )
      );
      setIsEditModalOpen(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card mb-4"
      style={{
        backgroundColor: "#111111",
        border: "2px solid #CCFF00",
        borderRadius: "15px",
      }}
    >
      <div className="card-body">
        {/* Header Row */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="card-title" style={{ color: "#CCFF00" }}>
            Match List
          </h5>
        </div>

        {/* Match Table */}
        <div className="table-responsive">
          <table className="table table-hover" style={{ color: "#FFFFFF" }}>
            <thead>
            <tr>
            {role === 'player' ? (
                  <>
                    <th>Event Name</th>
                    <th>Player 1 Name</th>
                    <th>Player 2 Name</th>
                    <th>Score</th>
                  </>
                ) : role === 'player' ? (
                  <>
                    <th>Event</th>
                    <th>Player 1 Score</th>
                    <th>Player 2 Score</th>
                    <th>Overall Score</th>
                    <th>Action</th>
                  </>
                ) : (
                  <>
                    <th>Event</th>
                    <th>Player 1 Score</th>
                    <th>Player 2 Score</th>
                    <th>Overall Score</th>
                    <th>Action</th>
                  </>
                )}
        </tr>
            </thead>
            <tbody>
              {matchesData.map((match, index) => (
                <tr key={match._id}>
                  {/* <td>{match.match_id}</td> Display match ID */}
                  <td>{match.event_id?.name || 'N/A'}</td> {/* Display Event Name */}
                  <td>{match.player1_score || 'N/A'}</td> {/* Display Event Name */}
                  <td>{match.player2_score || 'N/A'}</td> {/* Display Event Name */}
                  {role === 'player' ? (
                    <>
                      <td>{match.player1_id.username}</td> {/* Display Player 1 Name */}
                      <td>{match.player2_id.username}</td> {/* Display Player 2 Name */}
                    </>
                  ) : (
                    <>
                      <td>{`${match.player1_score} - ${match.player2_score}`}</td> {/* Display Score */}
                      <td>
                        <button
                          onClick={() => handleEdit(match.match_id)}
                          style={{
                            backgroundColor: "#CCFF00",
                            border: "none",
                            color: "#111111",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal (or form) */}
      {isEditModalOpen && editMatch && (
        <div
          className="modal-overlay"
          style={{
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background overlay
            zIndex: 1000,
          }}
          onClick={() => setIsEditModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="modal-content"
            style={{
              padding: "20px",
              backgroundColor: "#FFF",
              borderRadius: "8px",
              margin: "50px auto",
              width: "50%",
              maxWidth: "600px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal
          >
            <h4 style={{ marginBottom: "20px", color: "#333", fontSize: "1.5rem" }}>Edit Match</h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editMatch);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <div>
                <label htmlFor="player1_score" style={{ fontWeight: "bold", color: "#333" }}>Player 1 Score:</label>
                <input
                  type="number"
                  id="player1_score"
                  value={editMatch.player1_score}
                  onChange={(e) => setEditMatch({ ...editMatch, player1_score: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div>
                <label htmlFor="player2_score" style={{ fontWeight: "bold", color: "#333" }}>Player 2 Score:</label>
                <input
                  type="number"
                  id="player2_score"
                  value={editMatch.player2_score}
                  onChange={(e) => setEditMatch({ ...editMatch, player2_score: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#CCFF00",
                    color: "#111111",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "48%",
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    backgroundColor: "#FF0000",
                    color: "#FFFFFF",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    width: "48%",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};




const UserDashboard = ({
  user = { _id: "1", name: "John Doe", role: "umpire" },
}) => {
  const [events, setEvents] = useState([]);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("events");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // State to control modal visibility
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddScoreForm, setShowAddScoreForm] = useState(false);
  const role = localStorage.getItem('role');
  const username = localStorage.getItem("username");
  // Function to open the login modal
  const openLoginModal = () => setActiveModal("login");

  // Function to close the modal
  const closeModal = () => setActiveModal(null);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    toast.success("Logged out successfully!"); // Show success toast

    setTimeout(() => {
      openLoginModal(); // Open the login modal after a brief delay

      // Navigate away from the current page (e.g., to the home page or login page)
      navigate("/", { replace: true }); // This will navigate the user to the login page
    }, 2000); // Delay to show logout success before opening the login modal
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const localtoken = localStorage.getItem("token");
      setToken(localtoken);
      const headers = { Authorization: `Bearer ${localtoken}` };
      if (user.role === "player") {
        const playerMatchesRes = await axios.get(
          "https://pro-backend-yaj1.vercel.app/api/match/match-player",
          { headers }
        );
        setMatches(playerMatchesRes.data); // Set matches for player
      }
      const [eventsRes, matchesRes] = await Promise.all([
        axios.get("https://pro-backend-yaj1.vercel.app/api/event/active", { headers }),
        axios.get("https://pro-backend-yaj1.vercel.app/api/match/match-player", { headers }),
      ]);
      setEvents(eventsRes.data);
      setMatches(matchesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Failed to load data. Please try again later.");
    }
  };

  const updateScore = async (matchId, score) => {
    if (user.role !== "umpire") return;
    try {
      await axios.put(`https://pro-backend-yaj1.vercel.app/api/matches/${matchId}/score`, {
        score,
      });
      setMatches(
        matches.map((match) =>
          match._id === matchId ? { ...match, score } : match
        )
      );
      toast.success("Score updated successfully!");
    } catch (error) {
      console.error("Error updating score:", error);
      toast.error("Error adding score.");
    }
  };

 

  const applyForEvent = async (eventId) => {
    try {
      await axios.post(
        `https://pro-backend-yaj1.vercel.app/api/event/${eventId}/apply`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Applied to event successfully!");
      fetchData();
    } catch (error) {
      console.error("Error applying for event:", error);
    }
  };
  const getUserRole = () => {
    return localStorage.getItem("role"); // Fetch role from localStorage
  };

  const handleAddScoreClick = () => {
    if (user.role === "umpire") {
      setShowAddScoreForm(true);
    }
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  return (
    <div
      className="min-vh-100"
      style={{ backgroundColor: "#000000", color: "#FFFFFF", padding: "2rem" }}
    >
      <div className="container">
        {/* Header with Dynamic Role Title */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-between align-items-center mb-4"
          style={{
            backgroundColor: "#111111",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(204, 255, 0, 0.2)",
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />

          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Match Master Logo"
              className="logo-square mx-auto mb-1"
              style={{ width: "50px" }}
            />
            <h1 className="h3 fw-bold mb-0 ms-3" style={{ color: "#CCFF00" }}>
              {getUserRole() === "umpire"
                ? "Umpire Dashboard"
                : "Player Dashboard"}
            </h1>
          </div>

          <h1 className="h3 fw-bold mb-0 ms-3" style={{ color: "#CCFF00" }}>
              
              {username}
            </h1>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(204, 255, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn fw-bold"
            onClick={handleLogout}
            style={{
              color: "#000000",
              backgroundColor: "#CCFF00",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              transition: "all 0.3s ease",
            }}
          >
            Logout
          </motion.button>

          {/* Login Modal */}
          <Modal show={activeModal === "login"} onHide={closeModal} centered>
            <Modal.Body style={{ backgroundColor: "#1a1a1a", padding: "0" }}>
              <Login closeModal={closeModal} />
            </Modal.Body>
          </Modal>
      
          
        </motion.header>
        {user.role === "umpire" && (
        <div>
          {/* <button
            className="btn btn-primary"
            onClick={handleAddScoreClick}
          >
            Add Score
          </button> */}

          {/* Modal Popup */}
          {showModal && (
            <div
              className="modal fade show"
              style={{ display: 'block' }}
              tabIndex="-1"
              aria-labelledby="addScoreModalLabel"
              aria-hidden="true"
            >
           <div className="modal-dialog custom-modal-size">
  <div className="modal-content">
    {/* <div className="modal-header">
      <h5 className="modal-title label-black" id="addScoreModalLabel" style={{ color: 'black' }}>Add Score</h5>
      <button
        type="button"
        className="btn-close"
        onClick={handleCloseModal}
        aria-label="Close"
      ></button>
    </div> */}
    {/* <div className="modal-body">
      <AddScoreForm events={events} matches={matches} user={user} />
    </div> */}
    <div className="modal-footer">
      {/* <button
        type="button"
        className="btn btn-secondary"
        onClick={handleCloseModal}
      >
        Close
      </button> */}
      {/* <button
        type="button"
        className="btn btn-primary"
        onClick={handleCloseModal}
      >
        Save Score
      </button> */}
    </div>
  </div>
</div>

            </div>
          )}
        </div>
      )}
        {/* Conditionally Render Stats Based on Role */}
        <div className="row g-4 mb-4">
          {[
            {
              title: "Total Events",
              value: events.length,
              icon: FaCalendarAlt,
            },
            { title: "Total Matches", value: matches.length, icon: FaTrophy },
            {
              title: user.role === "umpire" ? "Umpire Status" : "Player Status",
              value: "Active",
              icon: FaCheckCircle,
            },
          ].map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(204, 255, 0, 0.3)",
                }}
                className="card bg-dark text-white"
                style={{
                  borderRadius: "15px",
                  border: "2px solid #CCFF00",
                  overflow: "hidden",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-subtitle" style={{ color: "#d4d4d4" }}>
                      {item.title}
                    </h6>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon
                        className="fs-4"
                        style={{ color: "#CCFF00" }}
                      />
                    </motion.div>
                  </div>
                  <h2 className="card-title mb-0" style={{ color: "#CCFF00" }}>
                    {item.value}
                  </h2>
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
  style={{ borderBottom: "2px solid #CCFF00" }}
>
  {["events", "matches", ...(user.role === "player" ? ["details"] : [])].map(
    (tab) => (
      <li key={tab} className="nav-item">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`nav-link ${activeTab === tab ? "active" : ""}`}
          onClick={() => setActiveTab(tab)}
          style={{
            backgroundColor: activeTab === tab ? "#CCFF00" : "transparent",
            color: activeTab === tab ? "#000000" : "#FFFFFF",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "5px 5px 0 0",
            fontWeight: "bold",
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </motion.button>
      </li>
    )
  )}
</motion.ul>



        {/* Conditionally Render Events and Matches */}
        <div className="tab-content">
  {activeTab === "events" && (
    <div className="tab-pane active">
      <EventList events={events} applyForEvent={applyForEvent} />
    </div>
  )}

  {activeTab === "matches" && (
    <div className="tab-pane active">
      {role === 'player' ? (
        <UmpireMatchList /> ):(
      <MatchList
        matches={matches}
        events={events}
        user={user}
        updateScore={updateScore}
        role={user.role}
      />
        )}
    </div>
  )}

  {user.role === "player" && activeTab === "details" && (
    <div className="tab-pane active">
      <h5>Match Details</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Umpire</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match._id}>
              <td>{match.event_id.name}</td>
              <td>{match.player1_id.username}</td>
              <td>{match.player2_id.username}</td>
              <td>{match.umpire_id.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>



      </div>

    </div>
  );
};

const UmpireMatchList = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [role, setRole] = useState('');
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token from localStorage

        const response = await axios.get(`https://pro-backend-yaj1.vercel.app/api/match/match-player/`, {
          headers: {
            Authorization: `Bearer ${token}`  // Add token to the Authorization header
          },
          params: { role }  // Pass the role as a query parameter
        });

        setMatches(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (role) {
      fetchMatches();
    }
  }, [role]);

  console.log("00000000000", userId);

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="card mb-4"
    style={{
      backgroundColor: '#111111',
      border: '2px solid #CCFF00',
      borderRadius: '15px',
    }}
  >
    <div className="card-body">
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="card-title" style={{ color: '#CCFF00' }}>
         Event List
        </h5>
      </div>

      {/* Match Table */}
      <div className="table-responsive">
        <table className="table table-hover" style={{ color: '#FFFFFF' }}>
          <thead>
            <tr>
              <th>Umpire ID</th>
              <th>Player 1 ID</th>
              <th>Player 2 ID</th>
              <th>Event</th>
              {role !== 'player' && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match._id}>
                <td>{match.umpire_id.username}</td>
                <td>{match.player1_id.username}</td>
                <td>{match.player2_id.username}</td>
                <td>{match.event_id.name}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </motion.div>
  );
};



export default UserDashboard;