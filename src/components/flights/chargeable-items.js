import chargeableItemsData from '@/assets/static-data/chargeable-items.json';

export const chargeableItems = () => {
  let items = [];

  chargeableItemsData.forEach(item => items.push(item.name));

  return items;
};

export const chargeablePerHourItems = () => {
  let items = [];

  chargeableItemsData.forEach(item => {
    if (item.type === 'per hour') {
      items.push(item.name);
    }
  });

  return items;
};

export const chargeablePerServiceItems = () => {
  let items = [];

  chargeableItemsData.forEach(item => {
    if (item.inclusive === false) {
      items.push(item.name);
    }
  });

  return items;
};
