/* eslint-disable */
import { showModal } from './showModal';

export function main(errorCount: number) {
  const name = 'user';
  const alarm = fetchAlarm(name);
  alarm.errorCount = errorCount;

  showModal(alarm.message);
}

export function fetchAlarm(type: string): Alarm {
  return Alarm.of(type, 2);
}

export class Alarm {
  private _name: string;
  private _limit: number;
  private _errorCount = 0;

  constructor() {}

  static of(name: string, limit: number): Alarm {
    const alarm = new Alarm();
    alarm._name = name;
    alarm._limit = limit;

    return alarm;
  }
  set errorCount(value: number) {
    this._errorCount = value;
  }

  get isTooHigh(): boolean {
    return this.errorCount > this._limit;
  }

  get name(): string {
    return this._name;
  }

  get limit(): number {
    return this._limit;
  }

  get errorCount(): number {
    return this._errorCount;
  }

  get message(): string {
    return `${this._name} incident! errorCount=${this._errorCount} ${
      this.isTooHigh ? 'too high' : ''
    }`;
  }
}
