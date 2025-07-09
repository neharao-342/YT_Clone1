import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import VideoPlayer from './components/VideoPlayer';
import Dashboard from './components/Dashboard';
import Subscriptions from './components/Subscriptions';
import Library from './components/Library';
import History from './components/History';
import LikedVideos from './components/LikedVideos';
import WatchLater from './components/WatchLater';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-yt-bg-light p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/library" element={<Library />} />
              <Route path="/history" element={<History />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/watch-later" element={<WatchLater />} />
              <Route path="/liked" element={<LikedVideos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/video/:id" element={<VideoPlayer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* catch-all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;