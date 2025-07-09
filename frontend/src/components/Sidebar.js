import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MdHome,
  MdExplore,
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdOutlineVideoCall,
  MdOutlineWatchLater,
  MdThumbUp
} from 'react-icons/md';

import './Sidebar.css';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: <MdHome />, label: 'Home' },
    { to: '/explore', icon: <MdExplore />, label: 'Explore' },
    { to: '/subscriptions', icon: <MdSubscriptions />, label: 'Subscriptions' },
    { to: '/library', icon: <MdVideoLibrary />, label: 'Library' },
    { to: '/history', icon: <MdHistory />, label: 'History' },
    { to: '/upload', icon: <MdOutlineVideoCall />, label: 'Upload' },
    { to: '/watch-later', icon: <MdOutlineWatchLater />, label: 'Watch Later' },
    { to: '/liked', icon: <MdThumbUp />, label: 'Liked Videos' },
  ];

  return (
    <aside className="sidebar">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className={`sidebar-link ${
            location.pathname === link.to ? 'active' : ''
          }`}
        >
          <span className="icon">{link.icon}</span>
          <span className="label">{link.label}</span>
        </Link>
      ))}
    </aside>
  );
}