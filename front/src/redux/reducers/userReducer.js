import { USER_LOGIN, USER_LOGOUT } from '../actionNames/userActionNames';

const initState = {
  user: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.payload };
    case USER_LOGOUT:
      return { ...state, user: '' };
    default:
      return state;
  }
}
