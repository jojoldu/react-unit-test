import { getCompanyFee } from './asis';

describe('basic2/asis', () => {
  it('현재시간의 한달 뒤가 결제일이 된다', () => {
    // given
    jest.mock('dayjs', () =>
      jest.fn(() => jest.requireActual('dayjs')('2023-01-04')),
    ); // 1월 4일로 new Date를 Mocking

    // when
    const result = getCompanyFee({
      sellingAmount: 1000,
      commission: 0.1,
      bankCode: '032',
    });

    // then
    expect(result.billedAt).toBe('2023-02-04'); // 무사히 2월 4일이 됨
    // 하지만 또 Mock을 해야하네??
  });
});
