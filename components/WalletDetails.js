import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {
  adminWithdraw,
  organizerWithdraw
} from '../helperFunctions/WalletFunctions';
import { loading, notLoading } from '../redux/actions';
import { Z_STREAM_ERROR } from 'zlib';

const WalletDetails = ({
  onClose,
  auth,
  organizer,
  walletDetails,
  loading,
  setloading,
  notLoading
}) => {
  const [withdraw, setWithdraw] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [wallet, setWallet] = useState([
    { title: 'Total Income', value: walletDetails.total },
    {
      title: 'Discounts',
      value: Math.round(walletDetails.couponCut * 100) / 100
    },
    {
      title: 'Jawak Commision',
      value: Math.round(walletDetails.jawakCutWithCoupon * 100) / 100
    },
    {
      title: 'Total Payment',
      value: Math.round(walletDetails.organizerWithdraw * 100) / 100
    },
    {
      title: 'Current Balance',
      value: Math.round(walletDetails.currentBalance * 100) / 100
    }
  ]);

  const handleWithdraw = async () => {
    if (withdraw < 0) {
      return;
    }

    try {
      setloading();
      const data = await organizerWithdraw(
        withdraw,
        organizer.id,
        auth.adminId
      );
      const oldBalance = wallet.slice(0, 3);
      const newBalance = [
        ...oldBalance,
        {
          title: 'Total Payment',
          value: Math.round(data.organizerWithdraw * 100) / 100
        },
        {
          title: 'Current Balance',
          value: Math.round(data.currentBalance * 100) / 100
        }
      ];
      setMessage('Your Wallet Has Been Updated.');
      setWithdraw('');
      setWallet(newBalance);
      notLoading();
    } catch (e) {
      notLoading();
      if (e.response.status === 409) {
        setMessage('Not Enough Balance.');
        setError(true);
      }
    }
  };

  return (
    <React.Fragment>
      <DialogTitle>Wallet Details for {organizer.name}</DialogTitle>
      <DialogContent>
        <List>
          {wallet.map(({ title, value }, i) => (
            <ListItem key={i}>
              <ListItemText>
                <Grid container spacing={2}>
                  <Grid item sm={9}>
                    {title === 'Current Balance' ? (
                      <Typography color="error">{title}</Typography>
                    ) : (
                      title
                    )}
                  </Grid>
                  <Grid item sm={3}>
                    {title === 'Current Balance' ? (
                      <Typography color="error">{`${value} SAR`}</Typography>
                    ) : (
                      `${value} SAR`
                    )}
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          ))}
          <ListItem>
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={9}>
                <TextField
                  label="Withdraw"
                  variant="outlined"
                  value={withdraw}
                  onChange={e => setWithdraw(e.target.value)}
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">SAR</InputAdornment>
                    )
                  }}
                  error={withdraw < 0}
                  helperText={withdraw < 0 && 'Should be more than 0'}
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={loading || !withdraw}
                  onClick={handleWithdraw}
                >
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        {message && (
          <Typography align="center" color={error ? 'error' : 'initial'}>
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          <CloseIcon />
          Cancel
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth, loading }) => ({ auth, loading });

const mapDispatchToProps = dispatch => ({
  setloading: () => dispatch(loading()),
  notLoading: () => dispatch(notLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletDetails);
