import HTTP from '@/services/http-service';

const END_POINT = '/handling/';

const createHandlingRecord = payload => HTTP.post(END_POINT, payload);

const deleteHandlingRecord = id => HTTP.delete(END_POINT + id);

const getHandlingRecords = () => HTTP.get(END_POINT);

const getHandlingRecordByID = id => HTTP.get(END_POINT + id);

const updateHandlingRecord = payload =>
  HTTP.put(END_POINT + payload._id, payload);

export {
  createHandlingRecord,
  deleteHandlingRecord,
  getHandlingRecords,
  getHandlingRecordByID,
  updateHandlingRecord,
};
