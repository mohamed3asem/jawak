import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minWidth: '50%'
  },
  formControl: {
    margin: theme.spacing(1),
    flexGrow: 1
  },
  fab: {
    marginBottom: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  fabProgress: {
    color: '#757575',
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1
  }
}));
