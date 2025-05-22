import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from '../api/auth';
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password);

      // ✅ Log API response
      console.log("✅ loginUser() response:", data);

      // Optional: double-check values before saving
      console.log("🔐 Token:", data.token);
      console.log("👤 User ID:", data.userId);
      console.log("📧 Email:", data.email);
      console.log("🧑 Name:", data.name);

      login({ name: data.name, email: data.email, _id: data.userId }, data.token);
      localStorage.setItem('userId', data.userId); // Optional: store userId
      navigate("/home");
    } catch (err) {
      console.error("❌ Login Error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
