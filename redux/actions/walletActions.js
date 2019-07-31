import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { GET_WALLET_FOR_ORGANIZER } from './types';

export const getWalletForOrganizer = id => async dispatch => {
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/ticket/getOrgwallet/${id}`);

  dispatch({ type: GET_WALLET_FOR_ORGANIZER, payload: data });
};
