import { GET_WALLET_FOR_ORGANIZER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_WALLET_FOR_ORGANIZER:
      return action.payload;
    default:
      return state;
  }
};
