import { login } from '@/services/http-service/users-http';
import router from '@/router';

const isAdmin = localStorage.getItem('isAdmin')
  ? JSON.parse(localStorage.getItem('isAdmin'))
  : false;

const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null;

const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export default {
  namespaced: true,

  state() {
    return {
      isAdmin: isAdmin,
      token: token,
      user: user,
    };
  },

  getters: {
    getIsAdmin(state) {
      return state.isAdmin;
    },

    getIsAuthenticated(state) {
      return state.token !== null;
    },

    getUser(state) {
      return state.user;
    },
  },

  actions: {
    async login(context, payload) {
      try {
        const response = await login(payload);
        const { expiresIn, token, user } = response.data;

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn * 1000);

        localStorage.setItem('expirationDate', expirationDate.toISOString());
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        let isAdmin = false;
        user.roles.forEach(role => {
          if (role === 'admin') {
            isAdmin = true;
            localStorage.setItem('isAdmin', true.toString());
          }
        });

        context.commit('SET_USER', { isAdmin, token, user });

        await context.dispatch('setLogoutTimer');

        return user;
      } catch (error) {
        throw new Error(
          error.message || 'Could not login, please try again later.'
        );
      }
    },

    logout(context) {
      localStorage.removeItem('expirationDate');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      context.commit('CLEAR_USER');
    },

    setLogoutTimer(context) {
      const now = new Date();
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const expirationTime = expirationDate.getTime() - now.getTime();

      if (expirationTime < 30000) {
        context.dispatch('logout').then(() => router.replace('/login'));
      } else {
        setTimeout(() => {
          context.dispatch('logout').then(() => router.replace('/login'));
        }, expirationTime);
      }
    },
  },

  mutations: {
    CLEAR_USER(state) {
      state.isAdmin = false;
      state.user = null;
      state.token = null;
    },

    SET_USER(state, payload) {
      state.isAdmin = payload.isAdmin;
      state.user = payload.user;
      state.token = payload.token;
    },
  },
};
