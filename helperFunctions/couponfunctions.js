import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const changeCouponState = async (id, activityState) => {
  await axios.put(`${publicRuntimeConfig.API_URL}/api/coupon/edit`, {
    id,
    isActive: !activityState
  });
};

export const createNewCoupon = async ({ code, discount }) => {
  await axios.post(`${publicRuntimeConfig.API_URL}/api/coupon/create`, {
    code,
    discount
  });
};
