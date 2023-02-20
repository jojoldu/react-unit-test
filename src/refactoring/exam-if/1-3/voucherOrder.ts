export type VoucherOrder = {
  carts: Cart[];
};

export type Cart = {
  discount: Discount;
  coupon_id: number;
};

export type Discount = {
  dis1: number;
};
