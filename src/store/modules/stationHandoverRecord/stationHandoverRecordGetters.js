import { getStationHandoverRecords } from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

export default {
  [getStationHandoverRecords]: state => {
    return state.stationHandoverRecords;
  },
};
