import { Alarm } from './asis';

export function fetchAlarm(type: string): Alarm {
  return {
    name: type,
    limit: 2,
  };
}
