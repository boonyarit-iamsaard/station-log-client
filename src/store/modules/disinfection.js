import {
  createDisinfectionRequest,
  deleteDisinfectionRequest,
  getDisinfectionListRequest,
  getDisinfectionByIDRequest,
  updateDisinfectionRequest,
} from '@/services/http-service/disinfection-http';

export default {
  namespaced: true,

  state() {
    return {
      disinfectionList: [],
    };
  },

  getters: {
    getDisinfectionList(state) {
      return state.disinfectionList;
    },
  },

  actions: {
    async addDisinfection(context, payload) {
      try {
        const response = await createDisinfectionRequest(payload);
        const { disinfection } = response.data;

        context.commit('ADD_DISINFECTION', disinfection);

        return disinfection;
      } catch (error) {
        throw new Error(
          error.message || 'Could not add disinfection, please try again later.'
        );
      }
    },

    async updateDisinfection(context, payload) {
      try {
        const response = await updateDisinfectionRequest(payload);
        const { disinfection } = response.data;

        context.commit('UPDATE_DISINFECTION', disinfection);

        return disinfection;
      } catch (error) {
        throw new Error(
          error.message ||
            'Could not update disinfection, please try again later.'
        );
      }
    },

    async deleteDisinfection(context, payload) {
      try {
        await deleteDisinfectionRequest(payload);

        context.commit('DELETE_DISINFECTION', payload);
      } catch (error) {
        throw new Error(
          error.message ||
            'Could not delete disinfection, please try again later.'
        );
      }
    },

    async fetchDisinfectionList(context) {
      try {
        const response = await getDisinfectionListRequest();
        const { disinfectionList } = response.data;

        context.commit('SET_DISINFECTION_LIST', disinfectionList);

        return disinfectionList;
      } catch (error) {
        throw new Error(
          error.message ||
            'Could not load disinfection list, please try again later.'
        );
      }
    },

    async fetchDisinfectionByID(context, payload) {
      try {
        const response = await getDisinfectionByIDRequest(payload);
        const { disinfection } = response.data;

        return disinfection;
      } catch (error) {
        throw new Error(
          error.message ||
            'Could not find disinfection, please try again later.'
        );
      }
    },
  },
  mutations: {
    ADD_DISINFECTION(state, payload) {
      state.disinfectionList = state.disinfectionList.concat(payload);
    },

    DELETE_DISINFECTION(state, payload) {
      state.disinfectionList = state.disinfectionList.filter(
        disinfection => disinfection._id !== payload
      );
    },

    SET_DISINFECTION_LIST(state, payload) {
      state.disinfectionList = payload;
    },

    UPDATE_DISINFECTION(state, payload) {
      const index = state.disinfectionList.findIndex(
        disinfection => disinfection._id === payload._id
      );

      if (index !== -1) {
        state.disinfectionList.splice(index, 1, payload);
      }
    },
  },
};
