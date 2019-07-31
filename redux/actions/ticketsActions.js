import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const getTicketsByEventId = async id => {
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/ticket/getticket`, {
    FilterName: 'eventId',
    id
  });

  return data;
};

export const getTicketsById = async id => {
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/ticket/getticket`, {
    FilterName: 'tbl_jawak_tecket.id',
    id
  });

  return data;
};

export const changeTicketState = async (id, state) => {
  await axios.post(`${publicRuntimeConfig.API_URL}/api/ticket/changeStatus/${id}/${!state}`);
  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/ticket/getticket`, {
    FilterName: 'tbl_jawak_tecket.id',
    id
  });
  return data[0];
};
