import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUsersLine } from "react-icons/fa6";
import { LuCheckCircle } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa6";
import { LuBarChart3 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import logo from '../Images/MatchMaster.png'; // Import your logo here
import "../CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const [organizers, setOrganizers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('organizers');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [organizersRes, paymentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/organizers'),
        axios.get('http://localhost:5000/api/payments')
      ]);
      setOrganizers(organizersRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOrganizer = async (organizerId) => {
    try {
      await axios.patch(`http://localhost:5000/api/organizers/verify/${organizerId}`);
      fetchData();
    } catch (error) {
      console.error('Error verifying organizer:', error);
    }
  };

  const approvePayment = async (paymentId) => {
    try {
      await axios.patch(`http://localhost:5000/api/payments/approve/${paymentId}`);
      fetchData();
    } catch (error) {
      console.error('Error approving payment:', error);
    }
  };

  const filteredOrganizers = organizers.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = payments.filter(payment =>
    payment.organizerId.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-vh-100 custom-gradient p-4">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
          <img src={logo} alt="Match Master Logo" className="me-3" style={{width: '48px', height: '48px'}} />
            <h1 className="h3 fw-bold text-white mb-0">Admin Dashboard</h1>
          </div>
          <button className="btn btn-outline-light">
            Logout
          </button>
        </header>

        <div className="row g-4 mb-4">
          {[
            { title: "Total Users", value: organizers.length, icon: FaUsersLine, color: "bg-info" },
            { title: "Pending Verifications", value: organizers.filter(org => org.status === 'pending').length, icon: LuCheckCircle, color: "bg-info" },
            { title: "Total Revenue", value: `$${payments.reduce((sum, payment) => sum + payment.amount, 0)}`, icon: FaDollarSign, color: "bg-info" },
            { title: "Pending Payments", value: payments.filter(payment => payment.status === 'pending').length, icon: LuBarChart3, color: "bg-info" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`col-md-6 col-lg-3`}
            >
              <div className={`${item.color} text-white p-3 rounded`}>
                <div className="d-flex justify-content-between mb-2">
                  <h2 className="h6 mb-0">{item.title}</h2>
                  <item.icon className="fs-4" />
                </div>
                <div className="h2 fw-bold mb-0">
                  {item.value}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="search" className="form-label text-white">Search</label>
          <div className="input-group">
            <span className="input-group-text">
              <IoSearch className="text-muted" />
            </span>
            <input
              id="search"
              className="form-control"
              placeholder="Search organizers or payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'organizers' ? 'active' : ''}`}
              onClick={() => setActiveTab('organizers')}
            >
              Organizers
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
          </li>
        </ul>

        {loading ? (
          <div className="text-center py-4">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'organizers' && (
              <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="p-4">
                  <h2 className="h5 mb-3">Organizers</h2>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Registration Date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrganizers.map((organizer) => (
                          <tr key={organizer._id}>
                            <td>{organizer.name}</td>
                            <td>{organizer.email}</td>
                            <td>{new Date(organizer.registrationDate).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge ${
                                organizer.status === 'verified' ? 'bg-success' : 'bg-warning'
                              }`}>
                                {organizer.status}
                              </span>
                            </td>
                            <td>
                              {organizer.status === 'pending' && (
                                <button
                                  onClick={() => verifyOrganizer(organizer._id)}
                                  className="btn btn-primary btn-sm"
                                >
                                  Verify
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded shadow-sm overflow-hidden">
                <div className="p-4">
                  <h2 className="h5 mb-3">Payments</h2>
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Organizer</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayments.map((payment) => (
                          <tr key={payment._id}>
                            <td>{payment.organizerId.name}</td>
                            <td>${payment.amount}</td>
                            <td>
                              <span className={`badge ${
                                payment.status === 'approved' ? 'bg-success' : 'bg-warning'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td>
                              {payment.status === 'pending' && (
                                <button
                                  onClick={() => approvePayment(payment._id)}
                                  className="btn btn-primary btn-sm"
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;