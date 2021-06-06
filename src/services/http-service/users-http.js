import HTTP from '@/services/http-service';

const END_POINT = '/users/';

const login = payload => HTTP.post(END_POINT + 'login', payload);

const signup = payload => HTTP.post(END_POINT + 'signup', payload);

export { login, signup };
