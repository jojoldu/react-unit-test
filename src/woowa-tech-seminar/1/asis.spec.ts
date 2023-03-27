import { Order } from './asis';

describe('discount', () => {
  it('일요일에는 주문 금액이 10% 할인된다', () => {
    const sut = new Order(10_000);

    sut.discount();

    expect(sut.amount).toBe(9_000);
  });
});
