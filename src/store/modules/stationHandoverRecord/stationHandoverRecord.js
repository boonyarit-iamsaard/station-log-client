import actions from '@/store/modules/stationHandoverRecord/stationHandoverRecordActions';
import getters from '@/store/modules/stationHandoverRecord/stationHandoverRecordGetters';
import mutations from '@/store/modules/stationHandoverRecord/stationHandoverRecordMutations';

const state = {
  stationHandoverRecords: [],
};

export default {
  state,
  getters,
  actions,
  mutations,
};
