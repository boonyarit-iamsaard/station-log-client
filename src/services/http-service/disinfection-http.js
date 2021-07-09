import HTTP from '@/services/http-service';

const END_POINT = '/disinfection/';

const createDisinfectionRequest = payload => HTTP.post(END_POINT, payload);

const deleteDisinfectionRequest = id => HTTP.delete(END_POINT + id);

const getDisinfectionListRequest = () => HTTP.get(END_POINT);

const getDisinfectionByIDRequest = id => HTTP.get(END_POINT + id);

const updateDisinfectionRequest = payload =>
  HTTP.put(END_POINT + payload._id, payload);

export {
  createDisinfectionRequest,
  deleteDisinfectionRequest,
  getDisinfectionByIDRequest,
  getDisinfectionListRequest,
  updateDisinfectionRequest,
};
