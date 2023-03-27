import { DayOfWeek, LocalDateTime } from '@js-joda/core';

export class Order {
  private _amount: number;
  discount() {
    const now = LocalDateTime.now(); // 현재 시간을 반환하는 메서드
    if (now.dayOfWeek() === DayOfWeek.SUNDAY) {
      this._amount = this._amount * 0.9;
    }
  }
}
