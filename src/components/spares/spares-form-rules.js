export const sparesFormRules = {
  fltno: [v => !!v || 'Flt No. is required.'],
  tail: [v => !!v || 'A/C Reg. is required.'],
  part: [v => !!v || 'Part No. is required.'],
  desc: [v => !!v || 'Description is required.'],
  serial: [v => !!v || 'Serial No. is required.'],
  grn: [
    v => !!v || 'GRN is required.',
    v => v.length >= 10 || 'GRN must contains 10 characters',
  ],
  qty: [v => !!v || 'QTY is required.', v => v >= 1 || 'QTY must not equal 0'],
  usedBy: [v => !!v || 'Used By is required.'],
  issuedNumber: [v => !!v || 'IS No. is required.'],
  issuedBy: [v => !!v || 'Required.'],
  returnedNumber: [v => !!v || 'IR No. is required.'],
  returnedBy: [v => !!v || 'Required.'],
  transferredNumber: [v => !!v || 'TX No. is required.'],
  transferredBy: [v => !!v || 'Required.'],
};
