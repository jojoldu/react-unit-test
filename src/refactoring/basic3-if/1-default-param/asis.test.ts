import { sumAnything } from './asis';

describe('asis', () => {
  it('3번째 인자는 undefined이면 0으로 처리된다', () => {
    const result = sumAnything(1, 2, undefined);
    expect(result).toBe(3);
  });
});
