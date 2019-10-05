import { CHANGE_SELF_LOCATION, CHANGE_FAMILY_LOCATION } from '../actionNames/mapActionNames';

const initState = {
  selfGPSLocation: '',
  familyGPSLocation: [],
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_SELF_LOCATION:
      return { ...state, selfGPSLocation: action.payload };
    case CHANGE_FAMILY_LOCATION:
      return { ...state, familyGPSLocation: action.payload };
    default:
      return state;
  }
}
