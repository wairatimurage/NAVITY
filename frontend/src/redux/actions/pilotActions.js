import * as types from "../actions/actionTypes";
import { fetchPilots } from "../../utility/apiCalls";

export function loadPilotsSuccess(pilots) {
  return { type: types.LOAD_PILOTS_SUCCESS, pilots };
}

export function loadPilots() {
  return (dispatch) =>
    fetchPilots()
      .then((data) => dispatch(loadPilotsSuccess(data)))
      .catch((err) => console.log(err));
}
