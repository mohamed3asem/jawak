import { useState } from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from '../components/TabContainer';
import Table from '../components/Table';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { tblOrganizers, tblCustomers } from '../fixtures/fixtures';
import { filterClients } from '../helperFunctions/clientsFunctions';

const tabHeaders = [
  { id: '1', text: 'Organizers' },
  { id: '2', text: 'Customers' }
];

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    width: '35%',
    marginBottom: theme.spacing(3)
  }
}));

const Clients = ({ clients, allOrganizers, allCustomers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [organizers, setOrganizers] = useState(clients.allOrganizers);
  const [customers, setCustomers] = useState(clients.allCustomers);

  const handleInputChange = e => {
    const { value } = e.target;
    const filteredOrganizers = filterClients(allOrganizers, value);
    const filteredCustomers = filterClients(allCustomers, value);
    setOrganizers(filteredOrganizers);
    setCustomers(filteredCustomers);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Container fixed>
      <TextField
        id="search"
        label="Search by Name"
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
        onChange={handleInputChange}
      />
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          {tabHeaders.map(({ id, text }) => (
            <Tab key={id} label={text} />
          ))}
        </Tabs>
      </Paper>
      <SwipeableViews
        style={{ width: '100%' }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}>
          <Table data={organizers} headers={tblOrganizers} type="organizers" />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={customers} headers={tblCustomers} type="customers" />
        </TabContainer>
      </SwipeableViews>
    </Container>
  );
};

Clients.getInitialProps = async () => {
  const { data: allOrganizers } = await axios.get(
    `${process.env.API_URL}/api/organizer/getallorganizer`
  );
  const { data: allCustomers } = await axios.get(
    `${process.env.API_URL}/api/user`
  );

  const clients = { allOrganizers, allCustomers };

  return { clients, allOrganizers, allCustomers };
};

export default Clients;
