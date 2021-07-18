import { format } from 'date-fns';

export const currentDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
