import * as types from "../actions/actionTypes";

function filterReducer(state = [], action) {
  switch (action.type) {
    case types.FILTER_SUCCESS:
      return [...state, action.results];
    default:
      return state;
  }
}

function searchReducer(state = [], action) {
  switch (action.type) {
    case types.SEARCH_SUCCESS:
      return [...state, action.results];
    default:
      return state;
  }
}
export { filterReducer as filterResults, searchReducer as searchReults };
