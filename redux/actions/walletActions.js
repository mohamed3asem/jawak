import axios from 'axios';
import { GET_WALLET_FOR_ORGANIZER } from './types';

export const getWalletForOrganizer = id => async dispatch => {
  const { data } = await axios.post(
    `${process.env.API_URL}/api/ticket/getOrgwallet/${id}`
  );

  dispatch({ type: GET_WALLET_FOR_ORGANIZER, payload: data });
};
