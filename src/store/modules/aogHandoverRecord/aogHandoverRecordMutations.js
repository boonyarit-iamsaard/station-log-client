import {
  ADD_AOG_HANDOVER_RECORD,
  REMOVE_AOG_HANDOVER_RECORD,
  SET_AOG_HANDOVER_RECORDS,
  UPDATE_AOG_HANDOVER_RECORD,
} from '@/store/modules/aogHandoverRecord/aogHandoverRecordTypes';

export default {
  [ADD_AOG_HANDOVER_RECORD]: (state, newAogHandoverRecord) => {
    state.aogHandoverRecords = state.aogHandoverRecords.concat(
      newAogHandoverRecord
    );
  },
  [REMOVE_AOG_HANDOVER_RECORD]: (state, id) => {
    state.aogHandoverRecords = state.aogHandoverRecords.filter(
      aogHandoverRecord => aogHandoverRecord._id !== id
    );
  },
  [SET_AOG_HANDOVER_RECORDS]: (state, aogHandoverRecords) => {
    state.aogHandoverRecords = aogHandoverRecords;
  },
  [UPDATE_AOG_HANDOVER_RECORD]: (state, updatedAogHandoverRecord) => {
    const index = state.aogHandoverRecords.findIndex(
      aogHandoverRecord =>
        aogHandoverRecord._id === updatedAogHandoverRecord._id
    );

    if (index !== -1) {
      state.aogHandoverRecords.splice(index, 1, updatedAogHandoverRecord);
    }
  },
};
