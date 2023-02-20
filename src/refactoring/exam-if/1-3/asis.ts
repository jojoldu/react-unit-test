import { VoucherOrder } from './voucherOrder';

export const voucherOrderDTO = (voucherOrder: VoucherOrder) => {
  if (!voucherOrder) {
    return null;
  }

  let discountOfProducts = 0;
  let discountOfCoupon = 0;

  voucherOrder.carts.forEach(({ discount, coupon_id }) => {
    const isDiscountOfCoupon = !!coupon_id;

    let discount1 = 0;
    if (discount !== null && discount !== undefined) {
      discount1 = discount.dis1 || 0;
    }

    if (isDiscountOfCoupon) {
      discountOfCoupon = discountOfCoupon + discount1;
    } else {
      discountOfProducts = discountOfProducts + discount1;
    }
  });

  return {
    discountOfProducts,
    discountOfCoupon,
  };
};
