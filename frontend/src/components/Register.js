import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axiosConfig';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/register/', {
        username,
        email,
        password,
      });
      localStorage.setItem('authToken', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Try another email or password.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="logo"><span>▶</span> Create Account</h2>
        <p className="subtext">to continue to ytclone</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}