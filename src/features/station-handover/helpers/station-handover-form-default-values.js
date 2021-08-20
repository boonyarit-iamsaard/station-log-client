import { currentDate } from '@/utils/currentDate';

export const stationHandoverFormDefaultValues = {
  recordDate: currentDate(),
  recordBy: '',
  details: '',
  isAcknowledged: false,
  acknowledgedDate: currentDate(),
  acknowledgedBy: '',
};
