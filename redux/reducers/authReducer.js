import { REGISTER_ADMIN, UNREGISTER_ADMIN } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_ADMIN:
      return { adminId: action.id };
    case UNREGISTER_ADMIN:
      return {};
    default:
      return state;
  }
};
