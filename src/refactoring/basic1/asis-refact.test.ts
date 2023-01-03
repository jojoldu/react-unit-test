import { sendFee, sendFees } from "./asis-refact";
import { apiSendFee } from "./api/apiSendFee";

jest.mock('./api/apiSendFee');

/**
 * 1. 계산식에 대한 검증을 못함
 * 2. mocking 해야하는 API가 바뀌면 (axios -> react query, swr 등) mocking 테스트 다 교체 해야함
 * 3. 새로운 mocking 도구를 쓰려면 테스트 전체를 교체해야함
 */
describe('basic1/asis-refact', () => {
  describe('sendFee', () => {
    it('100원이상이면 api를 호출한다', () => {
      // when
      sendFee({
        sellingAmount: 1000,
        commission: 0.1,
        bankCode: '032'
      });

      // then
      expect(apiSendFee).toBeCalledTimes(1);
    });

    it('100원미만이면 api를 호출하지 않는다', () => {
      // when
      sendFee({
        sellingAmount: 100,
        commission: 0.1,
        bankCode: '032'
      });

      //then
      expect(apiSendFee).toBeCalledTimes(0);
    });
  });

  describe('sendFees', () => {
    it('100원이상인 건수만큼 api를 호출한다', () => {
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
      sendFees(sellings);

      // then
      expect(apiSendFee).toBeCalledTimes(1);
    });
  });
});