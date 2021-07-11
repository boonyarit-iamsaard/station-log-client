// noinspection DuplicatedCode

import HTTP from '@/services/http-service';

const END_POINT = '/manpower/';

const createManpowerRecordRequest = payload => HTTP.post(END_POINT, payload);

const deleteManpowerRecordRequest = id => HTTP.delete(END_POINT + id);

const getManpowerRecordsRequest = () => HTTP.get(END_POINT);

const getManpowerRecordByIDRequest = id => HTTP.get(END_POINT + id);

const updateManpowerRecordRequest = payload =>
  HTTP.put(END_POINT + payload._id, payload);

export {
  createManpowerRecordRequest,
  deleteManpowerRecordRequest,
  getManpowerRecordByIDRequest,
  getManpowerRecordsRequest,
  updateManpowerRecordRequest,
};
