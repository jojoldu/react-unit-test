import { Order } from './asis';
import { LocalDateTime } from '@js-joda/core';

describe('discount', () => {
  it('일요일에는 주문 금액이 10% 할인된다', () => {
    const sut = new Order(10_000);

    sut.discount();

    expect(sut.amount).toBe(9_000);
  });

  it('[Mock] 일요일에는 주문 금액이 10% 할인된다', () => {
    jest.mock('@js-joda/core');
    LocalDateTime.now = jest
      .fn()
      .mockReturnValue(LocalDateTime.of(2023, 3, 26));

    const sut = new Order(10_000);

    sut.discount();

    expect(sut.amount).toBe(9_000);
  });
});
