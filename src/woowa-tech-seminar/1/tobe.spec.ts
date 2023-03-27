import { Order } from './tobe';
import { LocalDateTime } from '@js-joda/core';

describe('discount', () => {
  it('일요일에는 주문 금액이 10% 할인된다', () => {
    const sut = new Order(10_000);

    sut.discount(LocalDateTime.of(2023, 3, 26));

    expect(sut.amount).toBe(9_000);
  });
});
