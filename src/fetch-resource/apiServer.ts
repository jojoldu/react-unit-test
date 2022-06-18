export const database = [
  {id: 1},
  {id: 2},
  {id: 3},
]

export function create(): number {
  const max = 99;
  const min = 1;
  return Math.random() * (max - min) + min;
}
