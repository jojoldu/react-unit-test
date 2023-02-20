import { VoucherOrder } from '../voucherOrder';
import { sumVoucherAmountBy } from './calculateVoucherAmount';

export const voucherOrderDTO = (voucherOrder: VoucherOrder) => {
  if (!voucherOrder) {
    return null;
  }

  const discountOfProducts = sumVoucherAmountBy(
    (cart) => !cart.coupon_id,
    voucherOrder.carts,
  );

  const discountOfCoupon = sumVoucherAmountBy(
    (cart) => !!cart.coupon_id,
    voucherOrder.carts,
  );

  return {
    discountOfProducts,
    discountOfCoupon,
  };
};
