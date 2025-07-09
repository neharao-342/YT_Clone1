import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axiosConfig';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login/', {
        username: email,
        password,
      });
      localStorage.setItem('authToken', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="logo"><span>▶</span> Sign in</h2>
        <p className="subtext">to continue to ytclone</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/register">Create account</a>
        </p>
      </div>
    </div>
  );
}