export function sumAnythingOr(
  num1: number,
  num2: number,
  etc: number | undefined | null,
) {
  etc = etc || 0;
  return num1 + num2 + etc;
}
