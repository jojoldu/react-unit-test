import { getCompanyFees } from "./tobe";

describe('basic1/tobe', () => {
  it('spec name', () => {
    //given
    const sellings = [
      {
        sellingAmount: 1000,
        commission: 0.1,
        bankCode: '032'
      },
      {
        sellingAmount: 100,
        commission: 0.1,
        bankCode: '032'
      }
    ]

    // when
    const result = getCompanyFees(sellings);

    // then
    expect(result).toHaveLength(1);
    expect(result[0].fee).toBe(100);
  });
});