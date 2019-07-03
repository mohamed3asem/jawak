import React from 'react';
import * as moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EventButtons from './EventButtons';
import ClientButtons from './ClientButtons';
import TicketButtons from './TicketButtons';

import {
  renderEventsStatus,
  renderPaymentMethod,
  renderAttendanceState
} from '../helperFunctions/renderFunctions';

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

const JTable = ({ data, headers, type }) => {
  const classes = useStyles();

  const renderTableHeaders = () =>
    headers.map(({ id, text }) => <TableCell key={id}>{text}</TableCell>);

  const renderRows = () =>
    data.map(itemData => {
      return (
        <TableRow key={itemData.id} hover>
          {headers.map(({ valueName, id }) => (
            <TableCell key={id}>
              {valueName === 'createdAt'
                ? moment(itemData[valueName]).format('D MM YYYY')
                : itemData[valueName]}
            </TableCell>
          ))}
          {type === 'events' && (
            <TableCell>
              <EventButtons
                eventId={itemData.id}
                status={renderEventsStatus(itemData.statusId)}
              />
            </TableCell>
          )}
          {(type === 'organizers' || type === 'customers') && (
            <TableCell>
              <ClientButtons
                clientId={itemData.id}
                type={type}
                clientStatus={itemData.isLock}
              />
            </TableCell>
          )}
          {type === 'tickets' && (
            <TableCell>
              <TicketButtons
                ticketId={itemData.id}
                paymentMethod={renderPaymentMethod(itemData.paymentMethodeId)}
                status={itemData.status}
                attendStatus={renderAttendanceState(itemData.confirmed)}
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
          <TableRow>
            {renderTableHeaders()}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </Paper>
  );
};

export default JTable;
