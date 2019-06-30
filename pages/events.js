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
import { tblEvents } from '../fixtures/fixtures';

const tabHeaders = [
  { id: '1', text: 'Pending Events' },
  { id: '2', text: 'Active Events' },
  { id: '3', text: 'Ended Events' }
];

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const Events = ({ pendingEvents, activeEvents, endedEvents }) => {
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
          <Table data={pendingEvents} headers={tblEvents} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={activeEvents} headers={tblEvents} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={endedEvents} headers={tblEvents} />
        </TabContainer>
      </SwipeableViews>
    </Container>
  );
};

Events.getInitialProps = async () => {
  const pendingEvents = [];
  const activeEvents = [];
  const endedEvents = [];
  const { data } = await axios.post(
    `${process.env.API_URL}/api/Event/getAllEvents`
  );

  data.map(event => {
    if (event.statusId === 1) {
      pendingEvents.push(event);
    } else if (event.statusId === 2) {
      activeEvents.push(event);
    } else {
      endedEvents.push(event);
    }
  });

  return { pendingEvents, activeEvents, endedEvents };
};

export default Events;
