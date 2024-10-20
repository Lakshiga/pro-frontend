import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import "../CSS/OrganzerSubscribe.css";
import logo from '../Images/MatchMaster.png';
import Layout from '../Components/Layout.js'; 


const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

const CheckoutForm = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data: clientSecret } = await axios.post('/api/create-payment-intent', {
        plan
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Organizer Name',
          },
        }
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          alert('Subscription successful!');
          navigate('/organizer/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during subscription:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <form onSubmit={handleSubmit}>
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
      <div className="row">
        <div className="col-md-6 mb-3">
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
        <div className="col-md-6 mb-3">
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
        className="btn w-100 mt-3 subscribe-btn"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    </form>
  );
};

export default function OrganizerSubscribe() {
  const [plan, setPlan] = useState('monthly');

  return (
    <Layout>
    <div className="min-vh-100 custom-gradient d-flex align-items-center justify-content-center p-4">
      <div className="card custom-card bg-white shadow-sm">
        <div className="text-center mb-4">
          <img src={logo} alt="Match Master Logo" width={60} height={60} className="mb-3" />
          <h2 className="h4 fw-bold" style={{ color: 'navy' }}>Organizer Subscription</h2>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <div className="form-check mb-2">
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
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} />
          </Elements>
        </div>
        <div className="text-center mt-3">
          <small className="text-muted">By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
        </div>
      </div>
    </div>
   </Layout>
  );
}