import axios from 'axios';

export const changeCouponState = async (id, activityState) => {
  await axios.put(`${process.env.API_URL}/api/coupon/edit`, {
    id,
    isActive: !activityState
  });
};

export const createNewCoupon = async ({ code, discount }) => {
  await axios.post(`${process.env.API_URL}/api/coupon/create`, {
    code,
    discount
  });
};
