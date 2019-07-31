import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { GET_CUSTOMER_BY_ID, GET_ORGANIZER_BY_ID } from './types';

export const getOrganizerById = id => async dispatch => {
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/Organizer/getOrganizer`, {
    filtername: 'id',
    id
  });
  dispatch({ type: GET_ORGANIZER_BY_ID, payload: data });
};

export const getCustomerById = id => async dispatch => {
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/user/getuser/${id}`);
  dispatch({ type: GET_CUSTOMER_BY_ID, payload: data });
};

export const changeClientState = async (id, state, type) => {
  if (type === 'customers') {
    await axios.put(`${publicRuntimeConfig.API_URL}/api/user/locking/${id}/${!state}`);
  } else {
    await axios.put(`${publicRuntimeConfig.API_URL}/api/organizer/locking/${id}/${!state}`);
  }
  Router.push('/clients');
};

export const editOrganizerById = async (id, values) =>
  await axios.put(`${publicRuntimeConfig.API_URL}/api/organizer/editorganizer`, {
    id,
    ...values
  });
