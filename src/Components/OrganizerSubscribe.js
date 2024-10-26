// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import "../CSS/OrganzerSubscribe.css";
// import logo from '../Images/MatchMaster.png';
// import Layout from '../Components/Layout.js'; 

// const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

// const CheckoutForm = ({ plan }) => {
//   const [loading, setLoading] = useState(false);
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       const { data: clientSecret } = await axios.post('/api/create-payment-intent', {
//         plan
//       });

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: 'Organizer Name',
//           },
//         }
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else {
//         if (result.paymentIntent.status === 'succeeded') {
//           alert('Subscription successful!');
//           navigate('/organizer/dashboard');
//         }
//       }
//     } catch (error) {
//       console.error('Error during subscription:', error);
//       alert('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return ( 
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlFor="cardNumber" className="form-label">Card Number</label>
//         <input
//           type="text"
//           className="form-control"
//           id="cardNumber"
//           placeholder="1234 5678 9012 3456"
//           value={cardNumber}
//           onChange={(e) => setCardNumber(e.target.value)}
//           required
//         />
//       </div>
//       <div className="row">
//         <div className="col-md-6 mb-3">
//           <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
//           <input
//             type="text"
//             className="form-control"
//             id="expiryDate"
//             placeholder="MM/YY"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             required
//           />
//         </div>
//         <div className="col-md-6 mb-3">
//           <label htmlFor="cvv" className="form-label">CVV</label>
//           <input
//             type="text"
//             className="form-control"
//             id="cvv"
//             placeholder="123"
//             value={cvv}
//             onChange={(e) => setCvv(e.target.value)}
//             required
//           />
//         </div>
//       </div>
//       <button
//         type="submit"
//         className="btn w-100 mt-3 subscribe-btn"
//         disabled={!stripe || loading}
//       >
//         {loading ? 'Processing...' : 'Subscribe Now'}
//       </button>
//     </form>
//   );
// };

// export default function OrganizerSubscribe() {
//   const [plan, setPlan] = useState('monthly');

//   return (
//     <Layout>
//     <div className="min-vh-100 custom-gradient d-flex align-items-center justify-content-center p-4">
//       <div className="card custom-card bg-white shadow-sm">
//         <div className="text-center mb-4">
//           <img src={logo} alt="Match Master Logo" width={60} height={60} className="mb-3" />
//           <h2 className="h4 fw-bold" style={{ color: 'navy' }}>Organizer Subscription</h2>
//         </div>
//         <div className="card-body">
//           <div className="mb-4">
//             <div className="form-check mb-2">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="plan"
//                 id="monthly"
//                 value="monthly"
//                 checked={plan === 'monthly'}
//                 onChange={() => setPlan('monthly')}
//               />
//               <label className="form-check-label" htmlFor="monthly">
//                 Monthly ($29.99/month)
//               </label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="plan"
//                 id="yearly"
//                 value="yearly"
//                 checked={plan === 'yearly'}
//                 onChange={() => setPlan('yearly')}
//               />
//               <label className="form-check-label" htmlFor="yearly">
//                 Yearly ($299.99/year - Save 17%)
//               </label>
//             </div>
//           </div>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm plan={plan} />
//           </Elements>
//         </div>
//         <div className="text-center mt-3">
//           <small className="text-muted">By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
//         </div>
//       </div>
//     </div>
//    </Layout>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Layout from '../Components/Layout.js';
import logo from '../Images/MatchMaster.png';
import "../CSS/OrganzerSubscribe.css";
const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

const styles = {
  customGradient: {
    background: 'linear-gradient(to bottom right, #08096b, #00e6d4)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  customCard: {
    maxWidth: '400px',
    width: '100%',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formCheck: {
    marginBottom: '10px',
  },
  formControl: {
    borderRadius: '5px',
  },
  btn: {
    background: 'linear-gradient(to left, #40e0d0, #1e3a8a)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  btnHover: {
    background: 'linear-gradient(to left, #1e3a8a, #40e0d0)',
  },
};

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setStatus('Stripe has not loaded yet.');
      return;
    }

    setIsLoading(true);
    setStatus('');
    setErrorMessage('');

    const localtoken = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:4000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localtoken}`,
        },
        body: JSON.stringify({ plan, userId: 'user123' }), // Replace userId with actual ID
      });

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to initiate payment');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        throw error;
      } else if (paymentIntent.status === 'succeeded') {
        setStatus('Payment successful!');
        alert('Payment was successful!'); // Alert message for payment success
        await fetch('http://localhost:4000/api/payments/payment-success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        });
        navigate('/organizer-dashboard');
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (error) {
      setErrorMessage(`Payment failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        style={{
          ...styles.btn,
          width: '100%',
          fontSize: '16px',
        }}
        onMouseEnter={(e) => e.target.style.background = styles.btnHover.background}
        onMouseLeave={(e) => e.target.style.background = styles.btn.background}
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
      {status && <p style={{ color: 'green', marginTop: '10px' }}>{status}</p>}
    </form>
  );
};

export default function OrganizerSubscribe() {
  const [plan, setPlan] = useState('monthly');

  return (
    <Layout>
      <div style={styles.customGradient}>
        <div style={styles.customCard}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Match Master Logo" width={60} height={60} style={{ marginBottom: '15px' }} />
            <h2 style={{ color: '#08096b', fontWeight: 'bold', fontSize: '24px' }}>Organizer Subscription</h2>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={styles.formCheck}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="plan"
                  value="monthly"
                  checked={plan === 'monthly'}
                  onChange={() => setPlan('monthly')}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                <span style={{ color: plan === 'monthly' ? '#08096b' : '#333', fontWeight: plan === 'monthly' ? 'bold' : 'normal' }}>
                  Monthly ($29.99/month)
                </span>
              </label>
            </div>
            <div style={styles.formCheck}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="plan"
                  value="yearly"
                  checked={plan === 'yearly'}
                  onChange={() => setPlan('yearly')}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                <span style={{ color: plan === 'yearly' ? '#08096b' : '#333', fontWeight: plan === 'yearly' ? 'bold' : 'normal' }}>
                  Yearly ($299.99/year - Save 17%)
                </span>
              </label>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} />
          </Elements>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <small style={{ color: '#6b7280' }}>
              By subscribing, you agree to our{' '}
              <a href="#" style={{ color: '#08096b', textDecoration: 'none' }}>Terms of Service</a> and{' '}
              <a href="#" style={{ color: '#08096b', textDecoration: 'none' }}>Privacy Policy</a>.
            </small>
          </div>
        </div>
      </div>
    </Layout>
  );
}