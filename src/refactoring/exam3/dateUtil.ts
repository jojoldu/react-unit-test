import dayjs from 'dayjs';
import { isNil } from 'lodash-es';

export const formatDate = (date: dayjs.ConfigType, format: string) => {
  if (isNil(date)) {
    return '';
  }

  return dayjs(date).format(format);
};

export const firstDayOfMonth = (date: dayjs.ConfigType) =>
  dayjs(date).startOf('month').toDate();
export const lastDayOfMonth = (date: dayjs.ConfigType) =>
  dayjs(date).endOf('month').toDate();
export const now = () => dayjs().toDate();
