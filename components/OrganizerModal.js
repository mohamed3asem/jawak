import React from 'react';
import * as moment from 'moment';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import { modalStyle, useStyles } from '../styles/modalStyles';
import { organizerListKeys, organizerListIcons } from '../fixtures/fixtures';

const OrganizerModal = React.forwardRef(({ onClose, organizer }, ref) => {
  const classes = useStyles();

  console.log(moment(organizer.createdAt).format('D MM YYYY'));

  const renderListItems = () =>
    _.map(organizerListKeys, (value, key) => (
      <ListItem key={key}>
        <ListItemIcon>{organizerListIcons[key]}</ListItemIcon>
        <ListItemText
          primary={value}
          secondary={
            key === 'createdAt'
              ? moment(organizer.createdAt).format('D MM YYYY')
              : organizer[key]
          }
        />
      </ListItem>
    ));

  return (
    <Container style={modalStyle} className={classes.paper}>
      <div className={classes.list}>
        <Typography align="center" variant="h3" gutterBottom>
          {organizer.name.toUpperCase()}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img
              className={classes.img}
              src={organizer.profileImage}
              alt={organizer.name}
            />
          </Grid>
          <Grid item xs={8}>
            <List>{renderListItems()}</List>
          </Grid>
        </Grid>
        <Fab variant="extended" color="primary" onClick={onClose}>
          <Close />
          Close
        </Fab>
      </div>
    </Container>
  );
});

export default OrganizerModal;
