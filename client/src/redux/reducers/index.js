import { combineReducers } from 'redux';
import toggleSidebar from './toggleSidebar';

export default combineReducers({
  isSidebarOpen: toggleSidebar,
});