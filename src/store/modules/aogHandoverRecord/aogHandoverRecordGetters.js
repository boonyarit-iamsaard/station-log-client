import {
  getAogHandoverRecords,
  getPendingAogHandoverRecords,
} from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

export default {
  [getAogHandoverRecords]: state => {
    return state.aogHandoverRecords;
  },
  [getPendingAogHandoverRecords]: state => {
    const pendingStationHandoverRecords = state.aogHandoverRecords.filter(
      record => record.details.some(detail => !detail.isAcknowledged)
    );

    return pendingStationHandoverRecords.length;
  },
};
