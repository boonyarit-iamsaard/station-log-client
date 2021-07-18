import { currentDate } from '@/utils/currentDate';

export const defaultValues = {
  date: currentDate(),
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
