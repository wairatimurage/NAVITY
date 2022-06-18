import * as types from "./actionTypes";
import { searchRegistry, filterRegistryBy } from "../../utility/apiCalls";

export function searchSuccess(results) {
  return { type: types.SEARCH_SUCCESS, results };
}
export function filterSuccess(results) {
  return { type: types.FILTER_SUCCESS, results };
}

export function search(accountType, searchQuery) {
  return (dispatch) =>
    searchRegistry(accountType, searchQuery)
      .then((data) => dispatch(searchSuccess(data)))
      .catch((err) => console.log(err));
}

export function filter(accountType, filterQuery) {
  return (dispatch) =>
    filterRegistryBy(accountType, filterQuery)
      .then((data) => dispatch(filterSuccess(data)))
      .catch((err) => console.log(err));
}
