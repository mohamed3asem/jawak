import axios from 'axios';
import Router from 'next/router';
import getConfig from 'next/config';
import nextCookie from 'next-cookies';
import Container from '@material-ui/core/Container';
import Table from '../components/Table';
import { tblTransactions } from '../fixtures/fixtures';
import { withAuthSync } from '../helperFunctions/authFunctions';
const { publicRuntimeConfig } = getConfig();

const Transactions = ({ transactions }) => {
  console.log(transactions);
  return (
    <Container fixed>
      <Table data={transactions} headers={tblTransactions} type="transactions" />
    </Container>
  );
};

Transactions.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { location: '/' }).end();

  const { data } = await axios.post(`${publicRuntimeConfig.API_URL}/api/Ticket/gettransation`, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (token) {
    return { transactions: data };
  }
  return redirectOnError();
};

export default withAuthSync(Transactions);
