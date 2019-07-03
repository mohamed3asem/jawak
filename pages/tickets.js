import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../components/SearchBar';
import Table from '../components/Table';
import { getTicketsByEventId, getTicketsById } from '../redux/actions';
import { tblTickets } from '../fixtures/fixtures';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 3),
    textAlign: 'center'
  },
  searchWrap: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const Tickets = ({ events }) => {
  const [tickets, setTickets] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(
    'Please choose an event or type a ticket number.'
  );
  const classes = useStyles();

  const handleSearch = async id => {
    if (!id) {
      setError(true);
      setMessage('No event selected. Please select one.');
      setTickets(null);
      return;
    }
    const tickets = await getTicketsByEventId(id);
    if (tickets.length === 0) {
      setError(false);
      setMessage('There is no tickets for that event');
      setTickets(null);
      return;
    }
    setTickets(tickets);
  };

  const handlePress = async e => {
    if (e.keyCode === 13) {
      if (!e.target.value) {
        return;
      }
      const ticket = await getTicketsById(e.target.value);
      if (ticket.length === 0) {
        setError(true);
        setMessage('Sorry, Wrong ticket Number');
        setTickets(null);
        return;
      }
      setTickets(ticket);
    }
  };
  const renderTickets = () => {
    if (!tickets) {
      return (
        <div>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              Find a ticket
            </Typography>
            <Typography component="p" color={error ? 'error' : 'initial'}>
              {message}
            </Typography>
          </Paper>
        </div>
      );
    }
    return <Table data={tickets} headers={tblTickets} type="tickets" />;
  };

  return (
    <Container>
      <div className={classes.searchWrap}>
        <SearchBar
          label="Event Name"
          text="Search by Event Name"
          values={events}
          handleSearch={handleSearch}
        />
        <TextField
          id="search"
          label="Search by Ticket No."
          type="search"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          onKeyDown={handlePress}
        />
      </div>
      <div>{renderTickets()}</div>
    </Container>
  );
};

Tickets.getInitialProps = async () => {
  const { data: events } = await axios.post(
    `${process.env.API_URL}/api/Event/getAllEvents`
  );

  return { events };
};

const mapStateToProps = ({ loading }) => ({ loading });

export default connect(mapStateToProps)(Tickets);
