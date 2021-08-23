import { getAogHandoverRecords } from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

export default {
  [getAogHandoverRecords]: state => {
    return state.aogHandoverRecords;
  },
};
