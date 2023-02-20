import { VoucherOrder } from '../voucherOrder';
import { sumVoucherCouponAmount, sumVoucherProductAmount, } from './calculateVoucherAmount';

export const voucherOrderDTO = (voucherOrder: VoucherOrder) => {
  if (!voucherOrder) {
    return null;
  }

  const discountOfProducts = sumVoucherProductAmount(voucherOrder.carts);
  const discountOfCoupon = sumVoucherCouponAmount(voucherOrder.carts);

  // const discountOfProducts = sumVoucherAmountBy(
  //   (cart) => !cart.coupon_id,
  //   voucherOrder.carts,
  // );
  //
  // const discountOfCoupon = sumVoucherAmountBy(
  //   (cart) => !!cart.coupon_id,
  //   voucherOrder.carts,
  // );

  return {
    discountOfProducts,
    discountOfCoupon,
  };
};
