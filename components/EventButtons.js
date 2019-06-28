import React from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
const { publicRuntimeConfig } = getConfig();

const EventButtons = ({ status, eventId }) => {
  const approveEvent = async id => {
    await axios.put(`${publicRuntimeConfig.apiUrl}/api/event/changeStatus`, {
      id,
      statusId: 2
    });
    Router.push('/events');
  };

  if (status === 'Pending Approval') {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => approveEvent(eventId)}
      >
        Approve
      </Button>
    );
  }

  return <div />;
};

export default EventButtons;
