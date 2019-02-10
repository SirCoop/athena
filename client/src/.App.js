import React from 'react';
import fp from 'lodash/fp';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import './styles/index.css';
import Sidebar from './components/Sidebar';
import Login from './routes/login';
import withUser from './components/HOC/WithUser';
import Router from './routes';
import handleToggleIsSidebarOpen from './redux/actions/toggleSidebar';
import Unauthenticated from './Unauthenticated';

const styles = {
  sidebarIsOpen: {
    transition: 'all .2s',
    paddingLeft: 225,
  },
  sidebarIsClosed: {
    transition: 'all .2s',
    paddingLeft: 75,
  },
};

const App = (props) => {
  const { onToggleIsSidebarOpen, isSidebarOpen, classes, model } = props;

  console.log(model);

  return (
    <div>
      {
        model.isLoggedIn ? (
          <React.Fragment>
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={onToggleIsSidebarOpen(isSidebarOpen)}
            />
            <div className={cn({
              [classes.sidebarIsOpen]: isSidebarOpen,
              [classes.sidebarIsClosed]: !isSidebarOpen,
            })}
            >
              <Router />
            </div>
          </React.Fragment>
        ) : (
          <Unauthenticated />
        )
      }
    </div>
  );
};

const mapStateToProps = ({ isSidebarOpen }) => ({
  isSidebarOpen,
});

const mapDispatchToProps = dispatch => ({
  onToggleIsSidebarOpen: currentState =>
    () => dispatch(handleToggleIsSidebarOpen(!currentState)),
});

export default fp.compose(
  withUser,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
)(App);