export const INIT_PASS_FAIL = {
  INIT: 'init',
  PASS: 'pass',
  FAIL: 'fail',
} as const;

export type INIT_PASS_FAIL = typeof INIT_PASS_FAIL[keyof typeof INIT_PASS_FAIL];
