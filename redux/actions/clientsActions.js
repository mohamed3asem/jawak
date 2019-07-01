import axios from 'axios';
import Router from 'next/router';
import { GET_CUSTOMER_BY_ID, GET_ORGANIZER_BY_ID } from './types';

export const getOrganizerById = id => async dispatch => {
  const { data } = await axios.post(
    `${process.env.API_URL}/api/Organizer/getOrganizer`,
    { filtername: 'id', id }
  );
  dispatch({ type: GET_ORGANIZER_BY_ID, payload: data });
};

export const getCustomerById = id => async dispatch => {
  const { data } = await axios.post(
    `${process.env.API_URL}/api/user/getuser/${id}`
  );
  dispatch({ type: GET_CUSTOMER_BY_ID, payload: data });
};

export const archiveClient = async (id, type) => {
  if (type === 'customers') {
    await axios.put(`${process.env.API_URL}/api/user/locking/${id}/${true}`);
  } else {
    await axios.put(
      `${process.env.API_URL}/api/organizer/locking/${id}/${true}`
    );
  }
  Router.push('/clients');
};

export const activateClient = async (id, type) => {
  if (type === 'customers') {
    await axios.put(`${process.env.API_URL}/api/user/locking/${id}/${false}`);
  } else {
    await axios.put(
      `${process.env.API_URL}/api/organizer/locking/${id}/${false}`
    );
  }
  Router.push('/clients');
};