import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import clientReducer from './clientReducer';
import loadingReducer from './loadingReducer';
import authReducer from './authReducer';
import walletReducer from './walletReducer';

export default combineReducers({
  events: eventsReducer,
  client: clientReducer,
  loading: loadingReducer,
  auth: authReducer,
  walletDetails: walletReducer
});
