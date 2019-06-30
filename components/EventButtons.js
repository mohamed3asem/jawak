import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { approveEvent } from '../redux/actions';

const EventButtons = ({ status, eventId, approveEvent }) => {
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

const mapDispatchToProps = dispatch => ({
  approveEvent: id => dispatch(approveEvent(id))
});

export default connect(
  undefined,
  mapDispatchToProps
)(EventButtons);
