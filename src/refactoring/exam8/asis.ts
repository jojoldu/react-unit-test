import { isEmpty } from 'lodash';

export const Coupon = coupon => {
  if (isEmpty(coupon)) {
    return {};
  }

  const {
    discount_type,
    discount_value,
    id,
    title,
    limit_cnt,
    user_cnt,
    expire_offset,
    ended_at: couponEndedAt,
    _: { my_info },
  } = coupon || { _: {} };

  const { user_id, used_at, ended_at } = my_info || {};
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
    id,
    title,
    roadmapHasCoupon: !!id,
    discountType: discount_type,
    discountValue: discount_value,
    discountPercent,
    discountPrice,
    limitCount: limit_cnt,
    issueCount: user_cnt,
    isUnlimitedToIssue: limit_cnt === 0,
    remainCount: limit_cnt >= user_cnt ? limit_cnt - user_cnt : 0,
    userIdHasCoupon: user_id,
    hasCoupon: !!user_id,
    usedAt: used_at,
    couponEndedAt,
    endedAt: ended_at,
    expireOffset: expire_offset,
  };
};
