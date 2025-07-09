import React from 'react';
import { Link } from 'react-router-dom';
import { FaYoutube, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <FaYoutube className="text-red-600" />
        <span>YouTube</span>
      </Link>

      {/* Search Bar */}
      <div className="navbar-search">
        <input type="text" placeholder="Search" />
        <button><FaSearch /></button>
      </div>

      {/* Auth Buttons */}
      <div className="navbar-auth">
        <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
      </div>
    </div>
  );
};

export default Navbar;
