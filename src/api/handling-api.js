import HTTP from './http-common';

const END_POINT = '/handling/';

const createHandling = payload => HTTP.post(END_POINT, payload);

const deleteHandling = id => HTTP.delete(END_POINT + id);

const getHandlings = () => HTTP.get(END_POINT);

const getHandlingByID = id => HTTP.get(END_POINT + id);

const updateHandling = payload => HTTP.put(END_POINT + payload._id, payload);

export {
  createHandling,
  deleteHandling,
  getHandlings,
  getHandlingByID,
  updateHandling,
};
