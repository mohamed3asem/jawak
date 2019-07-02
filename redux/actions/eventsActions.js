import Router from 'next/router';
import axios from 'axios';

export const approveEvent = id => async dispatch => {
  await axios.put(`${process.env.API_URL}/api/event/changeStatus`, {
    id,
    statusId: 2
  });
  Router.push('/events');
};

export const getEventsByOrganizerId = async id => {
  const { data } = await axios.post(
    `${process.env.API_URL}/api/event/getEventByFilter`,
    { FilterName: 'organizerId', id }
  );
  return data;
};
