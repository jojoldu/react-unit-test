import { isAllUnderTen } from './tobe';

describe('with boolean', () => {
  it('tobe', () => {
    const result = isAllUnderTen([1, 2, 11]);

    expect(result).toBe(false);
  });
});
