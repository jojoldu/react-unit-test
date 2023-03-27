import { DayOfWeek, LocalDateTime } from '@js-joda/core';

export class Order {
  private _amount: number;

  constructor(amount: number) {
    this._amount = amount;
  }

  discount(now = LocalDateTime.now()) {
    if (now.dayOfWeek() === DayOfWeek.SUNDAY) {
      this._amount = this._amount * 0.9;
    }
  }

  get amount(): number {
    return this._amount;
  }
}
