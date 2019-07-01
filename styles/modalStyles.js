import { makeStyles } from '@material-ui/core/styles';

export const modalStyle = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    overflow: 'scroll'
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  img: {
    width: '100%',
    maxHeight: '250px',
    borderRadius: '50%',
    marginTop: '20px'
  }
}));
