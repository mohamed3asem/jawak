import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import clientReducer from './clientReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  events: eventsReducer,
  client: clientReducer,
  loading: loadingReducer
});
