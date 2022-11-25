import { currentDate } from '@/utils/currentDate';

export const stationHandoverFormDefaultValues = {
  recordDate: currentDate(),
  recordBy: '',
  radioCheck: false,
  batteryCheck: false,
  details: '',
  isAcknowledged: false,
  acknowledgedDate: '',
  acknowledgedBy: '',
};
