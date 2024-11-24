import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUsersLine, FaDollarSign } from "react-icons/fa6";
import { LuCheckCircle, LuBarChart3 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import logo from "../Images/MM logo.jpeg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";
import { Modal } from "react-bootstrap";

const AdminDashboard = () => {
  const [organizers, setOrganizers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("organizers");
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const colors = {
    darkNavy: "#031930",
    navy: "#223A59",
    blue: "#3684DB",
    iceBlue: "#B3D6F9",
    gray: "#758BA5",
    white: "#D1DDED"
  };

  const openLoginModal = () => setActiveModal("login");
  const closeModal = () => setActiveModal(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      openLoginModal();
      navigate("/", { replace: true });
    }, 2000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, paymentsRes] = await Promise.all([
        axios.get("http://localhost:4000/api/admin/users"),
        axios.get("http://localhost:4000/api/payments/getAllPayments"),
      ]);

      const allUsers = usersRes.data;
      const allPayments = paymentsRes.data;

      const filteredOrganizers = allUsers.filter(
        (user) => user.role === "organizer"
      );

      setOrganizers(filteredOrganizers);
      setUsers(allUsers);
      setPayments(allPayments);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOrganizer = async (organizerId) => {
    try {
      await axios.post(
        `http://localhost:4000/api/admin/verify-organizer/${organizerId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error verifying organizer:", error);
    }
  };

  const approvePayment = async (paymentId) => {
    try {
      await axios.get(
        `http://localhost:4000/api/payments/approvePayment/${paymentId}`
      );
      fetchData();
      toast.success("Payment approved successfully!");
    } catch (error) {
      console.error("Error approving payment:", error);
      toast.error("Failed to approve payment.");
    }
  };

  const filteredOrganizers = organizers.filter(
    (org) =>
      org.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(
    (payment) =>
      payment.userId.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-vh-100"
      style={{ 
        background: `#000000`,
        color: colors.white,
        padding: "2rem"
      }}
    >
      <div className="container">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="d-flex justify-content-between align-items-center mb-5"
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
              style={{ width: "50px", height: "50px" }}
            />
            <h1 className="h3 fw-bold mb-0 ms-3" style={{ color: colors.iceBlue }}>
              Admin Dashboard
            </h1>
          </div>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px ${colors.blue}80`,
            }}
            whileTap={{ scale: 0.95 }}
            className="btn fw-bold"
            onClick={handleLogout}
            style={{
              backgroundColor: colors.blue,
              color: colors.white,
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "5px",
            }}
          >
            Logout
          </motion.button>
        </motion.header>

        <Modal show={activeModal === "login"} onHide={closeModal} centered>
          <Modal.Body style={{ backgroundColor: colors.darkNavy, padding: "0" }}>
            <Login closeModal={closeModal} />
          </Modal.Body>
        </Modal>

        <div className="row g-4 mb-4">
          {[
            { title: "Total Users", value: users.length, icon: FaUsersLine },
            {
              title: "Pending Verifications",
              value: organizers.filter((org) => !org.isVerified).length,
              icon: LuCheckCircle,
            },
            {
              title: "Total Revenue",
              value: `$${payments.reduce((sum, payment) => sum + payment.amount, 0)}`,
              icon: FaDollarSign,
            },
            {
              title: "Pending Payments",
              value: payments.filter((payment) => payment.status === "pending").length,
              icon: LuBarChart3,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="col-md-6 col-lg-3"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px ${colors.blue}40`,
                }}
                className="p-3 rounded"
                style={{
                  backgroundColor: colors.navy,
                  border: `1px solid ${colors.blue}`,
                  boxShadow: `0 0 10px ${colors.blue}20`,
                }}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h2 className="h6 mb-0" style={{ color: colors.iceBlue }}>
                    {item.title}
                  </h2>
                  <item.icon className="fs-4" style={{ color: colors.blue }} />
                </div>
                <div className="h2 fw-bold mb-0" style={{ color: colors.white }}>
                  {item.value}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="search" className="form-label" style={{ color: colors.iceBlue }}>
            Search
          </label>
          <div className="input-group">
            <span
              className="input-group-text"
              style={{
                backgroundColor: colors.navy,
                border: `1px solid ${colors.blue}`,
              }}
            >
              <IoSearch style={{ color: colors.blue }} />
            </span>
            <input
              id="search"
              className="form-control"
              placeholder="Search organizers, users or payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: colors.navy,
                color: colors.white,
                border: `1px solid ${colors.blue}`,
              }}
            />
          </div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="nav nav-tabs mb-4 gap-4"
          style={{ borderBottom: `2px solid ${colors.blue}` }}
        >
          {["organizers", "payments", "users"].map((tab) => (
            <li key={tab} className="nav-item">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                style={{
                  backgroundColor: activeTab === tab ? colors.blue : "transparent",
                  color: activeTab === tab ? colors.white : colors.iceBlue,
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "5px 5px 0 0",
                  fontWeight: "bold",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            </li>
          ))}
        </motion.ul>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border" role="status" style={{ color: colors.blue }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === "organizers" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded shadow-sm overflow-hidden"
                style={{
                  backgroundColor: colors.navy,
                  border: `2px solid ${colors.blue}`,
                }}
              >
                <div className="p-4">
                  <h2 className="h5 mb-3" style={{ color: colors.iceBlue }}>
                    Organizers
                  </h2>
                  <div className="table-responsive">
                    <table className="table table-hover" style={{ color: colors.white }}>
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${colors.blue}30` }}>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Registration Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrganizers.map((organizer) => (
                          <tr key={organizer._id} style={{ borderBottom: `1px solid ${colors.blue}20` }}>
                            <td>{organizer.username}</td>
                            <td>{organizer.email}</td>
                            <td>{new Date(organizer.registrationDate).toLocaleDateString()}</td>
                            <td>
                              <span
                                className={`badge ${
                                  organizer.isVerified ? "bg-success" : "bg-warning"
                                }`}
                              >
                                {organizer.isVerified ? "verified" : "pending"}
                              </span>
                            </td>
                            <td>
                              {!organizer.isVerified && (
                                <motion.button
                                  whileHover={{
                                    scale: 1.05,
                                    boxShadow: `0 0 10px ${colors.blue}80`,
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => verifyOrganizer(organizer._id)}
                                  className="btn btn-sm"
                                  style={{
                                    backgroundColor: colors.blue,
                                    color: colors.white,
                                    border: "none",
                                  }}
                                >
                                  Verify
                                </motion.button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded shadow-sm overflow-hidden"
                style={{
                  backgroundColor: colors.navy,
                  border: `2px solid ${colors.blue}`,
                }}
              >
                <div className="p-4">
                  <h2 className="h5 mb-3" style={{ color: colors.iceBlue }}>
                    Payments
                  </h2>
                  <div className="table-responsive">
                    <table
                      className="table table-hover"
                      style={{ color: colors.white }}
                    >
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${colors.blue}30` }}>
                          <th>Organizer Name</th>
                          <th>Payment Plan</th>
                          <th>Amount</th>
                          <th>Payment Date</th>
                          <th>Payment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment._id} style={{ borderBottom: `1px solid ${colors.blue}20` }}>
                            <td>
                              {payment.userId
                                ? payment.userId.username
                                : "Unknown Organizer"}
                            </td>
                            <td>
                            {payment.plan}
                            </td>
                            <td>${payment.amount}</td>
                            <td>
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                            <span
                                className={`badge ${
                                  payment.status === "approved"
                                    ? "bg-success"
                                    : "bg-warning"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "users" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded shadow-sm overflow-hidden"
                style={{
                  backgroundColor: colors.navy,
                  border: `2px solid ${colors.blue}`,
                }}
              >
                <div className="p-4">
                  <h2 className="h5 mb-3" style={{ color: colors.iceBlue }}>
                    Users
                  </h2>
                  <div className="table-responsive">
                    <table
                      className="table table-hover"
                      style={{ color: colors.white }}
                    >
                      <thead>
                        <tr style={{ borderBottom: `2px solid ${colors.blue}30` }}>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user._id} style={{ borderBottom: `1px solid ${colors.blue}20` }}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;