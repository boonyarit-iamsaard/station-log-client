import { engineers, staffs } from '@/utils/staffs';

export const sickLeaveDetailFields = [
  {
    label: 'Shift',
    name: 'shift',
    rules: [],
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Name',
    name: 'name',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Received by',
    name: 'receivedBy',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    label: 'Reason / Remark',
    name: 'reason',
    rules: [],
    sm: 12,
    type: 'input-textarea',
    upperCase: true,
    xs: 12,
  },
];

export const overTimeDetailFields = [
  {
    label: 'Shift',
    name: 'shift',
    rules: [],
    sm: 3,
    type: 'input-text',
    upperCase: true,
    xs: 12,
  },
  {
    items: staffs(),
    label: 'Name',
    name: 'name',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    items: engineers(),
    label: 'Required by',
    name: 'requiredBy',
    rules: [],
    sm: 3,
    type: 'input-autocomplete',
    xs: 12,
  },
  {
    label: 'Reason / Remark',
    name: 'reason',
    rules: [],
    sm: 12,
    type: 'input-textarea',
    upperCase: true,
    xs: 12,
  },
];
