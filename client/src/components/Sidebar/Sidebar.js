import React from 'react';
import fp from 'lodash/fp';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';

const styles = {
  profile: {
    backgroundColor: '#E85B5D',
    padding: 15,
    height: 40,
    fontSize: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  sideBar: {
    width: 75,    
    transition: 'all .2s ease',
    position: 'fixed',
    height: '100vh',
    backgroundColor: '#323543',
    zIndex: 99,
  },
  sideBarIsOpen: {
    width: 225,    
    transition: 'all .2s ease',
    position: 'fixed',
    height: '100vh',
    backgroundColor: '#323543',
    zIndex: 99,
  },
  arrowForward: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    display: 'flex',
    borderTop: '1px solid #ddd',
    backgroundColor: '#323543',
  },
  forwardButton: {
    minWidth: '100%',
    borderRadius: 0,
    color: '#ddd',
  },
  icon: {
    color: '#6A7582',
    height: 25,
  },
  link: {
    transition: 'all .5s ease',
    display: 'flex',
    alignItems: 'center',
    padding: 15,
    height: 40,
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#1e202c',
    },
    color: '#6A7582',
    textDecoration: 'none',
  },
  sidebarIsOpenLink: {
    justifyContent: 'inherit',
  },
  activeLink: {
    backgroundColor: '#1e202c',
  },
  iconTitle: {
    marginLeft: 25,
    marginTop: 5,
    fontSize: 12,
  },
};

const links = [
  {
    to: "/home",
    title: "Home",
    Link: Home,
  },
  // {
  //   title: "Settings",
  //   to: "/settings",
  //   Link: Settings,
  // },
];

const mapLinksToNavLinks = ({ isSidebarOpen }) =>
  classes => fp.map(({ Link, to, exact, title }) => (
    <NavLink
      key={title}
      exact={exact}
      activeClassName={classes.activeLink}
      to={to}
      className={cn(classes.link, ({
        [classes.sidebarIsOpenLink]: isSidebarOpen,
      }))}
    >
      <Link className={classes.icon} />
      {isSidebarOpen && 
        <span className={classes.iconTitle}>{title}</span>
      }
    </NavLink>
  ));

const Sidebar = props => {
  const { classes, isSidebarOpen, onToggleSidebar } = props;

  return (
    <div className={cn(classes.sideBar,
      cn({ [classes.sideBarIsOpen]: isSidebarOpen,
      }))
    }>
      <div className={classes.profile}>athena</div>
      {mapLinksToNavLinks(props)(classes)(links)}
      <div className={classes.arrowForward}>
        <Button onClick={onToggleSidebar} className={classes.forwardButton}>
          {
            isSidebarOpen 
            ? <ArrowBack />
            : <ArrowForward />
          }
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(Sidebar);