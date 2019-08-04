import { REGISTER_ADMIN, UNREGISTER_ADMIN } from './types';

export const registerAdmin = id => ({ type: REGISTER_ADMIN, id });

export const unregisterAdmin = () => ({ type: UNREGISTER_ADMIN });
