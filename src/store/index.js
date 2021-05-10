import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import errorModule from '@/store/modules/error';
import sparesModule from '@/store/modules/spares';
import handlingModule from '@/store/modules/handling';

import { login } from '@/api/users-api';

// const BASE_URL = 'http://localhost:5000/api/users/';
// const BASE_URL = 'http://station-log-api.herokuapp.com/api/users/';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isAdmin: false,
      isLoading: false,
      isStoreAdmin: false,
      token: localStorage.getItem('token') || null,
      userID: localStorage.getItem('userID') || null,
      user: null,
    };
  },
  getters: {
    getIsAdmin(state) {
      return state.isAdmin;
    },

    getIsLoading(state) {
      return state.isLoading;
    },

    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    CLEAR_USER(state) {
      state.user = null;
      state.isAdmin = false;
      state.isStoreAdmin = false;
    },

    SET_IS_ADMIN(state, payload) {
      state.isAdmin = payload;
    },

    SET_IS_LOADING(state) {
      state.isLoading = !state.isLoading;
    },

    SET_IS_STORE_ADMIN(state) {
      state.isStoreAdmin = !state.isStoreAdmin;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setIsLoading(context) {
      context.commit('SET_IS_LOADING');
    },

    async login(context, payload) {
      await login(payload)
        .then(response => {
          const { token, user } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('userID', user.userID);

          user.roles.forEach(role => {
            if (role === 'admin') {
              context.commit('SET_IS_ADMIN', true);
            }
          });

          context.commit('SET_USER', user);
        })
        .catch(error => {
          if (error.response) {
            throw new Error(error.response.data.message || 'Failed to login.');
          }
        });
    },

    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');

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
