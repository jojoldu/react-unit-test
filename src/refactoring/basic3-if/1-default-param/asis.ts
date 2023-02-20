export function sumAnything(
  num1: number,
  num2: number,
  etc: number | undefined,
) {
  if (etc === undefined) {
    return num1 + num2;
  } else {
    return num1 + num2 + etc;
  }
}
