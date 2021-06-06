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
      currentSpare: {},
      filters: {
        airline: 'ALL',
        status: 'ALL',
        store: 'ALL',
        type: 'ALL',
      },
      spares: [],
    };
  },
  getters: {
    getCurrentSpare(state) {
      return state.currentSpare;
    },
    getFilters(state) {
      return state.filters;
    },
    getSpares(state) {
      return state.spares;
    },
  },
  actions: {
    setFilters(context, payload) {
      context.commit('SET_FILTERS', payload);
    },

    async addSpare(context, payload) {
      try {
        const response = await createSpare(payload);
        const { spare } = response.data;

        context.commit('ADD_SPARE', spare);

        return spare;
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchSpares(context) {
      try {
        const response = await getSpares();

        context.commit('SET_SPARES', response.data.spares);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchSpareByID(context, payload) {
      try {
        const response = await getSpareByID(payload);
        const { spare } = response.data;

        context.commit('SET_CURRENT_SPARE', spare);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async updateSpare(context, payload) {
      try {
        const response = await updateSpare(payload);
        const { spare } = response.data;

        context.commit('UPDATE_SPARE', spare);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async deleteSpare(context, payload) {
      try {
        await deleteSpare(payload);

        context.commit('DELETE_SPARE', payload);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },
  },
  mutations: {
    ADD_SPARE(state, payload) {
      state.spares.push(payload);
    },

    DELETE_SPARE(state, payload) {
      state.spares = state.spares.filter(spare => spare._id !== payload);
    },

    SET_CURRENT_SPARE(state, payload) {
      state.currentSpare = payload;
    },

    SET_FILTERS(state, payload) {
      state.filters = payload;
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
