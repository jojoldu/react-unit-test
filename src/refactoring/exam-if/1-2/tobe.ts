import { isEmpty } from 'lodash';

export const Coupon = (coupon: any) => {
  if (isEmpty(coupon)) {
    return {};
  }

  const { discount_type, discount_value } = coupon || { _: {} };

  const { discountPercent, discountPrice } = (() => ({
    discountPercent: discount_type === 'percent' ? discount_value : null,
    discountPrice: discount_type === 'price' ? discount_value : null,
  }))();

  return {
    discountType: discount_type,
    discountValue: discount_value,
    discountPercent,
    discountPrice,
  };
};
