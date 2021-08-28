export const flightFormRules = {
  fltno: [v => !!v || '* Flt No. is required.'],
  tail: [v => !!v || '* A/C Reg. is required.'],
  bay: [v => !!v || '* Parking bay is required.'],
  check1: [v => !!v || '* Check-1 is required.'],
  tasks: {
    taskDetails: [v => !!v || '* Task details is required.'],
  },
  extraGroundEquipments: {
    company: [v => !!v || '* Company is required.'],
    equipment: [v => !!v || '* Equipment is required.'],
  },
  chargeableServices: {
    service: [v => !!v || '* Service / Equipment is required.'],
    usage: [
      v => !!v || '* Usage is required.',
      v => v > 0 || '* Usage must not be zero.',
    ],
  },
  assignedDelays: {
    code: [v => !!v || '* Delay code is required.'],
    duration: [v => !!v || '* Delay duration is required.'],
  },
  engineer: [v => !!v || '* Engineer is required.'],
  mechanic1: [v => !!v || '* Mechanic-1 is required.'],
  recordBy: [v => !!v || '* Record By is required.'],
  acknowledgedBy: [v => !!v || '* Acknowledged By is required.'],
};
