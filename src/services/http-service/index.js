import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

const authInterceptor = config => {
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');

    return config;
  }

  return config;
};

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

HTTP.interceptors.request.use(authInterceptor);
HTTP.interceptors.response.use(response => response, errorInterceptors);

export default HTTP;
