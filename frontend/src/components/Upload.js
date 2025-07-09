import React, { useState } from 'react';
import API from '../axiosConfig';
import './Upload.css';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoFile || !thumbnailFile) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video_file', videoFile);
    formData.append('thumbnail', thumbnailFile);

    setUploading(true);
    setMessage('');

    try {
      const res = await API.post('/videos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (err) {
      setMessage('Upload failed. Check file size and format.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <label>Video Title *</label>
        <input
          type="text"
          placeholder="Enter a catchy title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          placeholder="Say something about your video"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Choose Video File *</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <label>Choose Thumbnail Image *</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnailFile(e.target.files[0])}
        />

        <button type="submit" className="btn-upload" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
}