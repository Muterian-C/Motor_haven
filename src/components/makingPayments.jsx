import React, { useState, useEffect, useCallback } from 'react';

const Makepayment = () => {
  // Mock data for demonstration
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Mock product data
  const itemsToPayFor = [
    {
      product_id: 1,
      product_name: "Premium Headphones",
      product_cost: 15000,
      product_photo: "headphones.jpg",
      quantity: 1
    },
    {
      product_id: 2,
      product_name: "Wireless Speaker",
      product_cost: 8500,
      product_photo: "speaker.jpg",
      quantity: 2
    }
  ];

  const totalAmount = itemsToPayFor.reduce((sum, item) => 
    sum + (item.product_cost * (item.quantity || 1)), 0
  );

  // Countdown after success
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Phone validation
  const validatePhone = useCallback((phoneNumber) => {
    const trimmed = phoneNumber.trim();
    const cleaned = trimmed.replace(/[\s\-\(\)]/g, '');

    const patterns = {
      kenyan07: /^0[7]\d{8}$/,
      kenyan01: /^0[1]\d{8}$/,
      international7: /^254[7]\d{8}$/,
      international1: /^254[1]\d{8}$/,
      plus254: /^\+254[71]\d{8}$/
    };

    return Object.values(patterns).some(pattern => pattern.test(cleaned));
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

    setSubmitting(true);
    setMessage("⏳ Initiating M-Pesa payment... Please check your phone.");

    // Simulate API call
    setTimeout(() => {
      setMessage("✅ Payment initiated successfully! Check your phone to complete the transaction.");
      setPaymentSuccess(true);
      setCountdown(10);
      setSubmitting(false);
    }, 2000);
  };

  const getAlertClass = () => {
    if (message.startsWith("✅")) return "bg-green-100 border-green-400 text-green-700";
    if (message.startsWith("⏳")) return "bg-blue-100 border-blue-400 text-blue-700";
    return "bg-red-100 border-red-400 text-red-700";
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)"
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-500 rounded-full opacity-5 animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-6xl md:text-7xl font-black mb-4 leading-tight"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
            }}
          >
            📱 Lipa Na M-Pesa
          </h1>
          <p className="text-gray-300 text-lg">Complete your payment securely with M-Pesa</p>
        </div>

        {/* Main Payment Card */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
            }}
          >
            {/* Card Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white text-xl">💳</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Payment Details</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Items List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                {itemsToPayFor.map((item, index) => (
                  <div 
                    key={item.product_id}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.product_name}</h4>
                      <p className="text-gray-300">
                        Ksh {item.product_cost.toLocaleString()}
                        {item.quantity && ` × ${item.quantity}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-400">
                        Ksh {(item.product_cost * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Total */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total Amount:</span>
                    <span 
                      className="text-3xl font-black"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                    >
                      Ksh {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {message && (
                <div 
                  className={`p-4 rounded-xl border-l-4 ${getAlertClass()} backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-500`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-2xl">
                      {message.startsWith("✅") ? "✅" : message.startsWith("⏳") ? "⏳" : "❌"}
                    </div>
                    <div>
                      <p className="font-medium">{message.replace(/^[✅⏳❌]\s*/, '')}</p>
                      {paymentSuccess && countdown > 0 && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-3 h-3 bg-current rounded-full animate-pulse"></div>
                          <span className="text-sm">Redirecting in {countdown} seconds...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-semibold mb-3">
                    📱 M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. 0712345678 or 254712345678"
                      className={`w-full px-4 py-4 rounded-xl backdrop-blur-sm border transition-all duration-300 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        phoneError 
                          ? 'bg-red-500/10 border-red-400 focus:ring-red-400' 
                          : phone && !phoneError 
                          ? 'bg-green-500/10 border-green-400' 
                          : 'bg-white/5 border-white/20 focus:bg-white/10'
                      }`}
                      value={phone}
                      onChange={handlePhoneChange}
                      disabled={submitting}
                      autoComplete="tel"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {phone && !phoneError && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {phoneError && (
                    <p className="mt-2 text-red-400 text-sm flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{phoneError}</span>
                    </p>
                  )}
                  <p className="mt-2 text-gray-400 text-sm">
                    Enter your M-Pesa registered phone number
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting || phoneError || !phone.trim()}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50 ${
                    submitting || phoneError || !phone.trim()
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'text-white shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    background: submitting || phoneError || !phone.trim() 
                      ? '#4b5563' 
                      : "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                    boxShadow: submitting || phoneError || !phone.trim() 
                      ? 'none' 
                      : "0 0 30px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  {submitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <span>💳</span>
                      <span>Pay Ksh {totalAmount.toLocaleString()}</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Security Notice */}
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <span className="text-green-400">🛡️</span>
                  <span className="text-sm">Your payment is secured by M-Pesa SSL encryption</span>
                </div>
              </div>

              {/* Back Button */}
              {!submitting && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2 mx-auto"
                   
                  >
                    <span>←</span>
                    <span>Back to Products</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed bottom-8 right-8 z-20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-white text-2xl">💰</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        
      `}</style>
    </div>
  );
};

export default Makepayment;