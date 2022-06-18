import * as types from "../actions/actionTypes";

export default function institutionsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_INSTITUTIONS_SUCCESS:
      return [...action.institutions];
    case types.LOAD_PROFILE_SUCCESS:
      return [...action.profile];
    default:
      return state;
  }
}
