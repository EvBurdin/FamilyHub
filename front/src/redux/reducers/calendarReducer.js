import {
  ADD_EVENT, //
  DELETE_EVENT,
  GET_EVENT,
  UPDATE_EVENT,
} from '../actionNames/calendarActionNames';

const initState = {
  cookies: '',
  title: '',
  text: '',
  currentDate: '',
  dateEnd: '',
  periodic: false,
  period: '',
  selected: {},
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        cookies: action.payload.cookie,
        currentDate: action.payload.currentDate,
      };
    case GET_EVENT:
      return { ...state, selected: {
        ...state.selected, 
        ...action.payload
      } 
    };
    case DELETE_EVENT:
      return { ...state, cookies: action.payload };
    case UPDATE_EVENT:
      return { ...state, cookies: action.payload };
    default:
      return state;
  }
}
