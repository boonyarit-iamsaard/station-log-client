import {
  getStationHandoverRecordByID,
  getStationHandoverRecords,
} from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

export default {
  [getStationHandoverRecordByID]: state => id => {
    return state.stationHandoverRecords.find(record => record._id === id);
  },
  [getStationHandoverRecords]: state => {
    return state.stationHandoverRecords;
  },
};
