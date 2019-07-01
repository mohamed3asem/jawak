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
import { customerListIcons, customerListKeys } from '../fixtures/fixtures';

const CustomerModal = React.forwardRef(({ onClose, customer }, ref) => {
  const classes = useStyles();

  const renderListItems = () =>
    _.map(customerListKeys, (value, key) => (
      <ListItem key={key}>
        <ListItemIcon>{customerListIcons[key]}</ListItemIcon>
        <ListItemText
          primary={value}
          secondary={
            key === 'createdAt' || key === 'birthdate'
              ? moment(customer[key]).format('D MM YYYY')
              : customer[key]
          }
        />
      </ListItem>
    ));

  return (
    <Container style={modalStyle} className={classes.paper}>
      <div className={classes.list}>
        <Typography align="center" variant="h3" gutterBottom>
          {customer.name.toUpperCase()}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <img
              className={classes.img}
              src={customer.profileImage}
              alt={customer.name}
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

export default CustomerModal;
