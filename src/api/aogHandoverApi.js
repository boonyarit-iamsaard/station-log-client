import api from '@/api/api';

const URLS = {
  aogHandoverURL: '/aog-handover/',
};

export const fetchAogHandoverRecords = () => {
  return api.get(URLS.aogHandoverURL);
};

export const fetchAogHandoverRecordByID = id => {
  return api.get(`${URLS.aogHandoverURL}${id}`);
};

export const createAogHandoverRecord = newRecord => {
  return api.post(URLS.aogHandoverURL, newRecord);
};

export const updateAogHandoverRecord = updatedRecord => {
  return api.put(`${URLS.aogHandoverURL}${updatedRecord._id}`, updatedRecord);
};

export const deleteAogHandoverRecord = id => {
  return api.delete(`${URLS.aogHandoverURL}${id}`);
};
