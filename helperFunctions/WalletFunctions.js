import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const organizerWithdraw = async (amount, OrganizerId, adminID) => {
  const { data } = await axios.post(
    `${publicRuntimeConfig.API_URL}/api/admin/withdrawOrg`,
    { OrganizerId, adminID, amount },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
};
