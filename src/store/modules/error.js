export default {
  namespaced: true,
  state() {
    return {
      errorMessage: null,
      isError: false,
    };
  },
  getters: {
    getErrorMessage(state) {
      return state.errorMessage;
    },

    getIsError(state) {
      return state.isError;
    },
  },
  actions: {
    setErrorMessage(context, payload) {
      context.commit('SET_ERROR_MESSAGE', payload);
    },

    setIsError(context) {
      context.commit('SET_IS_ERROR');
    },
  },
  mutations: {
    SET_ERROR_MESSAGE(state, payload) {
      state.errorMessage = payload;
    },

    SET_IS_ERROR(state) {
      state.isError = !state.isError;
    },
  },
};
