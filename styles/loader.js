import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    backgroundColor: '#F1C40F',
    overflow: 'hidden',
    // opacity: '0.8',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    zIndex: '1000'
  },
  title: {
    zIndex: '1001',
    position: 'absolute',
    fontWeight: '600',
    fontSize: '12px',
    textTransform: 'uppercase',
    left: '50%',
    top: '58%',
    marginLeft: '-20px'
  },
  body: {
    position: 'absolute',
    top: '50%',
    marginLeft: '-50px',
    left: '50%'
  }
});
