import { GET_CHECK_ZONES, ADD_CHECKPOINT } from '../actionNames/AddNewZoneActionNames';

const initialState = {
  checkpoints: [
    {
      accuracy: 23,
      altitude: 169.20001220703125,
      heading: 96.78195190429688,
      latitude: 55.7088312,
      longitude: 37.5933578,
      speed: 0.07753844559192657,
      timestamp: 1570708943817,
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHECK_ZONES: {
      return {
        ...state,
        checkpoints: action.payload,
      };
    }
    case ADD_CHECKPOINT: {
      return {
        ...state,
        checkpoints: [...state.checkpoints, action.payload],
      };
    }
    default:
      return state;
  }
}
