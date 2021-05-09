import Vue from 'vue';
import Vuex from 'vuex';

import sparesModule from '@/store/modules/spares';
import handlingModule from '@/store/modules/handling';

const URL = 'http://localhost:5000/api/users/';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isLoading: false,
      token: localStorage.getItem('token') || null,
      userID: localStorage.getItem('userID') || null,
      user: null,
    };
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },

    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    CLEAR_USER(state) {
      state.token = null;
      state.userID = null;
      state.user = null;
    },

    SET_USER(state, payload) {
      console.log(payload);
      state.user = payload;
    },

    SET_IS_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    setIsLoading(context) {
      context.commit('SET_IS_LOADING');
    },

    async login(context, payload) {
      const response = await fetch(URL.concat('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      const { token, user } = responseData;

      localStorage.setItem('token', token);
      localStorage.setItem('userID', user.userID);

      console.log(user);

      context.commit('SET_USER', user);
    },
  },
  modules: {
    spares: sparesModule,
    handling: handlingModule,
  },
});
