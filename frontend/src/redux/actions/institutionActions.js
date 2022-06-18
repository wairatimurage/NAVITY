import * as types from "./actionTypes";
import { fetchInstitutions } from "../../utility/apiCalls";

export function loadInstitutionsSuccess(institutions) {
  return { type: types.LOAD_INSTITUTIONS_SUCCESS, institutions };
}

export function loadInstitutions() {
  return (dispatch) =>
    fetchInstitutions()
      .then((data) => dispatch(loadInstitutionsSuccess(data)))
      .catch((err) => console.log(err));
}
