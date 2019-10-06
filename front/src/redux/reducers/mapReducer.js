import { CHANGE_SELF_LOCATION, GET_FAMILY_LOCATION } from '../actionNames/mapActionNames';

const initState = {
  selfGPSLocation: '',
  familyGPSLocation: [],
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_SELF_LOCATION:
      return { ...state, selfGPSLocation: action.payload };
    case GET_FAMILY_LOCATION:
      return { ...state, familyGPSLocation: action.payload };
    default:
      return state;
  }
}
