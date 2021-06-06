import {
  createFlightRequest,
  deleteFlightRequest,
  getFlightsRequest,
  getFlightByIDRequest,
  updateFlightRequest,
} from '@/services/http-service/flights-http';

export default {
  namespaced: true,
  state() {
    return {
      flights: [],
      currentFlight: {},
    };
  },
  getters: {
    getFlights(state) {
      return state.flights;
    },
    getCurrentFlight(state) {
      return state.currentFlight;
    },
  },
  actions: {
    async addFlight(context, payload) {
      try {
        const response = await createFlightRequest(payload);
        const { flight } = response.data;

        context.commit('ADD_FLIGHT', flight);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async updateFlight(context, payload) {
      try {
        const response = await updateFlightRequest(payload);
        const { flight } = response.data;

        context.commit('UPDATE_FLIGHT', flight);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async deleteFlight(context, payload) {
      try {
        await deleteFlightRequest(payload);

        context.commit('DELETE_FLIGHT', payload);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchFlights(context) {
      try {
        const response = await getFlightsRequest();
        const { flights } = response.data;

        context.commit('SET_FLIGHTS', flights);

        return flights;
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchCurrentFlight(context, payload) {
      try {
        const response = await getFlightByIDRequest(payload);
        const { flight } = response.data;

        context.commit('SET_CURRENT_FLIGHT', flight);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },
  },
  mutations: {
    ADD_FLIGHT(state, payload) {
      state.flights.push(payload);
    },

    DELETE_FLIGHT(state, payload) {
      state.flights = state.flights.filter(flight => flight._id !== payload);
    },

    SET_FLIGHTS(state, payload) {
      state.flights = payload;
    },

    SET_CURRENT_FLIGHT(state, payload) {
      state.currentFlight = payload;
    },

    UPDATE_FLIGHT(state, payload) {
      const index = state.flights.findIndex(
        flight => flight._id === payload._id
      );

      if (index !== -1) {
        state.flights.splice(index, 1, payload);
      }
    },
  },
};
