import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
  }
});

export default axiosInstance;

