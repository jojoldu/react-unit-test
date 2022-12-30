import { isFulfillPost } from './isFulfillPost';

describe('exam3', () => {
  describe('isFulfillPost', () => {
    it('Post에서 하나라도 값이 있으면 true가 반환된다', () => {
      const result = isFulfillPost('title', [], '', '');

      expect(result).toBe(true);
    });

    it('Post에서 모든 값이 비어 있으면 false가 반환된다', () => {
      const result = isFulfillPost('', [], '', '');

      expect(result).toBe(false);
    });
  });
});
