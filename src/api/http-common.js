import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://localhost:5000/api',
  // baseURL: ''https://station-log-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const authInterceptor = config => {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return config;
  }

  return config;
};

HTTP.interceptors.request.use(authInterceptor);

export default HTTP;
