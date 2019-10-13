import {
  USER_LOGIN, //
  USER_LOGOUT,
  USER_ADD_FAMILY,
} from '../actionNames/userActionNames';

export const userLogin = (user, cookie) => dispatch => {
  dispatch({ type: USER_LOGIN, payload: { user, cookie } });
};
export const userLogout = () => dispatch => {
  dispatch({ type: USER_LOGOUT, payload: {} });
};
export const userAddFamily = (user, family) => dispatch => {
  const newUser = user;
  newUser.Family = family;
  dispatch({ type: USER_ADD_FAMILY, payload: newUser });
};
