export type Alarm = {
  name: string;
  limit: number;
  errorCount?: number;
  isTooHigh?: boolean;
};

export function main(errorCount: number) {
  const alarm = fetchAlarm('user');
  alarm.errorCount = errorCount;

  if (alarm.errorCount > alarm.limit) {
    alarm.isTooHigh = true;
  }

  showModal(
    `user incident! errorCount=${errorCount} ${
      alarm.isTooHigh ? 'too high' : ''
    }`,
  );
}

function fetchAlarm(type: string): Alarm {
  return {
    name: type,
    limit: 2,
  };
}

function showModal(message: string) {
  console.log(message);
}
