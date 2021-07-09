export const disinfectionFormRules = {
  airline: [v => !!v || '* Airline is required.'],
  fltno: [v => !!v || '* Flt No. is required.'],
  tail: [v => !!v || '* A/C Reg. is required.'],
  aircraftType: [v => !!v || '* A/C type is required.'],
  startAt: [
    v => !!v || '* Start time is required.',
    v => v.length >= 5 || '* Please enter in HH:mm format.',
  ],
  endAt: [
    v => !!v || '* End time is required.',
    v => v.length >= 5 || '* Please enter in HH:mm format.',
  ],
  mechanic1: [v => !!v || '* Mechanic-1 is required.'],
  mechanic2: [v => !!v || '* Mechanic-2 is required.'],
  chemicalUsage: [
    v => !!v || '* Used (litters) is required.',
    v => v > 0 || 'Used must not be zero.',
  ],
};
