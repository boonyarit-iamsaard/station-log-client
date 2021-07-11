export const defaultValues = {
  date: new Date().toISOString().substr(0, 10),
  sickLeaveDetails: {
    shift: '',
    name: '',
    reason: '',
    receivedBy: '',
  },
  overTimeDetails: {
    shift: '',
    name: '',
    requiredBy: '',
    remark: '',
  },
};
