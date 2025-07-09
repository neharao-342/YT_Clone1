import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../axiosConfig';
import './Home.css';

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get('/videos/')
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('Failed to fetch videos', err));
  }, []);

  return (
    <div className="home-container">
      {videos.map((video) => (
        <Link to={`/video/${video.id}`} className="video-card" key={video.id}>
          <div className="thumbnail-container">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="thumbnail"
            />
            <span className="timestamp">12:34</span> {/* You can replace with actual duration */}
          </div>
          <div className="video-info">
            <div className="channel-icon">
              <img
                src={`https://ui-avatars.com/api/?name=${video.owner.username}`}
                alt="Channel"
              />
            </div>
            <div className="text-info">
              <h4 className="video-title">{video.title}</h4>
              <p className="channel-name">{video.owner.username}</p>
              <p className="video-meta">1M views • 2 days ago</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}