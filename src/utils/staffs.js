import staffsData from '@/assets/static-data/staffs.json';

const engineers = () => {
  let list = [];

  staffsData.forEach(staff => {
    if (staff.position === 'Engineer') {
      list.push(staff.name);
    }
  });

  return list.sort();
};

const staffs = () => {
  let list = [];

  staffsData.forEach(staff => {
    list.push(staff.name);
  });

  return list.sort();
};

export { engineers, staffs };
