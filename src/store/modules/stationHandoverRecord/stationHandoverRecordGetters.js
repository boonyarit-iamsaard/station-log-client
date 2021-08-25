import {
  getPendingStationHandoverRecords,
  getStationHandoverRecords,
} from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

export default {
  [getStationHandoverRecords]: state => {
    return state.stationHandoverRecords;
  },
  [getPendingStationHandoverRecords]: state => {
    const pendingStationHandoverRecords = state.stationHandoverRecords.filter(
      record => !record.isAcknowledged
    );

    return pendingStationHandoverRecords.length;
  },
};
