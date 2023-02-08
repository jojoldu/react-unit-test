import { fetchAlarm } from './fetchAlarm';
import { showModal } from './showModal';

export type Alarm = {
  name: string;
  limit: number;
  errorCount?: number;
  isTooHigh?: boolean;
};

export function main(errorCount: number) {
  const name = 'user';
  const alarm = fetchAlarm(name);
  alarm.errorCount = errorCount;

  if (alarm.errorCount > alarm.limit) {
    alarm.isTooHigh = true;
  }

  /**
   * 메세지에 필요한게 무엇인지 하나하나 다 물어본다.
   *   메세지가 어떤 내용이어야 한다.
   *   이런것들이 모두 내가 다뤄야한다.
   */
  showModal(
    `${name} incident! errorCount=${errorCount} ${
      alarm.isTooHigh ? 'too high' : ''
    }`,
  );
}
