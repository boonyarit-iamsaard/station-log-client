import { staffs } from '@/utils/staffs';

export const disinfectionFields = [
  {
    label: 'Date',
    name: 'date',
    sm: 4,
    type: 'input-date',
    xs: 12,
  },
  {
    items: ['ASL', 'CX', 'KA', 'KE', 'LD', 'OZ', 'PR', 'UO'],
    label: 'Airline',
    name: 'airline',
    rules: [],
    sm: 2,
    type: 'input-combo',
    upperCase: true,
    xs: 12,
  },
  {
    label: 'Flt No.',
    name: 'fltno',
    rules: [],
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    label: 'Reg.',
    name: 'tail',
    prefix: true,
    rules: [],
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    items: [
      'A306',
      'A320',
      'A321',
      'A330',
      'A33F',
      'A350',
      'A380',
      'B747',
      'B767',
      'B777',
      'B787',
    ],
    label: 'Aircraft Type',
    name: 'aircraftType',
    rules: [],
    sm: 3,
    upperCase: true,
    type: 'input-combo',
    xs: 12,
  },
  {
    hint: 'HH:mm',
    label: 'Start time',
    name: 'startAt',
    rules: [],
    sm: 3,
    time: true,
    type: 'input-text',
    xs: 12,
  },
  {
    hint: 'HH:mm',
    label: 'End time',
    name: 'endAt',
    rules: [],
    sm: 3,
    time: true,
    type: 'input-text',
    xs: 12,
  },
  {
    label: 'Used (liters)',
    name: 'chemicalUsage',
    sm: 3,
    rules: [],
    type: 'input-text',
    number: true,
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Mechanic-1',
    name: 'mechanic1',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Mechanic-2',
    name: 'mechanic2',
    sm: 3,
    rules: [],
    type: 'input-autocomplete',
    xs: 12,
  },
];
