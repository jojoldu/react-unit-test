import { Post } from './Post';

describe('exam1', () => {
  describe('isFulfillPost', () => {
    it('Post에서 하나라도 값이 있으면 true가 반환된다', () => {
      const result = new Post('title', [], '', '');

      expect(result).toBe(true);
    });
  });
});
