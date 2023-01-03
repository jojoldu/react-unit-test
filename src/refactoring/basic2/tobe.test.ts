import { getCompanyFee } from './tobe';
import dayjs from "dayjs";

describe('basic2/tobe', () => {
  it('현재시간의 한달 뒤가 결제일이 된다', () => {
    // given
    const now = dayjs('2023-01-04');

    // when
    const result = getCompanyFee({
      sellingAmount: 1000,
      commission: 0.1,
      bankCode: '032'
    },
      now) // Optional Arguments

    // then
    expect(result.billedAt).toBe('2023-02-04');
  });
});