import HTTP from './http-common';

const END_POINT = '/spares/';

const getSpares = () => HTTP.get(END_POINT);

const getSpareByID = id => HTTP.get(END_POINT + id);

export { getSpares, getSpareByID };
