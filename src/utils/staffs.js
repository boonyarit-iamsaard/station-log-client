import staffs from '@/assets/static-data/staffs.json';

const engineersList = () => {
  let list = [];

  staffs.forEach(staff => {
    if (staff.position === 'Engineer') {
      list.push(staff.name);
    }
  });

  return list.sort();
};

const staffsList = () => {
  let list = [];

  staffs.forEach(staff => {
    list.push(staff.name);
  });

  return list.sort();
};

export { engineersList, staffsList };
