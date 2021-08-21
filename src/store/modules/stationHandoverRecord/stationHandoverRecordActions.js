// Import types
import * as types from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

// Import api
import {
  createStationHandoverRecord,
  deleteStationHandoverRecord,
  fetchStationHandoverRecords,
  updateStationHandoverRecord,
} from '@/api/stationHandoverApi';

export default {
  [types.addStationHandoverRecord]: async (
    context,
    newStationHandoverRecord
  ) => {
    try {
      const response = await createStationHandoverRecord(
        newStationHandoverRecord
      );
      const { record: stationHandoverRecord } = response.data;

      context.commit(types.ADD_STATION_HANDOVER_RECORD, stationHandoverRecord);

      return stationHandoverRecord;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not add new station handover record, please try again later.'
      );
    }
  },
  [types.fetchStationHandoverRecords]: async context => {
    try {
      const response = await fetchStationHandoverRecords();
      const { records: stationHandoverRecords } = response.data;

      context.commit(
        types.SET_STATION_HANDOVER_RECORDS,
        stationHandoverRecords
      );

      return stationHandoverRecords;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not fetch station handover records, please try again later.'
      );
    }
  },
  [types.removeStationHandoverRecord]: async (context, id) => {
    try {
      await deleteStationHandoverRecord(id);

      context.commit(types.REMOVE_STATION_HANDOVER_RECORD, id);
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not delete station handover record, please try again later.'
      );
    }
  },
  [types.updateStationHandoverRecord]: async (
    context,
    updatedStationHandoverRecord
  ) => {
    try {
      const response = await updateStationHandoverRecord(
        updatedStationHandoverRecord
      );
      const { record: stationHandoverRecord } = response.data;

      context.commit(
        types.UPDATE_STATION_HANDOVER_RECORD,
        stationHandoverRecord
      );

      return stationHandoverRecord;
    } catch (error) {
      throw new Error(
        error.message ||
          'Could not update station handover record, please try again later.'
      );
    }
  },
};
