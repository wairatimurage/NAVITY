import * as types from "../actions/actionTypes";

export default function pilotsReduccer(state = [], action) {
  switch (action.type) {
    case types.LOAD_PILOTS_SUCCESS:
      return [...action.pilots];
    case types.LOAD_PROFILE_SUCCESS:
      return [...action.profile];
    default:
      return state;
  }
}
