import axios from 'axios';

// Use environment variable, fallback to local development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchPortfolioData = async () => {
  const response = await api.get('/portfolio');
  return response.data.data;
};

export const fetchProjects = async (category = null, featured = false) => {
  const params = {};
  if (category) params.category = category;
  if (featured) params.featured = 'true';
  
  const response = await api.get('/portfolio/projects', { params });
  return response.data.data;
};

export const submitContactForm = async (formData) => {
  const response = await api.post('/contact', formData);
  return response.data;
};

export default api;
