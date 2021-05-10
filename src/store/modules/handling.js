import {
  createHandling,
  deleteHandling,
  getHandlings,
  getHandlingByID,
  updateHandling,
} from '@/api/handling-api';

export default {
  namespaced: true,
  state() {
    return {
      handlingRecords: [],
      currentHandlingRecord: {},
    };
  },
  getters: {
    getHandlingRecords(state) {
      return state.handlingRecords;
    },
    getCurrentHandlingRecord(state) {
      return state.currentHandlingRecord;
    },
  },
  actions: {
    async addHandlingRecord(context, payload) {
      try {
        const response = await createHandling(payload);

        context.commit('ADD_HANDLING_RECORD', response.data.handlingRecord);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async updateHandlingRecord(context, payload) {
      try {
        const response = await updateHandling(payload);

        context.commit('UPDATE_HANDLING_RECORD', response.data.handlingRecord);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async deleteHandlingRecord(context, payload) {
      try {
        await deleteHandling(payload);

        context.commit('DELETE_HANDLING_RECORD', payload);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchHandlingRecords(context) {
      try {
        const response = await getHandlings();

        context.commit('SET_HANDLING_RECORDS', response.data.handlingRecords);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },

    async fetchCurrentHandlingRecord(context, payload) {
      try {
        const response = await getHandlingByID(payload);

        context.commit(
          'SET_CURRENT_HANDLING_RECORD',
          response.data.handlingRecord
        );
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        } else console.log(error);
      }
    },
  },
  mutations: {
    ADD_HANDLING_RECORD(state, payload) {
      state.handlingRecords.push(payload);
    },

    DELETE_HANDLING_RECORD(state, payload) {
      state.handlingRecords = state.handlingRecords.filter(
        record => record.id !== payload
      );
    },

    SET_HANDLING_RECORDS(state, payload) {
      state.handlingRecords = payload;
    },

    SET_CURRENT_HANDLING_RECORD(state, payload) {
      state.currentHandlingRecord = payload;
    },

    UPDATE_HANDLING_RECORD(state, payload) {
      const index = state.handlingRecords.findIndex(
        record => record._id === payload._id
      );

      if (index !== -1) {
        state.handlingRecords.splice(index, 1, payload);
      }
    },
  },
};
