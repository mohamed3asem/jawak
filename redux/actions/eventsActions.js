import Router from 'next/router';
import axios from 'axios';
import { APPROVE_EVENT } from './types';

export const approveEvent = id => async dispatch => {
  await axios.put(`${process.env.API_URL}/api/event/changeStatus`, {
    id,
    statusId: 2
  });
  Router.push('/events');
};
