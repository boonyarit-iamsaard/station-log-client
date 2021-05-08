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
      token: null,
      userID: null,
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
      state.token = payload.token;
      state.userID = payload.userID;
      state.user = payload.user;
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

      const { token, userID, ...rest } = responseData.user;

      localStorage.setItem('token', token);
      localStorage.setItem('userID', userID);

      context.commit('SET_USER', {
        token: token,
        userID: responseData.userID,
        user: rest,
      });
    },
  },
  modules: {
    spares: sparesModule,
    handling: handlingModule,
  },
});
