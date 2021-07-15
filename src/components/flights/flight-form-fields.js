import { engineers, staffs } from '@/utils/staffs';

export const flightDetailFields = [
  {
    label: 'Date',
    name: 'date',
    sm: 4,
    type: 'input-date',
    xs: 12,
  },
  {
    items: ['ASL', 'CX', 'KA', 'LD', 'PR'],
    label: 'Airline',
    name: 'airline',
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
    hint: 'HH:mm',
    label: 'ATA',
    name: 'ata',
    sm: 2,
    time: true,
    type: 'input-text',
    xs: 12,
  },
  {
    hint: 'HH:mm',
    label: 'ATD',
    name: 'atd',
    sm: 2,
    time: true,
    type: 'input-text',
    xs: 12,
  },
  {
    label: 'Bay',
    name: 'bay',
    rules: [],
    sm: 2,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    items: ['10D', '36H', '72H', 'DEP', 'ETR', 'OCT', 'TR', 'WY'],
    label: 'Check-1',
    name: 'check1',
    rules: [],
    sm: 2,
    type: 'input-combo',
    upperCase: true,
    xs: 12,
  },
  {
    hint: 'Optional',
    items: ['10D', '36H', '72H', 'DEP', 'ETR', 'OCT', 'TR', 'WY'],
    label: 'Check-2',
    name: 'check2',
    sm: 2,
    type: 'input-combo',
    upperCase: true,
    xs: 12,
  },
  {
    hint: 'Optional',
    items: ['10D', '36H', '72H', 'DEP', 'ETR', 'OCT', 'TR', 'WY'],
    label: 'Check-3',
    name: 'check3',
    sm: 2,
    type: 'input-combo',
    upperCase: true,
    xs: 12,
  },
];

export const flightHandlingByFields = [
  {
    items: engineers(),
    label: 'Engineer',
    name: 'engineer',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    label: 'Mechanic-1',
    name: 'mechanic1',
    rules: [],
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    hint: 'Optional',
    label: 'Mechanic-2',
    name: 'mechanic2',
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Record By',
    name: 'recordBy',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    label: 'Flight Remark / Handover',
    name: 'remark',
    sm: 12,
    type: 'input-textarea',
    upperCase: true,
    xs: 12,
  },
];
