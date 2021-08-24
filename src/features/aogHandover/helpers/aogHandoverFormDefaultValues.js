import { currentDate } from '@/utils/currentDate';

export const aogHandoverFormDefaultValues = {
  fltDate: currentDate(),
  airline: 'CX',
  fltno: '',
  prefix: 'B-',
  tail: '',
  acreg: '',
  details: [],
};
