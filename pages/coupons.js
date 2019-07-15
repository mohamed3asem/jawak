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

const useStyles = makeStyles({
  float: { float: 'right', marginBottom: '20px', marginRight: '20px' }
});

const Coupons = ({ coupons }) => {
  const classes = useStyles();
  const [dialogeOpen, setDialogeOpen] = useState(false);

  return (
    <Container fixed>
      <Tooltip title="Add Coupon">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.float}
          onClick={() => {
            setDialogeOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Table data={coupons} headers={tblCoupons} type="coupons" />

      <Dialoge open={dialogeOpen} onClose={() => setDialogeOpen(false)}>
        <AddCouponForm onClose={() => setDialogeOpen(false)} />
      </Dialoge>
    </Container>
  );
};

Coupons.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { location: '/' }).end();

  const { data } = await axios.get(`${process.env.API_URL}/api/coupon/getAll`);

  if (token) {
    return { coupons: data };
  }
  return redirectOnError();
};

export default withAuthSync(Coupons);
