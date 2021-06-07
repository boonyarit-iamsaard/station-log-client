import staffs from '@/assets/static-data/staffs.json';

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

const checks = ['ETR', 'OCT', 'TR', '36H', '72H', 'WY', '10DY', 'RTB', 'Other'];

const getEngineersList = () => {
  let list = [];

  staffs.forEach(staff => {
    if (staff.position === 'Engineer') {
      list.push(staff.name);
    }
  });

  return list.sort();
};

const getStaffsList = () => {
  let list = [];

  staffs.forEach(staff => {
    list.push(staff.name);
  });

  return list.sort();
};

export { aircraftTypes, airlines, checks, getEngineersList, getStaffsList };
