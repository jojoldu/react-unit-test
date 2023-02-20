import { INIT_PASS_FAIL } from './InitPassFail';

export const checkValidations = <V extends { [key: string]: INIT_PASS_FAIL }>(
  validations: V,
  optionals: (keyof V)[] = [],
) => {
  for (const [key, validation] of Object.entries(validations)) {
    if (!optionals.includes(key) && validation !== INIT_PASS_FAIL.PASS) {
      return false;
    }
  }

  return true;
};
