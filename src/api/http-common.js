import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
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
