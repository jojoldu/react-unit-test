import { isEmpty } from 'lodash';

export const Coupon = (coupon: any) => {
  if (isEmpty(coupon)) {
    return {};
  }

  const { discount_type, discount_value} = coupon || { _: {} };

  const { discountPercent, discountPrice } = (() => {
    const discountValueResult = {
      discountPercent: null,
      discountPrice: null,
    };
    if (discount_type === 'percent') {
      discountValueResult.discountPercent = discount_value;
    } else if (discount_type === 'price') {
      discountValueResult.discountPrice = discount_value;
    }
    return discountValueResult;
  })();

  return {
    discountType: discount_type,
    discountValue: discount_value,
    discountPercent,
    discountPrice,
  };
};
