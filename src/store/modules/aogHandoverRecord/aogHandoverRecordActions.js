// Import types
import * as types from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

// Import api
import {
  createAogHandoverRecord,
  deleteAogHandoverRecord,
  fetchAogHandoverRecords,
  updateAogHandoverRecord,
} from '@/api/aogHandoverApi';

export default {
  [types.addAogHandoverRecord]: async (context, newAogHandoverRecord) => {
    try {
      const response = await createAogHandoverRecord(newAogHandoverRecord);
      const { record: aogHandoverRecord } = response.data;

      context.commit(types.ADD_AOG_HANDOVER_RECORD, aogHandoverRecord);

      return aogHandoverRecord;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not add new aog handover record, please try again later.'
      );
    }
  },
  [types.fetchAogHandoverRecords]: async context => {
    try {
      const response = await fetchAogHandoverRecords();
      const { records: aogHandoverRecords } = response.data;

      context.commit(types.SET_AOG_HANDOVER_RECORDS, aogHandoverRecords);

      return aogHandoverRecords;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not fetch aog handover records, please try again later.'
      );
    }
  },
  [types.removeAogHandoverRecord]: async (context, id) => {
    try {
      await deleteAogHandoverRecord(id);

      context.commit(types.REMOVE_AOG_HANDOVER_RECORD, id);
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not delete aog handover record, please try again later.'
      );
    }
  },
  [types.updateAogHandoverRecord]: async (
    context,
    updatedAogHandoverRecord
  ) => {
    try {
      const response = await updateAogHandoverRecord(updatedAogHandoverRecord);
      const { record: aogHandoverRecord } = response.data;

      context.commit(types.UPDATE_AOG_HANDOVER_RECORD, aogHandoverRecord);

      return aogHandoverRecord;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not update aog handover record, please try again later.'
      );
    }
  },
};
