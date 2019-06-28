import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EventButtons from './EventButtons';

import { renderEventsStatus } from '../helperFunctions/renderFunctions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}));

const JTable = ({ data, headers }) => {
  const classes = useStyles();

  const renderTableHeaders = () =>
    headers.map(({ id, text }) => <TableCell key={id}>{text}</TableCell>);

  const renderRows = () =>
    data.map(itemData => {
      return (
        <TableRow key={itemData.id}>
          {headers.map(({ valueName, id }) => (
            <TableCell key={id}>{itemData[valueName]}</TableCell>
          ))}
          {itemData.statusId && (
            <TableCell>
              <EventButtons
                eventId={itemData.id}
                status={renderEventsStatus(itemData.statusId)}
              />
            </TableCell>
          )}
        </TableRow>
      );
    });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{renderTableHeaders()}</TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </Paper>
  );
};

export default JTable;