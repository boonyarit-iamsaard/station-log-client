import actions from '@/store/modules/aogHandoverRecord/aogHandoverRecordActions';
import getters from '@/store/modules/aogHandoverRecord/aogHandoverRecordGetters';
import mutations from '@/store/modules/aogHandoverRecord/aogHandoverRecordMutations';

const state = {
  aogHandoverRecords: [],
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
