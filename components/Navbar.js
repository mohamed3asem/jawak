import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { useStyles } from '../styles/navbarStyles';
import { logout } from '../helperFunctions/authFunctions';
import { unregisterAdmin } from '../redux/actions';

const menuHeaders = [
  { id: '2', name: 'Events', link: '/events' },
  { id: '3', name: 'Clients', link: '/clients' },
  { id: '4', name: 'Tickets', link: '/tickets' },
  { id: '5', name: 'Copouns', link: '/coupons' },
  { id: '6', name: 'Transactions', link: '/transactions' },
  { id: '7', name: 'Questions', link: '/questions' }
];

const Navbar = ({ children, auth, unregisterAdmin }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    unregisterAdmin();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {auth.adminId && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hadminIde)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap className={classes.title}>
            Jawak - Admin Panel
          </Typography>
          {auth.adminId && (
            <Button color="inherit" onClick={handleClick}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuHeaders.map(({ id, name, link }) => (
            <Link href={link} key={id}>
              <ListItem button>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({ unregisterAdmin: () => dispatch(unregisterAdmin()) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
