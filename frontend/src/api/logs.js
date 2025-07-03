import axios from 'axios';

const API_URL = 'http://localhost:3000/logs';

export const fetchLogs = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const response = await axios.get(`${API_URL}?${params}`);
  return response.data;
};