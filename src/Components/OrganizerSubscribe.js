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
import logo from '../Images/MM logo.jpeg';
import "../CSS/OrganzerSubscribe.css";

const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

const styles = {
  customGradient: { background: '#d4d4d4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',},
  customCard: {maxWidth: '400px',width: '100%',padding: '20px',borderRadius: '10px',backgroundColor: '#111', boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)', transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',},
  formCheck: {marginBottom: '10px',},
  formControl: {borderRadius: '5px',},
  btn: {background: '#CCFF00',color: 'black',border: 'none',padding: '10px',borderRadius: '5px',cursor: 'pointer',transition: 'all 0.3s ease',fontWeight: 'bold', },};

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
              base: {fontSize: '16px',color: '#d4d4d4','::placeholder': { color: '#888', }, },
              invalid: { color: '#ff6b6b',},}, hidePostalCode: true, }}/>
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        style={{...styles.btn, width: '100%', fontSize: '16px',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 0 15px rgba(204, 255, 0, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {isLoading ? 'Processing...' : 'Subscribe Now'}
      </button>
      {errorMessage && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{errorMessage}</p>}
      {status && <p style={{ color: '#CCFF00', marginTop: '10px' }}>{status}</p>}
    </form>
  );
};

export default function OrganizerSubscribe() {
  const [plan, setPlan] = useState('monthly');

  return (
    <Layout>
      <div style={styles.customGradient}>
        <div 
          style={styles.customCard}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(204, 255, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.3)';
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Match Master Logo" width={60} height={60} style={{ marginBottom: '15px' }} />
            <h2 style={{ color: '#CCFF00', fontWeight: 'bold', fontSize: '24px' }}>Organizer Subscription</h2>
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
                <span style={{ 
                  color: plan === 'monthly' ? '#CCFF00' : '#d4d4d4', 
                  fontWeight: plan === 'monthly' ? 'bold' : 'normal',
                  transition: 'color 0.3s ease',
                }}>
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
                <span style={{ 
                  color: plan === 'yearly' ? '#CCFF00' : '#d4d4d4', 
                  fontWeight: plan === 'yearly' ? 'bold' : 'normal',
                  transition: 'color 0.3s ease',
                }}>
                  Yearly ($299.99/year - Save 17%)
                </span>
              </label>
            </div>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} />
          </Elements>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <small style={{ color: '#d4d4d4' }}>
              By subscribing, you agree to our{' '}
              <a href="/terms-of-service" style={{ color: '#CCFF00', textDecoration: 'none', transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Terms of Service</a> and{' '}
              <a href="/privacy-policy" style={{ color: '#CCFF00', textDecoration: 'none', transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Privacy Policy</a>.
            </small>
          </div>
        </div>
      </div>
    </Layout>
  );
}