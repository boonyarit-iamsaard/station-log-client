// import { v4 as uuidv4 } from 'uuid';

export const defaultData = {
  date: new Date().toISOString().substr(0, 10),
  airline: 'LD',
  otherAirline: '',
  fltno: '',
  prefix: 'B-',
  tail: '',
  acreg: '',
  aircraftType: '',
  check: '',
  otherCheck: '',
  tasks: [
    {
      // id: uuidv4(),
      taskNo: '',
      taskDetails: '',
      hour: {
        eng: 0,
        mech: 0,
      },
    },
  ],
  eic: '',
};
