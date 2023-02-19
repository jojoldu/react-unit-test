export const Vote = {
  UP: 'UP',
  DOWN: 'DOWN',
  UP_TO_DOWN: 'UP_TO_DOWN',
  DOWN_TO_UP: 'DOWN_TO_UP',
} as const;

export type Vote = typeof Vote[keyof typeof Vote];
