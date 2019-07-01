import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import clientReducer from './clientReducer';

export default combineReducers({
  events: eventsReducer,
  client: clientReducer
});
