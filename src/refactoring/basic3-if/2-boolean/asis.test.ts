import { isAllUnderTen } from './asis';

describe('with boolean', () => {
  it('asis', () => {
    const result = isAllUnderTen([1, 2, 11]);

    expect(result).toBe(false);
  });
});
