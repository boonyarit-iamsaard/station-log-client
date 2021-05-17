import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';

import router from '@/router';

import errorModule from '@/store/modules/error';
import sparesModule from '@/store/modules/spares';
import handlingModule from '@/store/modules/handling';

import { login, signup } from '@/api/users-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isAdmin: false,
      isStoreAdmin: false,
      token: null,
      user: null,
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
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
      state.isStoreAdmin = false;
    },

    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },

    SET_IS_STORE_ADMIN(state) {
      state.isStoreAdmin = !state.isStoreAdmin;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setLogoutTimer(context) {
      const now = new Date();
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const expirationTime = expirationDate.getTime() - now.getTime();

      setTimeout(() => {
        context.dispatch('logout').then(() => router.replace('/login'));
      }, expirationTime);
    },

    login(context, payload) {
      return login(payload)
        .then(response => {
          const { expiresIn, token, user } = response.data;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);

          localStorage.setItem('expirationDate', expirationDate);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          user.roles.forEach(role => {
            if (role === 'admin') {
              context.commit('SET_IS_ADMIN', true);
            }
          });

          context.dispatch('setLogoutTimer');
          context.commit('SET_USER', user);
          context.commit('SET_TOKEN', token);
        })
        .catch(error => {
          if (error.response) {
            throw new Error(error.response.data.message || 'Failed to login.');
          }
        });
    },

    signup(context, payload) {
      return signup(payload)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response) {
            throw new Error(error.response.data.message || 'Failed to signup.');
          }
        });
    },

    tryAutoLogin(context) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        return;
      }

      user.roles.forEach(role => {
        if (role === 'admin') {
          context.commit('SET_IS_ADMIN', true);
        }
      });

      context.commit('SET_USER', user);
      context.commit('SET_TOKEN', token);

      router.replace('/');
    },

    logout(context) {
      context.commit('CLEAR_USER');

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expirationDate');
    },
  },
  modules: {
    error: errorModule,
    spares: sparesModule,
    handling: handlingModule,
  },
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //   }),
  // ],
});
