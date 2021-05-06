import Vue from 'vue';
import Vuex from 'vuex';

import sparesModule from '@/store/modules/spares';
import handlingModule from '@/store/modules/handling';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isLoading: false,
    };
  },
  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    SET_IS_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
  },
  actions: {
    setIsLoading(context) {
      context.commit('SET_IS_LOADING');
    },
  },
  modules: {
    spares: sparesModule,
    handling: handlingModule,
  },
});
