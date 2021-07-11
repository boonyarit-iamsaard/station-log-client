import {
  createManpowerRecordRequest,
  deleteManpowerRecordRequest,
  getManpowerRecordByIDRequest,
  getManpowerRecordsRequest,
  updateManpowerRecordRequest,
} from '@/services/http-service/manpower-http';

export default {
  namespaced: true,

  state() {
    return {
      manpowerRecords: [],
    };
  },

  getters: {
    getManpowerRecords(state) {
      return state.manpowerRecords;
    },
  },

  actions: {
    async addManpowerRecord(context, payload) {
      try {
        const response = await createManpowerRecordRequest(payload);
        const { manpowerRecord } = response.data;

        context.commit('ADD_MANPOWER_RECORD', manpowerRecord);

        return manpowerRecord;
      } catch (error) {
        throw new Error(
          error.message || 'Could not add record, please try again later.'
        );
      }
    },

    async updateManpowerRecord(context, payload) {
      try {
        const response = await updateManpowerRecordRequest(payload);
        const { manpowerRecord } = response.data;

        context.commit('UPDATE_MANPOWER_RECORD', manpowerRecord);

        return manpowerRecord;
      } catch (error) {
        throw new Error(
          error.message || 'Could not update record, please try again later.'
        );
      }
    },

    async deleteManpowerRecord(context, payload) {
      try {
        await deleteManpowerRecordRequest(payload);

        context.commit('DELETE_MANPOWER_RECORD', payload);
      } catch (error) {
        throw new Error(
          error.message || 'Could not delete record, please try again later.'
        );
      }
    },

    async fetchManpowerRecords(context) {
      try {
        const response = await getManpowerRecordsRequest();
        const { manpowerRecords } = response.data;

        context.commit('SET_MANPOWER_RECORDS', manpowerRecords);

        return manpowerRecords;
      } catch (error) {
        throw new Error(
          error.message || 'Could not load records, please try again later.'
        );
      }
    },

    async fetchManpowerRecordsByID(context, payload) {
      try {
        const response = await getManpowerRecordByIDRequest(payload);
        const { manpowerRecord } = response.data;

        return manpowerRecord;
      } catch (error) {
        throw new Error(
          error.message || 'Could not find record, please try again later.'
        );
      }
    },
  },
  mutations: {
    ADD_MANPOWER_RECORD(state, payload) {
      state.manpowerRecords = state.manpowerRecords.concat(payload);
    },

    DELETE_MANPOWER_RECORD(state, payload) {
      state.manpowerRecords = state.manpowerRecords.filter(
        disinfection => disinfection._id !== payload
      );
    },

    SET_MANPOWER_RECORDS(state, payload) {
      state.manpowerRecords = payload;
    },

    UPDATE_MANPOWER_RECORD(state, payload) {
      const index = state.manpowerRecords.findIndex(
        disinfection => disinfection._id === payload._id
      );

      if (index !== -1) {
        state.manpowerRecords.splice(index, 1, payload);
      }
    },
  },
};
