import { engineers } from '@/utils/staffs';

export const stationHandoverFormFields = [
  {
    label: 'Record Date',
    name: 'recordDate',
    type: 'InputDate',
    sm: 4,
    xs: 12,
  },
  {
    clearable: true,
    items: engineers(),
    label: 'Record By',
    name: 'recordBy',
    rules: [],
    type: 'InputAutocomplete',
    sm: 4,
    xs: 12,
  },
  {
    clearable: true,
    label: 'Details',
    name: 'details',
    rules: [],
    upperCase: true,
    type: 'InputTextarea',
    xs: 12,
  },
  {
    label: 'Acknowledged ?',
    name: 'isAcknowledged',
    rules: [],
    type: 'InputCheckbox',
    sm: 4,
    xs: 12,
  },
  {
    clearable: true,
    items: engineers(),
    label: 'Acknowledged By',
    name: 'acknowledgedBy',
    rules: [],
    sm: 4,
    type: 'InputAutocomplete',
    xs: 12,
  },
  {
    label: 'Acknowledged Date',
    name: 'acknowledgedDate',
    sm: 4,
    type: 'InputDate',
    xs: 12,
  },
];
