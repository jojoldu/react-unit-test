import { Cart } from '../voucherOrder';

export function sumVoucherProductAmount(carts: Cart[]): number {
  return sumVoucherAmountBy((cart) => !cart.coupon_id, carts);
}

export function sumVoucherCouponAmount(carts: Cart[]): number {
  return sumVoucherAmountBy((cart) => !!cart.coupon_id, carts);
}

export function sumVoucherAmountBy(
  predicate: (value: Cart, index: number, array: Cart[]) => boolean,
  carts: Cart[],
): number {
  return carts
    .filter(predicate)
    .map((cart) =>
      cart.discount && cart.discount.dis1 ? cart.discount.dis1 : 0,
    )
    .reduce((partialSum, a) => partialSum + a, 0);
}
