import {
  ADD_STATION_HANDOVER_RECORD,
  REMOVE_STATION_HANDOVER_RECORD,
  SET_STATION_HANDOVER_RECORDS,
  UPDATE_STATION_HANDOVER_RECORD,
} from '@/store/modules/stationHandoverRecord/stationHandoverRecordTypes';

export default {
  [ADD_STATION_HANDOVER_RECORD]: (state, newStationHandoverRecord) => {
    state.stationHandoverRecords = state.stationHandoverRecords.concat(
      newStationHandoverRecord
    );
  },
  [REMOVE_STATION_HANDOVER_RECORD]: (state, id) => {
    state.stationHandoverRecords = state.stationHandoverRecords.filter(
      stationHandoverRecord => stationHandoverRecord._id !== id
    );
  },
  [SET_STATION_HANDOVER_RECORDS]: (state, stationHandoverRecords) => {
    state.stationHandoverRecords = stationHandoverRecords;
  },
  [UPDATE_STATION_HANDOVER_RECORD]: (state, updatedStationHandoverRecord) => {
    const index = state.stationHandoverRecords.findIndex(
      stationHandoverRecord =>
        stationHandoverRecord._id === updatedStationHandoverRecord._id
    );

    if (index !== -1) {
      state.stationHandoverRecords.splice(
        index,
        1,
        updatedStationHandoverRecord
      );
    }
  },
};
