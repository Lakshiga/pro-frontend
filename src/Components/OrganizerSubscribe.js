// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import logo from '../Images/MM logo.jpeg';
// import "../CSS/OrganzerSubscribe.css";

// const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

// const styles = {
//   customGradient: { background: '#d4d4d4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
//   customCard: { maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#111', boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)', transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
//   formCheck: { marginBottom: '10px' },
//   formControl: { borderRadius: '5px' },
//   btn: { background: '#CCFF00', color: 'black', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold' },
// };

// const CheckoutForm = ({ plan }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [status, setStatus] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       setStatus('Stripe has not loaded yet.');
//       toast.error('Stripe has not loaded yet.');
//       return;
//     }

//     setIsLoading(true);
//     setStatus('');

//     const localtoken = localStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:4000/api/payments/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localtoken}`,
//         },
//         body: JSON.stringify({ plan, userId: 'user123' }), // Replace userId with actual ID
//       });

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         throw new Error('Failed to initiate payment');
//       }

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });

//       if (error) {
//         throw error;
//       } else if (paymentIntent.status === 'succeeded') {
//         setStatus('Payment successful!');
//         toast.success('Payment was successful!');
//         await fetch('http://localhost:4000/api/payments/payment-success', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
//         });
//         navigate('/organizer-dashboard');
//       } else {
//         throw new Error('Payment was not successful');
//       }
//     } catch (error) {
//       setStatus(`Payment failed: ${error.message}`);
//       toast.error(`Payment failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <CardElement
//           options={{
//             style: {
//               base: {fontSize: '16px',color: '#d4d4d4','::placeholder': { color: '#888', }, },
//               invalid: { color: '#ff6b6b',},}, hidePostalCode: true, }}/>
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || isLoading}
//         style={{...styles.btn, width: '100%', fontSize: '16px',
//         }}
//         onMouseEnter={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//           e.target.style.boxShadow = '0 0 15px rgba(204, 255, 0, 0.5)';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.transform = 'scale(1)';
//           e.target.style.boxShadow = 'none';
//         }}
//       >
//         {isLoading ? 'Processing...' : 'Subscribe Now'}
//       </button>
//       {errorMessage && <p style={{ color: '#ff6b6b', marginTop: '10px' }}>{errorMessage}</p>}
//       {status && <p style={{ color: '#CCFF00', marginTop: '10px' }}>{status}</p>}
//     </form>
//   );
// };

// export default function OrganizerSubscribe() {
//   const [plan, setPlan] = useState('monthly');

//   return (
//       <div style={styles.customGradient}>
//         <div 
//           style={styles.customCard}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = 'scale(1.02)';
//             e.currentTarget.style.boxShadow = '0 0 30px rgba(204, 255, 0, 0.5)';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = 'scale(1)';
//             e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.3)';
//           }}
//         >
//                 <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

//           <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//             <img src={logo} alt="Match Master Logo" width={60} height={60} style={{ marginBottom: '15px' }} />
//             <h2 style={{ color: '#CCFF00', fontWeight: 'bold', fontSize: '24px' }}>Organizer Subscription</h2>
//           </div>
//           <div style={{ marginBottom: '20px' }}>
//             <div style={styles.formCheck}>
//               <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                 <input
//                   type="radio"
//                   name="plan"
//                   value="monthly"
//                   checked={plan === 'monthly'}
//                   onChange={() => setPlan('monthly')}
//                   style={{ marginRight: '10px', cursor: 'pointer' }}
//                 />
//                 <span style={{ 
//                   color: plan === 'monthly' ? '#CCFF00' : '#d4d4d4', 
//                   fontWeight: plan === 'monthly' ? 'bold' : 'normal',
//                   transition: 'color 0.3s ease',
//                 }}>
//                   Monthly ($29.99/month)
//                 </span>
//               </label>
//             </div>
//             <div style={styles.formCheck}>
//               <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//                 <input
//                   type="radio"
//                   name="plan"
//                   value="yearly"
//                   checked={plan === 'yearly'}
//                   onChange={() => setPlan('yearly')}
//                   style={{ marginRight: '10px', cursor: 'pointer' }}
//                 />
//                 <span style={{ 
//                   color: plan === 'yearly' ? '#CCFF00' : '#d4d4d4', 
//                   fontWeight: plan === 'yearly' ? 'bold' : 'normal',
//                   transition: 'color 0.3s ease',
//                 }}>
//                   Yearly ($299.99/year - Save 17%)
//                 </span>
//               </label>
//             </div>
//           </div>
//           <Elements stripe={stripePromise}>
//             <CheckoutForm plan={plan} />
//           </Elements>
//           <div style={{ textAlign: 'center', marginTop: '20px' }}>
//             <small style={{ color: '#d4d4d4' }}>
//               By subscribing, you agree to our{' '}
//               <a href="/terms-of-service" style={{ color: '#CCFF00', textDecoration: 'none', transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Terms of Service</a> and{' '}
//               <a href="/privacy-policy" style={{ color: '#CCFF00', textDecoration: 'none', transition: 'opacity 0.3s ease' }} onMouseEnter={(e) => e.target.style.opacity = '0.8'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Privacy Policy</a>.
//             </small>
//           </div>
//         </div>
//       </div>
//   );
// }

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import logo from '../Images/MM logo.jpeg';
// import "../CSS/OrganzerSubscribe.css";

// // Initialize Stripe with your public key
// const stripePromise = loadStripe('pk_test_51QBrrwHbve0bLiRTaPPEZhSKHzs78tBzW8YtoCBEjulf6100zG9h8YeIinHLTLO16CFcfBXin9mbSozyN8DvLJnN00sCgpupL4');

// const styles = {
//   customGradient: { background: '#d4d4d4', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
//   customCard: { maxWidth: '400px', width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#111', boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)', transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
//   formCheck: { marginBottom: '10px' },
//   formControl: { borderRadius: '5px' },
//   btn: { background: '#CCFF00', color: 'black', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer', transition: 'all 0.3s ease', fontWeight: 'bold' },
// };

// const CheckoutForm = ({ plan }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) {
//       toast.error('Stripe has not loaded yet.');
//       return;
//     }

//     setIsLoading(true);
//     const localtoken = localStorage.getItem('token');

//     try {
//       // Create payment intent
//       const response = await fetch('http://localhost:4000/api/payments/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localtoken}`,
//         },
//         body: JSON.stringify({ plan, userId: 'user123' }), // Replace userId with actual ID
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to initiate payment: ${response.statusText}`);
//       }

//       const { clientSecret } = await response.json();
//       if (!clientSecret) {
//         throw new Error('Failed to retrieve client secret');
//       }

//       // Confirm payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });

//       if (error) {
//         throw error;
//       } else if (paymentIntent.status === 'succeeded') {
//         toast.success('Payment was successful!');
//         await fetch('http://localhost:4000/api/payments/payment-success', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
//         });
//         navigate('/organizer-dashboard');
//       } else {
//         throw new Error('Payment was not successful');
//       }
//     } catch (error) {
//       toast.error(`Payment failed: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ width: '100%' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <CardElement
//           options={{
//             style: {
//               base: { fontSize: '16px', color: '#d4d4d4', '::placeholder': { color: '#888' } },
//               invalid: { color: '#ff6b6b' },
//             },
//             hidePostalCode: true,
//           }}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={!stripe || isLoading}
//         style={{ ...styles.btn, width: '100%', fontSize: '16px' }}
//         onMouseEnter={(e) => {
//           e.target.style.transform = 'scale(1.05)';
//           e.target.style.boxShadow = '0 0 15px rgba(204, 255, 0, 0.5)';
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.transform = 'scale(1)';
//           e.target.style.boxShadow = 'none';
//         }}
//       >
//         {isLoading ? 'Processing...' : 'Subscribe Now'}
//       </button>
//     </form>
//   );
// };

// export default function OrganizerSubscribe() {
//   const [plan, setPlan] = useState('monthly');

//   return (
//     <div style={styles.customGradient}>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       <div 
//         style={styles.customCard}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.transform = 'scale(1.02)';
//           e.currentTarget.style.boxShadow = '0 0 30px rgba(204, 255, 0, 0.5)';
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.transform = 'scale(1)';
//           e.currentTarget.style.boxShadow = '0 0 20px rgba(204, 255, 0, 0.3)';
//         }}
//       >
//         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//           <img src={logo} alt="Match Master Logo" width={60} height={60} style={{ marginBottom: '15px' }} />
//           <h2 style={{ color: '#CCFF00', fontWeight: 'bold', fontSize: '24px' }}>Organizer Subscription</h2>
//         </div>
//         <div style={{ marginBottom: '20px' }}>
//           <div style={styles.formCheck}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="plan"
//                 value="monthly"
//                 checked={plan === 'monthly'}
//                 onChange={() => setPlan('monthly')}
//                 style={{ marginRight: '10px', cursor: 'pointer' }}
//               />
//               <span style={{ color: plan === 'monthly' ? '#CCFF00' : '#d4d4d4', fontWeight: plan === 'monthly' ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>
//                 Monthly ($29.99/month)
//               </span>
//             </label>
//           </div>
//           <div style={styles.formCheck}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//               <input
//                 type="radio"
//                 name="plan"
//                 value="yearly"
//                 checked={plan === 'yearly'}
//                 onChange={() => setPlan('yearly')}
//                 style={{ marginRight: '10px', cursor: 'pointer' }}
//               />
//               <span style={{ color: plan === 'yearly' ? '#CCFF00' : '#d4d4d4', fontWeight: plan === 'yearly' ? 'bold' : 'normal', transition: 'color 0.3s ease' }}>
//                 Yearly ($299.99/year)
//               </span>
//             </label>
//           </div>
//         </div>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm plan={plan} />
//         </Elements>
//       </div>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import logo from '../Images/MM logo.jpeg';
import "../CSS/OrganzerSubscribe.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      toast.error('Stripe has not loaded yet.');
      return;
    }

    setIsLoading(true);
    setStatus('');
    setErrorMessage('');

    const localtoken = localStorage.getItem('token');
    try {
      const response = await fetch('https://pro-backend-yaj1.vercel.app/api/payments/create-payment-intent', {
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
        toast.success('Payment was successful!');        
        await fetch('https://pro-backend-yaj1.vercel.app/api/payments/payment-success', {
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
      toast.error(`Payment failed: ${error.message}`);
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
    
  );
}