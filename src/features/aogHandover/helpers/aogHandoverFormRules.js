export const aogHandoverFormRules = {
  fltno: [v => !!v || '* Flt No. is required.'],
  tail: [v => !!v || '* A/C Reg. is required.'],
  details: {
    recordBy: [v => !!v || '* Record By is required.'],
    details: [v => !!v || '* Details is required.'],
    acknowledgedBy: [v => !!v || '* Acknowledged By is required.'],
  },
};
