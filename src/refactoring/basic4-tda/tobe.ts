export class Alarm {
  private _type: string;
  private _name: string;
  private _limit: number;
  private _errorCount = 0;

  constructor() {}

  static of(type: string, name: string, limit: number): Alarm {
    const alarm = new Alarm();
    alarm._type = type;
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
    return `${this._type} incident! errorCount=${this._errorCount} ${
      this.isTooHigh ? 'too high' : ''
    }`;
  }
}
