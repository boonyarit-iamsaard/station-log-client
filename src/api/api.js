import axios from 'axios';

// Default config for the axios instance
const axiosParams = {
  // TODO: update baseURL in environment variable later.
  // Set different base URL based on the environment
  // You can also use an environmental variable
  // baseURL: process.env.VUE_APP_API_BASE_URL
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_URL : '/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Main api function
const api = axios => {
  // Wrapper functions around axios
  return {
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    put: (url, body, config) => axios.put(url, body, config),
    delete: (url, config) => axios.delete(url, config),
  };
};

// Initialise the api function and pass axiosInstance to it
export default api(axiosInstance);
