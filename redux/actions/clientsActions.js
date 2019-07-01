import axios from 'axios';
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
