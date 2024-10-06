import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "../CSS/OrganzierSubscribe.css"
import logo from '../Images/MatchMaster.png'; // Adjust the path based on your folder structure


export default function OrganizerSubscribe() {
  const [plan, setPlan] = useState('monthly')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real application, you would use a secure payment gateway here
      const response = await axios.post('/api/organizer/subscribe', {
        plan,
        cardNumber,
        expiryDate,
        cvv
      })

      if (response.data.success) {
        alert('Subscription successful!')
        navigate('/organizer/dashboard')
      } else {
        alert('Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Error during subscription:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 custom-gradient d-flex align-items-center justify-content-center p-4">
      <div className="card w-100 max-w-md bg-white shadow-lg">
        <div className="card-header text-center border-0 bg-transparent">
        <img src={logo} alt="Match Master Logo" width={80} height={80} className="mx-auto mb-4" />
        <h2 className="card-title h3 fw-bold text-primary">Organizer Subscription</h2>
          <p className="card-text text-muted">Choose a plan to start organizing events</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
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
            <div className="row g-3 mb-3">
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
        <div className="card-footer text-center border-0 bg-transparent">
          <small className="text-muted">By subscribing, you agree to our Terms of Service and Privacy Policy.</small>
        </div>
      </div>
    </div>
  )
}