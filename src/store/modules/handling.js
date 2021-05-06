const URL = 'http://localhost:5000/api/handling/';

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
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      context.commit('ADD_HANDLING_RECORD', responseData.handlingRecord);
    },

    async updateHandlingRecord(context, payload) {
      const response = await fetch(URL.concat(payload._id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      context.commit('UPDATE_HANDLING_RECORD', responseData.handlingRecord);
    },

    async deleteHandlingRecord(context, payload) {
      const id = payload;

      await fetch(URL.concat(id), {
        method: 'DELETE',
      });

      context.commit('DELETE_HANDLING_RECORD', id);
    },

    async fetchHandlingRecords(context) {
      const response = await fetch(URL);

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch handlingRecords.'
        );
        throw error;
      }

      context.commit('SET_HANDLING_RECORDS', responseData.handlingRecords);
    },

    async fetchCurrentHandlingRecord(context, payload) {
      const id = payload;
      const response = await fetch(URL.concat(id));

      const responseData = await response.json();

      context.commit(
        'SET_CURRENT_HANDLING_RECORD',
        responseData.handlingRecord
      );
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
        record => record.id === payload.id
      );

      if (index !== -1) {
        state.handlingRecords.splice(index, 1, payload);
      }
    },
  },
};
