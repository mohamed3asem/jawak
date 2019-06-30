import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from '../components/TabContainer';
import Table from '../components/Table';
import { tblOrganizers, tblCustomers } from '../fixtures/fixtures';
const { publicRuntimeConfig } = getConfig();

const tabHeaders = [
  { id: '1', text: 'Organizers' },
  { id: '2', text: 'Customers' }
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Clients = ({ organizers, customers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    // <div> Hello</div>
    <Container fixed>
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
          <Table data={organizers} headers={tblOrganizers} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={customers} headers={tblCustomers} />
        </TabContainer>
      </SwipeableViews>
    </Container>
  );
};

Clients.getInitialProps = async () => {
  const { data: organizers } = await axios.get(
    `${process.env.API_URL}/api/organizer/getallorganizer`
  );
  const { data: customers } = await axios.get(
    `${process.env.API_URL}/api/user`
  );

  return { organizers, customers };
};

export default Clients;
