import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axiosConfig';
import './VideoPlayer.css';
import { FaThumbsUp, FaThumbsDown, FaShare, FaBookmark } from 'react-icons/fa';

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    API.get(`/videos/${id}/`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.error('Error fetching video', err));
  }, [id]);

  if (!video) return <div className="video-player">Loading...</div>;

  return (
    <div className="video-player">
      <div className="video-section">
        <video
          className="video-element"
          controls
          src={video.video_file}
          poster={video.thumbnail}
        />
        <h2 className="video-title">{video.title}</h2>
        <div className="video-details">
          <span>{video.views || 0} views • {new Date(video.created_at).toLocaleDateString()}</span>
          <div className="action-buttons">
            <button><FaThumbsUp /> Like</button>
            <button><FaThumbsDown /> Dislike</button>
            <button><FaShare /> Share</button>
            <button><FaBookmark /> Save</button>
          </div>
        </div>
        <div className="channel-box">
          <img
            src={`https://ui-avatars.com/api/?name=${video.owner.username}`}
            alt="Channel"
            className="channel-avatar"
          />
          <div className="channel-info">
            <p className="channel-name">{video.owner.username}</p>
            <p className="channel-subs">123K subscribers</p>
          </div>
          <button className="subscribe-btn">Subscribe</button>
        </div>
        <div className="description-box">
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  );
}