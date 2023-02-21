import { sumAnything} from './tobe';
import { sumAnythingOr } from './tobe2';

describe('basic3-if / 1-default-param / tobe', () => {
  it('호출 파라미터가 없으면 기본 파라미터가 사용된다', () => {
    const result = sumAnything(1, 2);
    expect(result).toBe(3);
  });

  it('undefined로 넘기면 기본 파라미터가 사용된다', () => {
    const result = sumAnything(1, 2, undefined);
    expect(result).toBe(3);
  });

  it('3항연산자', () => {
    const result = sumAnythingOr(1, 2, null);
    expect(result).toBe(3);
  });
});
