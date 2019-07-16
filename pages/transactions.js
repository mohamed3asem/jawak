import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Dialoge from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Table from '../components/Table';
import AddCouponForm from '../components/AddCouponForm';
import { tblCoupons } from '../fixtures/fixtures';
import { withAuthSync } from '../helperFunctions/authFunctions';

const Transactions = ({ transactions }) => {
  console.log(transactions);

  return (
    <Container fixed>
      <div>Hello from transacrion page</div>

      {/* <Table data={coupons} headers={tblCoupons} type="coupons" /> */}
    </Container>
  );
};

Transactions.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { location: '/' }).end();

  const { data } = await axios.get(`${process.env.API_URL}/api/coupon/getAll`);

  if (token) {
    return { transactions: data };
  }
  return redirectOnError();
};

export default withAuthSync(Transactions);
