import HTTP from '@/services/http-service';

const END_POINT = '/spares/';

const createSpare = payload => HTTP.post(END_POINT, payload);

const deleteSpare = id => HTTP.delete(END_POINT + id);

const getSpares = () => HTTP.get(END_POINT);

const getSpareByID = id => HTTP.get(END_POINT + id);

const updateSpare = payload => HTTP.put(END_POINT + payload._id, payload);

export { createSpare, deleteSpare, getSpares, getSpareByID, updateSpare };
