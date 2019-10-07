import {
  USER_LOGIN, //
  USER_LOGOUT,
  USER_REGISTER,
  COOKIES_SAVE,
} from '../actionNames/userActionNames';

export const userLogin = (user, cookie) => dispatch => {
  dispatch({ type: USER_LOGIN, payload: { user, cookie } });
};
