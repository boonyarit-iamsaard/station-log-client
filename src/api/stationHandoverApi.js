import api from '@/api/api';

const URLS = {
  stationHandoverURL: '/station-handover/',
};

export const fetchStationHandoverRecords = () => {
  return api.get(URLS.stationHandoverURL);
};

export const fetchStationHandoverRecordByID = id => {
  return api.get(`${URLS.stationHandoverURL}${id}`);
};

export const createStationHandoverRecord = newRecord => {
  return api.post(URLS.stationHandoverURL, newRecord);
};

export const updateStationHandoverRecord = updatedRecord => {
  return api.put(
    `${URLS.stationHandoverURL}${updatedRecord._id}`,
    updatedRecord
  );
};

export const deleteStationHandoverRecord = id => {
  return api.delete(`${URLS.stationHandoverURL}${id}`);
};
