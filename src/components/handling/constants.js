import chargeableItems from '@/assets/static-data/chargeable-items.json';

const aircraftTypes = [
  'A320',
  'A321',
  'A306',
  'A330',
  'A33F',
  'A350',
  'B777',
  'Other',
];

const airlines = ['ASL', 'CX', 'KA', 'LD', 'PR', 'UO', 'Other'];

const checks = ['ETR', 'OCT', 'TR', '36H', '72H', 'WY', '10DY', 'Other'];

const handlingData = {
  acreg: '',
  aircraftType: '',
  airline: 'LD',
  brakeCooling: {
    fan: 0,
    hour: {
      mech: 0,
      eng: 0,
    },
  },
  check: '',
  date: new Date().toISOString().substr(0, 10),
  eic: '',
  fltno: '',
  otherAirline: '',
  otherCheck: '',
  prefix: 'B-',
  remark: '',
  services: [],
  tail: '',
  tasks: [],
};

const task = {
  taskNo: '',
  taskDetails: '',
  hour: {
    eng: 0,
    mech: 0,
  },
};

const service = {
  service: 'Please select',
  chargeType: 'per service',
  usage: 0,
  hour: {
    eng: 0,
    mech: 0,
  },
};

const getChargeablePerHourItems = () => {
  let items = [];
  chargeableItems.forEach(service => {
    if (service.type === 'per hour') {
      items.push(service.name);
    }
  });

  return items;
};

const getChargeablePerServiceItems = () => {
  let items = [];
  chargeableItems.forEach(service => {
    if (service.inclusive === false) {
      items.push(service.name);
    }
  });

  return items;
};

const getChargeableItems = () => {
  let items = [];
  chargeableItems.forEach(service => items.push(service.name));

  return items;
};

export {
  aircraftTypes,
  airlines,
  checks,
  getChargeablePerHourItems,
  getChargeablePerServiceItems,
  handlingData,
  service,
  getChargeableItems,
  task,
};
