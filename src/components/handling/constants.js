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

const airlines = ['ASL', 'CX', 'KA', 'LD', 'PR', 'Other'];

const checks = ['ETR', 'OCT', 'TR', '36H', '72H', 'WY', '10DY', 'Other'];

const handlingData = {
  acreg: '',
  aircraftType: '',
  airline: 'LD',
  brakeCooling: 0,
  check: '',
  date: new Date().toISOString().substr(0, 10),
  eic: '',
  fltno: '',
  hasBrakeCooling: false,
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

const servicesList = [
  {
    name: 'Please select',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Aircraft Chocks, Oil/Fuel Service Stands',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Axle Jack',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Compress Nitrogen (strut/door)',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Compress Nitrogen (tyre)',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Maintenance Lift Stand (CX-04)',
    inclusive: false,
    type: 'per hour',
  },
  {
    name: 'Maintenance Lift Stand (CX-stand)',
    inclusive: false,
    type: 'per hour',
  },
  {
    name: 'Pump for oil servicing',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Temp gauge for brake',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Torque Wrench',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Tyre Change',
    inclusive: true,
    type: 'per service',
  },
  {
    name: 'Tyre Pressure Gauge',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Wheel Change Dolly',
    inclusive: false,
    type: 'per service',
  },
  {
    name: 'Wheel Change Toolkit (exclude N2 charge)',
    inclusive: false,
    type: 'per service',
  },
];

const exclusivePerHour = () => {
  let items = [];
  servicesList.forEach(service => {
    if (service.type === 'per hour') {
      items.push(service.name);
    }
  });

  return items;
};

const exclusivePerService = () => {
  let items = [];
  servicesList.forEach(service => {
    if (service.inclusive === false) {
      items.push(service.name);
    }
  });

  return items;
};

const serviceNames = () => {
  let items = [];
  servicesList.forEach(service => items.push(service.name));

  return items;
};

export {
  aircraftTypes,
  airlines,
  checks,
  exclusivePerHour,
  exclusivePerService,
  handlingData,
  service,
  serviceNames,
  task,
};
