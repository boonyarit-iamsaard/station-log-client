import Vue from 'vue';
import Vuex from 'vuex';

import authModule from '@/store/modules/auth';
import errorModule from '@/store/modules/error';
import flightModule from '@/store/modules/flight';
import handlingModule from '@/store/modules/handling';
import sparesModule from '@/store/modules/spares';

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
    auth: authModule,
    error: errorModule,
    flight: flightModule,
    handling: handlingModule,
    spares: sparesModule,
  },
});
