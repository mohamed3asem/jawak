import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from '../components/TabContainer';
import Table from '../components/Table';
import { tblEvents } from '../fixtures/fixtures';
import SearchBar from '../components/SearchBar';
import { getEventsByOrganizerId } from '../redux/actions';
import { categorizeEvents } from '../helperFunctions/eventsFunctions';
import { withAuthSync } from '../helperFunctions/authFunctions';
const { publicRuntimeConfig } = getConfig();

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

const Events = ({ categorizedEvents, organizers }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [pendingEvents, setPendingEvents] = useState(categorizedEvents.pendingEvents);
  const [activeEvents, setActiveEvents] = useState(categorizedEvents.activeEvents);
  const [endedEvents, setEndedEvents] = useState(categorizedEvents.endedEvents);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleSearch = async id => {
    let events;
    if (!id) {
      const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/Event/getAllEvents`);
      events = data;
    } else {
      events = await getEventsByOrganizerId(id);
    }
    const { pendingEvents, activeEvents, endedEvents } = categorizeEvents(events);
    setPendingEvents(pendingEvents);
    setActiveEvents(activeEvents);
    setEndedEvents(endedEvents);
  };

  return (
    <Container fixed>
      <SearchBar
        label="Organizer Name"
        text="Search for events by Organizer Name"
        values={organizers}
        handleSearch={handleSearch}
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
          <Table data={pendingEvents} headers={tblEvents} type="events" />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={activeEvents} headers={tblEvents} type="events" />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <Table data={endedEvents} headers={tblEvents} type="events" />
        </TabContainer>
      </SwipeableViews>
    </Container>
  );
};

Events.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { location: '/' }).end();

  const { data: events } = await axios.post(
    `${publicRuntimeConfig.API_URL}/api/Event/getAllEvents`
  );
  const { data: organizers } = await axios.get(
    `${publicRuntimeConfig.API_URL}/api/organizer/getallorganizer`
  );

  const { data: activities } = await axios.get(
    `${publicRuntimeConfig.API_URL}/api/Activities/getallactivities`
  );

  events.map(event => {
    organizers.map(({ id, phone }) => {
      if (event.organizerId === id) {
        event.phoneNumber = phone;
      }
    });
    activities.map(({ id, nameEN }) => {
      if (event.activityId === id) {
        event.activityName = nameEN;
      }
    });
  });

  const categorizedEvents = categorizeEvents(events);

  console.log('Events: ', categorizedEvents);
  if (token) {
    return { categorizedEvents, organizers };
  }

  return redirectOnError();
};

export default withAuthSync(Events);
