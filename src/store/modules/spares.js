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
      // await fetch(
      //   'https://station-log-6fae6-default-rtdb.firebaseio.com/spares.json',
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(payload),
      //   }
      // );

      await fetch('http://localhost:5000/api/spares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      context.commit('ADD_SPARE', payload);
    },

    async fetchSpares(context) {
      const response = await fetch('http://localhost:5000/api/spares');

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch spares.'
        );
        throw error;
      }

      context.commit('SET_SPARES', responseData.spares);
    },

    async fetchSpareByID(context, payload) {
      const response = await fetch(
        `http://localhost:5000/api/spares/${payload}`
      );

      const responseData = await response.json();

      context.commit('SET_CURRENT_SPARE', responseData.spare);
    },

    async updateSpare(context, payload) {
      const response = await fetch(
        `http://localhost:5000/api/spares/${payload._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      context.commit('UPDATE_SPARE', responseData.spare);
    },

    async deleteSpare(context, payload) {
      const id = payload;

      await fetch(`http://localhost:5000/api/spares/${id}`, {
        method: 'DELETE',
      });

      context.commit('DELETE_SPARE', id);
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
