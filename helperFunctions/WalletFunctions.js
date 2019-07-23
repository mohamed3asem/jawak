import axios from 'axios';

export const organizerWithdraw = async (amount, OrganizerId, adminID) => {
  const { data } = await axios.post(
    `${process.env.API_URL}/api/admin/withdrawOrg`,
    { OrganizerId, adminID, amount },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
};
