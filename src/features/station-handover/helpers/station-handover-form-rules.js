export const stationHandoverFormRules = {
  recordBy: [v => !!v || '* Record By is required.'],
  details: [v => !!v || '* Details is required.'],
  acknowledgedBy: [v => !!v || '* Acknowledged By is required.'],
};
