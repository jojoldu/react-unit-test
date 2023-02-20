export function isAllUnderTen(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] >= 10) {
      return false;
    }
  }
  return true;
}
