import axios from 'axios';

// Default config for the axios instance
const axiosParams = {
  // TODO: update baseURL in environment variable later.
  // Set different base URL based on the environment
  // You can also use an environmental variable
  // baseURL: process.env.VUE_APP_API_BASE_URL
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Create auth interceptor for requests
const authInterceptor = config => {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return config;
  }

  return config;
};

// Create error interceptor for responses
const errorInterceptors = error => {
  if (error.response) {
    const { data } = error.response;
    const { message } = data;

    throw new Error(message);
  }

  if (error.request) {
    throw new Error(
      'Could not connect to server, please contact your administrator or try again later.'
    );
  }

  throw new Error(error.message);
};

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.response.use(
  response => response,
  errorInterceptors
);

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
