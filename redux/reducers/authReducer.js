import { REGISTER_ADMIN } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      return { adminId: action.id };
    default:
      return state;
  }
};
