import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Makepayment = () => {
  const navigate = useNavigate();
  const { product, cartItems } = useLocation().state || {};

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const isCart = Array.isArray(cartItems) && cartItems.length > 0;
  const totalAmount = isCart
    ? cartItems.reduce((sum, item) => sum + (item.product_cost || 0), 0)
    : product?.product_cost || 0;

  // Redirect if no product/cart
  useEffect(() => {
    if (!product && !isCart) {
      navigate("/", { replace: true });
    }
  }, [product, isCart, navigate]);

  // Countdown timer for redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && paymentSuccess) {
      navigate("/", { replace: true });
    }
  }, [countdown, paymentSuccess, navigate]);

  const validatePhone = useCallback((phoneNumber) => {
    const cleaned = phoneNumber.trim().replace(/[\s-]/g, '');
    const patterns = {
      kenyan07: /^0[7]\d{8}$/,
      kenyan01: /^0[1]\d{8}$/,
      international7: /^254[7]\d{8}$/,
      international1: /^254[1]\d{8}$/,
      plus254: /^\+254[71]\d{8}$/
    };
    return Object.values(patterns).some(pattern => pattern.test(cleaned));
  }, []);

  const formatPhoneNumber = useCallback((phoneNumber) => {
    let cleaned = phoneNumber.trim().replace(/[\s-]/g, '');
    if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
    if (cleaned.match(/^0[71]\d{8}$/)) {
      cleaned = '254' + cleaned.slice(1);
    }
    return cleaned;
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value;
    setPhone(value);
    if (value.trim() === "") {
      setPhoneError("");
      return;
    }
    if (!validatePhone(value)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError("");
    }
  }, [validatePhone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPaymentSuccess(false);

    if (!validatePhone(phone)) {  
      setPhoneError("Please enter a valid Kenyan phone number");  
      return;  
    }  

    const formattedPhone = formatPhoneNumber(phone);  
    setSubmitting(true);  
    setMessage("⏳ Initiating M-Pesa payment... Please check your phone.");  

    try {  
      const formData = new FormData();  
      formData.append("phone", formattedPhone);  
      formData.append("amount", totalAmount);  

      await axios.post(  
        "https://muterian.pythonanywhere.com/api/mpesa_payment",  
        formData,  
        {  
          timeout: 30000,  
          headers: { 'Content-Type': 'multipart/form-data' }  
        }  
      );  

      setMessage(`✅ Payment request sent successfully!`);  
      setPaymentSuccess(true);  
      setCountdown(10);  
    } catch (error) {  
      console.error("Payment error:", error);  
      if (error.code === 'ECONNABORTED') {  
        setMessage("❌ Payment request timed out. Please try again.");  
      } else if (error.response?.status === 400) {  
        setMessage(`❌ ${error.response.data.message || "Invalid payment details"}`);  
      } else if (error.response?.status === 500) {  
        setMessage("❌ Payment service temporarily unavailable. Please try again later.");  
      } else if (!error.response) {  
        setMessage("❌ Network error. Please check your connection.");  
      } else {  
        setMessage(`❌ ${error.response?.data?.message || "Payment failed. Please try again."}`);  
      }  
    } finally {  
      setSubmitting(false);  
    }
  };

  const getImageUrl = (imagePath) => {
    const baseUrl = 'https://muterian.pythonanywhere.com/static/images/';
    return baseUrl + imagePath;
  };

  const getAlertClass = () => {
    if (message.startsWith("✅")) return "bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-xl";
    if (message.startsWith("⏳")) return "bg-blue-500/20 border border-blue-500 text-blue-300 p-3 rounded-xl";
    return "bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl";
  };

  if (!product && !isCart) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
      minHeight: "100vh",
    }}>
      <Navbar />

      <div className="container py-5">
        <div className="rounded-4 overflow-hidden" 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            maxWidth: "600px",
            margin: "0 auto"
          }}
        >
          {/* Header */}
          <div className="p-4" style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <h1 className="mb-0 text-white fw-bold">
              <span className="me-2">💳</span>
              Lipa Na M-Pesa
            </h1>
            <p className="text-white opacity-75 mb-0">Complete your payment securely</p>
          </div>

          {/* Product/Cart Details */}
          <div className="p-4">
            {isCart ? (
              <>
                {cartItems.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-3">
                    {item.product_photo && (
                      <img 
                        src={getImageUrl(item.product_photo)} 
                        alt={item.product_name}
                        className="rounded-3 me-3"
                        style={{ 
                          width: "60px", 
                          height: "60px", 
                          objectFit: "cover",
                          border: '2px solid rgba(255, 255, 255, 0.1)'
                        }} 
                      />
                    )}
                    <div className="text-white">
                      <div className="fw-semibold">{item.product_name}</div>
                      <div style={{
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        Ksh {item.product_cost?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                <hr className="my-3" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}} />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white opacity-75">Total ({cartItems.length} items):</span>
                  <span className="fw-bold fs-4" style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Ksh {totalAmount.toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <>
                {product.product_photo && (
                  <div className="text-center mb-4">
                    <img 
                      src={getImageUrl(product.product_photo)}
                      alt={product.product_name}
                      className="rounded-3 mb-3"
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        border: '2px solid rgba(255, 255, 255, 0.1)'
                      }}
                    />
                  </div>
                )}
                <div className="text-center mb-4">
                  <h5 className="text-white">{product.product_name}</h5>
                  <div className="fw-bold fs-3" style={{
                    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Ksh {product.product_cost?.toLocaleString()}
                  </div>
                </div>
              </>
            )}

            {/* Status Message */}
            {message && (
              <div className={`mb-4 ${getAlertClass()}`}>
                {message}
                {paymentSuccess && countdown > 0 && (
                  <div className="mt-2 text-sm">
                    Redirecting in {countdown} seconds...
                  </div>
                )}
              </div>
            )}

            {/* Payment Form */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label text-white">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g. 0712345678 or 254712345678"
                  className={`form-control ${phoneError ? 'is-invalid' : phone && !phoneError ? 'is-valid' : ''}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={submitting}
                  required
                />
                {phoneError && <div className="invalid-feedback">{phoneError}</div>}
              </div>

              {/* Submit Button */}
              <button
                className={`w-100 py-3 rounded-3 fw-semibold mb-3 ${submitting ? 'bg-secondary' : 'btn-primary'}`}
                style={{
                  background: submitting 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  border: 'none',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => !submitting && (e.target.style.transform = 'translateY(-1px)')}
                onMouseOut={e => !submitting && (e.target.style.transform = 'translateY(0)')}
                type="submit"
                disabled={submitting || phoneError || !phone.trim()}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing Payment...
                  </>
                ) : (
                  `Pay Ksh ${totalAmount.toLocaleString()}`
                )}
              </button>

              {/* Back Button */}
              <button
                className="btn w-100 py-2 rounded-3"
                onClick={() => navigate(-1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                type="button"
                disabled={submitting}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to {isCart ? 'Cart' : 'Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;