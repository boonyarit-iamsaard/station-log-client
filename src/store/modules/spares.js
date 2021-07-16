import {
  createSpare,
  deleteSpare,
  getSpares,
  getSpareByID,
  updateSpare,
} from '@/services/http-service/spares-http';

export default {
  namespaced: true,

  state() {
    return {
      mostUsedParts: [],
      spares: [],
    };
  },

  getters: {
    getMostUsedParts(state) {
      return state.mostUsedParts;
    },

    getSpares(state) {
      return state.spares;
    },
  },

  actions: {
    async addSpare(context, payload) {
      try {
        const response = await createSpare(payload);
        const { spare } = response.data;

        context.commit('ADD_SPARE', spare);

        return spare;
      } catch (error) {
        throw new Error(
          error.message || 'Could not add spare, please try again later.'
        );
      }
    },

    async fetchSpares(context) {
      try {
        const response = await getSpares();
        const { partCount, spares } = response.data;

        context.commit('SET_SPARES', spares);
        context.commit('SET_MOST_USED_PARTS', partCount);

        return spares;
      } catch (error) {
        throw new Error(
          error.message || 'Could not load spares, please try again later.'
        );
      }
    },

    async fetchSpareByID(context, payload) {
      try {
        const response = await getSpareByID(payload);
        const { spare } = response.data;

        return spare;
      } catch (error) {
        throw new Error(
          error.message || 'Could not find spare, please try again later.'
        );
      }
    },

    async updateSpare(context, payload) {
      try {
        const response = await updateSpare(payload);
        const { spare } = response.data;

        context.commit('UPDATE_SPARE', spare);

        return spare;
      } catch (error) {
        throw new Error(
          error.message || 'Could not update spare, please try again later.'
        );
      }
    },

    async deleteSpare(context, payload) {
      try {
        await deleteSpare(payload);

        context.commit('DELETE_SPARE', payload);
      } catch (error) {
        throw new Error(
          error.message || 'Could not delete spare, please try again later.'
        );
      }
    },
  },

  mutations: {
    ADD_SPARE(state, payload) {
      state.spares = state.spares.concat(payload);
    },

    DELETE_SPARE(state, payload) {
      state.spares = state.spares.filter(spare => spare._id !== payload);
    },

    SET_MOST_USED_PARTS(state, payload) {
      state.mostUsedParts = payload;
    },

    SET_SPARES(state, payload) {
      state.spares = payload;
    },

    UPDATE_SPARE(state, payload) {
      const index = state.spares.findIndex(spare => spare._id === payload._id);

      if (index !== -1) {
        state.spares.splice(index, 1, payload);
      }
    },
  },
};
