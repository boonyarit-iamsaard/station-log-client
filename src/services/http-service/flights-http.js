import HTTP from '@/services/http-service';

const END_POINT = '/flights/';

const createFlightRequest = payload => HTTP.post(END_POINT, payload);

const deleteFlightRequest = id => HTTP.delete(END_POINT + id);

const getFlightsRequest = () => HTTP.get(END_POINT);

const getFlightByIDRequest = id => HTTP.get(END_POINT + id);

const updateFlightRequest = payload =>
  HTTP.put(END_POINT + payload._id, payload);

export {
  createFlightRequest,
  deleteFlightRequest,
  getFlightByIDRequest,
  getFlightsRequest,
  updateFlightRequest,
};
