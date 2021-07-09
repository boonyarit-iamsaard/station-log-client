import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/store/modules/auth';
import disinfection from '@/store/modules/disinfection';
import error from '@/store/modules/error';
import flight from '@/store/modules/flight';
import handling from '@/store/modules/handling';
import spares from '@/store/modules/spares';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      shouldLoading: false,
    };
  },

  getters: {
    getShouldLoading(state) {
      return state.shouldLoading;
    },
  },

  actions: {
    setShouldLoading(context, payload) {
      context.commit('SET_SHOULD_LOADING', payload);
    },
  },

  mutations: {
    SET_SHOULD_LOADING(state, payload) {
      state.shouldLoading = payload;
    },
  },

  modules: {
    auth,
    disinfection,
    error,
    flight,
    handling,
    spares,
  },
});
