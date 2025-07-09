import React, { useEffect, useState } from 'react';
import API from '../axiosConfig';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    API.get('/videos/user/') // Assumes backend filters user’s own uploads
      .then((res) => setVideos(res.data))
      .catch((err) => console.error('Failed to fetch dashboard videos', err));
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Your Videos</h2>
            <h2>User Dashboard</h2>

      <div className="video-table">
        <div className="video-table-header">
          <span>Thumbnail</span>
          <span>Title</span>
          <span>Views</span>
          <span>Date</span>
          <span>Action</span>
        </div>
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="video-table-row">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thumbnail"
              />
              <span className="video-title">{video.title}</span>
              <span>{video.views || 0}</span>
              <span>{new Date(video.created_at).toLocaleDateString()}</span>
              <span>
                <Link to={`/video/${video.id}`} className="edit-btn">
                  View
                </Link>
              </span>
            </div>
          ))
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
}