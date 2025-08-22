import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we log you in...");
    setError('');

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "https://muterian.pythonanywhere.com//api/signin",
        data
      );
      
      setLoading("");
      
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      } else {
        setError(response.data.message);
      }

    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
      }}
    >
      {/* Main container with max-width */}
      <div className="w-full cardSign" style={{ maxWidth: '450px' }}>
        {/* Glassmorphism card */}
        <div 
          className="backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header with gradient */}
          <div 
            className="px-8 py-6 text-center"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/80">Sign in to your account</p>
          </div>

          {/* Form content */}
          <div className="px-8 py-8">
            {/* Loading message */}
            {loading && (
              <div className="mb-4 p-3 rounded-lg bg-blue-500/20 border border-blue-400/30">
                <div className="flex items-center text-blue-300">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-400 border-t-transparent mr-3"></div>
                  {loading}
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400/30">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Email input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your email" 
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"></div>
                </div>
              </div>

              {/* Password input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type="password"                      
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your password" 
                    required 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Sign in button */}
              <button 
                type="button"
                onClick={submit}
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{
                  background: loading 
                    ? 'rgba(59, 130, 246, 0.5)'
                    : 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  boxShadow: loading 
                    ? 'none'
                    : '0 10px 25px rgba(59, 130, 246, 0.3)'
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-sm text-white/60">or</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <p className="text-white/70">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-300 underline decoration-transparent hover:decoration-current"
                  >
                    <Link to='/signup'>Sign up</Link>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements - positioned relative to the viewport */}
        <div className="fixed -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
        <div className="fixed -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default Signin;