import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  // useState hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we upload your data!");

    try {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("phone", phone);
      data.append("password", password);

      const response = await axios.post(
        "https://muterian.pythonanywhere.com//api/signup",
        data
      );
      setLoading("");
      alert(response.data.success);
      navigate("/signin");
    } catch (error) {
      setLoading("");
      setError(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)",
      }}
    >
      {/* Main container with max-width */}
      <div
        className="justify-center cardSign"
        style={{ maxWidth: "450px", borderRadius: "50px" }}
      >
        {/* Glassmorphism card */}
        <div
          className="backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden justify-center item-center "
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Header with gradient */}
          <div
            className="px-8 py-6 text-center"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
            }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/80">Sign in to your account</p>
          </div>
          {loading}
          {success}
          {error}
          <form onSubmit={submit}>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
            />
            {username}
            <br />{" "}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
              required
            />
            <br />
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="Enter Phone Number"
              required
            />
            <br />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter password"
              required
            />
            <br />
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
          <p>
            Already have an account? <Link to="/signin">Signin </Link>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};
export default Signup;
