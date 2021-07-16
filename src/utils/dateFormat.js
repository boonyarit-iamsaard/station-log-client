import { format } from 'date-fns';

export const dateFormat = date => format(new Date(date), 'dd MMM yy');
