import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, CheckCircle, DollarSign, BarChart3, Search } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-[#e6f7ff] via-white to-[#e6fffa] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img src="/MatchMaster.png" alt="Match Master Logo" className="w-12 h-12" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-transparent bg-clip-text">
              Admin Dashboard
            </h1>
          </div>
          <button className="bg-gradient-to-r from-[#1e3a8a] to-[#40e0d0] text-white hover:from-[#40e0d0] hover:to-[#1e3a8a] transition-all duration-300 px-4 py-2 rounded">
            Logout
          </button>
        </header>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Users", value: organizers.length, icon: Users, color: "from-blue-600 to-blue-400" },
            { title: "Pending Verifications", value: organizers.filter(org => org.status === 'pending').length, icon: CheckCircle, color: "from-yellow-600 to-yellow-400" },
            { title: "Total Revenue", value: `$${payments.reduce((sum, payment) => sum + payment.amount, 0)}`, icon: DollarSign, color: "from-green-600 to-green-400" },
            { title: "Pending Payments", value: payments.filter(payment => payment.status === 'pending').length, icon: BarChart3, color: "from-purple-600 to-purple-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</h2>
                <item.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} text-transparent bg-clip-text`}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-6">
          <label htmlFor="search" className="text-lg font-semibold mb-2 block">Search</label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#40e0d0]"
              placeholder="Search organizers or payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex border-b border-gray-300">
            <button
              className={`py-2 px-4 ${activeTab === 'organizers' ? 'border-b-2 border-[#40e0d0] text-[#1e3a8a]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('organizers')}
            >
              Organizers
            </button>
            <button
              className={`py-2 px-4 ${activeTab === 'payments' ? 'border-b-2 border-[#40e0d0] text-[#1e3a8a]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('payments')}
            >
              Payments
            </button>
          </div>
        </div>

        {loading ? ( // Display loading state
          <div className="text-center py-6">
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        ) : (
          <>
            {activeTab === 'organizers' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Organizers</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Registration Date</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrganizers.map((organizer) => (
                        <tr key={organizer._id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="py-3">{organizer.name}</td>
                          <td className="py-3">{organizer.email}</td>
                          <td className="py-3">{new Date(organizer.registrationDate).toLocaleDateString()}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              organizer.status === 'verified' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                            }`}>
                              {organizer.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {organizer.status === 'pending' && (
                              <button
                                onClick={() => verifyOrganizer(organizer._id)}
                                className="bg-[#1e3a8a] text-white px-3 py-1 rounded hover:bg-[#40e0d0] transition-colors duration-300"
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
            )}

            {activeTab === 'payments' && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payments</h2>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400">
                        <th className="pb-2">Organizer</th>
                        <th className="pb-2">Amount</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((payment) => (
                        <tr key={payment._id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="py-3">{payment.organizerId.name}</td>
                          <td className="py-3">${payment.amount}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              payment.status === 'approved' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {payment.status === 'pending' && (
                              <button
                                onClick={() => approvePayment(payment._id)}
                                className="bg-[#1e3a8a] text-white px-3 py-1 rounded hover:bg-[#40e0d0] transition-colors duration-300"
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
