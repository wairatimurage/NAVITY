import { combineReducers } from "redux";
import pilots from "../reducers/pilotReducers";
import institutions from "../reducers/institutionReducers";
import { searchReults, filterResults } from "../reducers/genericReducers";

const rootReducer = combineReducers({
  pilots,
  institutions,
  searchReults,
  filterResults,
});

export default rootReducer;
