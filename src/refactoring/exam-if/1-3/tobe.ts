import { Cart, VoucherOrder } from './voucherOrder';

export const voucherOrderDTO = (voucherOrder: VoucherOrder) => {
  if (!voucherOrder) {
    return null;
  }

  let discountOfProducts = 0;
  let discountOfCoupon = 0;

  const predicate = (cart: Cart) => !!cart.coupon_id;
  voucherOrder.carts.filter(predicate).forEach(({ discount, coupon_id }) => {
    const isDiscountOfCoupon = !!coupon_id;

    const discount1 = discount && discount.dis1 ? discount.dis1 : 0;

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
