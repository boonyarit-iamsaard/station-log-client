import HTTP from './http-common';

const END_POINT = '/users';

const login = payload => HTTP.post(END_POINT + '/login', payload);

export { login };
