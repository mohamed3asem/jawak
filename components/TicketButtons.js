import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { changeTicketState } from '../redux/actions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const TicketButtons = ({ ticketId, paymentMethod, status, attendStatus }) => {
  const [ticketStatus, setTicketStatus] = useState(status);
  const classes = useStyles();

  const handleClick = async (id, status) => {
    const updatedTicket = await changeTicketState(id, status);
    setTicketStatus(updatedTicket.status);
  };

  return (
    <div className={classes.root}>
      <Chip label={paymentMethod} className={classes.chip} />
      <Chip
        label={attendStatus}
        className={classes.chip}
        color={attendStatus === 'Attended' ? 'primary' : 'secondary'}
        icon={attendStatus === 'Attended' ? <DoneIcon /> : <CloseIcon />}
      />
      <Chip
        style={{ minWidth: '100px' }}
        label={ticketStatus ? 'Valid' : 'Invalid'}
        className={classes.chip}
        color={ticketStatus ? 'primary' : 'secondary'}
        icon={ticketStatus ? <DoneIcon /> : <CloseIcon />}
        onClick={() => handleClick(ticketId, ticketStatus)}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  approveEvent: id => dispatch(approveEvent(id))
});

export default connect(
  undefined,
  mapDispatchToProps
)(TicketButtons);
