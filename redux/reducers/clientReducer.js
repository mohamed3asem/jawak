import { GET_ORGANIZER_BY_ID, GET_CUSTOMER_BY_ID } from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case GET_ORGANIZER_BY_ID:
    case GET_CUSTOMER_BY_ID:
      return action.payload;
    default:
      return state;
  }
};
