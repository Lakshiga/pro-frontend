import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../CSS/OrganzierSubscribe.css";
import logo from '../Images/MatchMaster.png'; // Adjust the path based on your folder structure

export default function OrganizerSubscribe() {
  const [plan, setPlan] = useState('monthly');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real application, you would use a secure payment gateway here
      const response = await axios.post('/api/organizer/subscribe', {
        plan,
        cardNumber,
        expiryDate,
        cvv,
      });

      if (response.data.success) {
        alert('Subscription successful!');
        navigate('/organizer/dashboard');
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 bg-light">
      <div className="card custom-card bg-white shadow-sm">
        <div className="text-center mb-4">
          <img src={logo} alt="Match Master Logo" width={60} height={60} className="mb-3" />
          <h2 className="h4 text-primary">Organizer Subscription</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="plan"
                  id="monthly"
                  value="monthly"
                  checked={plan === 'monthly'}
                  onChange={() => setPlan('monthly')}
                />
                <label className="form-check-label" htmlFor="monthly">
                  Monthly ($29.99/month)
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="plan"
                  id="yearly"
                  value="yearly"
                  checked={plan === 'yearly'}
                  onChange={() => setPlan('yearly')}
                />
                <label className="form-check-label" htmlFor="yearly">
                  Yearly ($299.99/year - Save 17%)
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="cvv" className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </form>
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
        </div>
      </div>
    </div>
  );
}
