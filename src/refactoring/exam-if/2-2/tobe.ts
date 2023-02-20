import { INIT_PASS_FAIL } from './InitPassFail';

export const checkValidations = <V extends { [key: string]: INIT_PASS_FAIL }>(
  validations: V,
  optionals: (keyof V)[] = [],
) =>
  Object.keys(validations).every(
    (key) =>
      optionals.includes(key) || validations[key] === INIT_PASS_FAIL.PASS,
  );
