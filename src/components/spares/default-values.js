import { currentDate } from '@/utils/currentDate';

export const spareData = {
  date: currentDate(),
  airline: 'CX',
  fltno: '',
  prefix: 'B-',
  tail: '',
  acreg: '',
  type: 'Consumable',
  part: '',
  desc: '',
  serial: 'NIL',
  grn: '',
  qty: 0,
  store: 'BKK',
  usedBy: '',
  status: 'Pending',
  issued: {
    by: '',
    date: currentDate(),
    number: '',
    status: false,
  },
  returned: {
    by: '',
    date: currentDate(),
    number: '',
    status: false,
  },
  transferred: {
    by: '',
    date: currentDate(),
    number: '',
    status: false,
  },
};
