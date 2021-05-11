import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import errorModule from '@/store/modules/error';
import sparesModule from '@/store/modules/spares';
import handlingModule from '@/store/modules/handling';

import { login, signup } from '@/api/users-api';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isAdmin: false,
      isLoggedIn: null,
      isStoreAdmin: false,
      user: null,
    };
  },
  getters: {
    getIsAdmin(state) {
      return state.isAdmin;
    },

    getIsLoggedIn(state) {
      return state.isLoggedIn;
    },

    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
      state.isAdmin = false;
      state.isLoggedIn = null;
      state.isStoreAdmin = false;
    },

    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },

    SET_IS_STORE_ADMIN(state) {
      state.isStoreAdmin = !state.isStoreAdmin;
    },

    SET_IS_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setLogoutTimer(context, expirationTime) {
      setTimeout(() => {
        context.commit('CLEAR_USER');
      }, expirationTime * 1000);
    },

    async login(context, payload) {
      await login(payload)
        .then(response => {
          const { expiresIn, token, user } = response.data;

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresIn * 1000);

          localStorage.setItem('token', token);
          localStorage.setItem('expirationDate', expirationDate);

          user.roles.forEach(role => {
            if (role === 'admin') {
              context.commit('SET_IS_ADMIN', true);
            }
          });

          context.dispatch('setLogoutTimer', expiresIn);
          context.commit('SET_USER', user);
          context.commit('SET_IS_LOGGED_IN', token);
        })
        .catch(error => {
          if (error.response) {
            throw new Error(error.response.data.message || 'Failed to login.');
          }
        });
    },

    async signup(context, payload) {
      await signup(payload)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          if (error.response) {
            throw new Error(error.response.data.message || 'Failed to signup.');
          }
        });
    },

    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationDate');

      context.commit('CLEAR_USER');
    },
  },
  modules: {
    error: errorModule,
    spares: sparesModule,
    handling: handlingModule,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
