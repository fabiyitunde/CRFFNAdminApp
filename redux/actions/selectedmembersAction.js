import { ADD_TO_LIST, REMOVE_FROM_LIST, FILTER_RESULT } from "../actionTypes";
import * as firebase from "firebase";
import {
  getauthorizationheaderconfig,
  getaxious
} from "../../services/axiosService";
import { AsyncStorage } from "react-native";

export const mapDispatchToProps = selectedmember => dispatch => {
  dispatch({ type: ADD_TO_LIST, payload: selectedmember });
};
export const removeItemFromProps = selectedmember => dispatch => {
  dispatch({ type: REMOVE_FROM_LIST, payload: selectedmember });
};
export const filterCriteria = data => dispatch => {
  const axios = getaxious();
  getauthorizationheaderconfig().then(headers => {
    console.log(headers);
    const url = "api/enforcementApp/processSearch";
    const body = data;

    axios
      .post(url, body, { headers })
      .then(response => {
        console.log("My Response", response);
      })
      .catch(error => {
        console.log(`Filter error -- ${error}`);
        console.log(`this is the error --- ${error}`);
      });
  });

  dispatch({ type: FILTER_RESULT, filteredlist: data });
};
