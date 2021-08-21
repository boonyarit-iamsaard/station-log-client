import api from '@/api/api';

const URLS = {
  stationHandoverURL: '/station-handover',
};

export const fetchStationHandover = () => {
  return api.get(URLS.fetchStationHandoverURL);
};
