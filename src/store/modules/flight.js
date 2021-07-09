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
    };
  },

  getters: {
    getFlights(state) {
      return state.flights;
    },
  },

  actions: {
    async addFlight(context, payload) {
      try {
        const response = await createFlightRequest(payload);
        const { flight } = response.data;

        context.commit('ADD_FLIGHT', flight);

        return flight;
      } catch (error) {
        throw new Error(
          error.message || 'Could not add flight, please try again later.'
        );
      }
    },

    async updateFlight(context, payload) {
      try {
        const response = await updateFlightRequest(payload);
        const { flight } = response.data;

        context.commit('UPDATE_FLIGHT', flight);

        return flight;
      } catch (error) {
        throw new Error(
          error.message || 'Could not update flight, please try again later.'
        );
      }
    },

    async deleteFlight(context, payload) {
      try {
        await deleteFlightRequest(payload);

        context.commit('DELETE_FLIGHT', payload);
      } catch (error) {
        throw new Error(
          error.message || 'Could not delete flight, please try again later.'
        );
      }
    },

    async fetchFlights(context) {
      try {
        const response = await getFlightsRequest();
        const { flights } = response.data;

        context.commit('SET_FLIGHTS', flights);

        return flights;
      } catch (error) {
        throw new Error(
          error.message || 'Could not load flights, please try again later.'
        );
      }
    },

    async fetchFlightByID(context, payload) {
      try {
        const response = await getFlightByIDRequest(payload);
        const { flight } = response.data;

        return flight;
      } catch (error) {
        throw new Error(
          error.message || 'Could not find flight, please try again later.'
        );
      }
    },
  },
  mutations: {
    ADD_FLIGHT(state, payload) {
      state.flights = state.flights.concat(payload);
    },

    DELETE_FLIGHT(state, payload) {
      state.flights = state.flights.filter(flight => flight._id !== payload);
    },

    SET_FLIGHTS(state, payload) {
      state.flights = payload;
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
