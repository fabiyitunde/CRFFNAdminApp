import { ADD_TO_LIST, REMOVE_FROM_LIST, FILTER_RESULT } from "../actionTypes";
import * as firebase from "firebase";
import { getaxious } from "../../services/axiosService";
import { AsyncStorage } from "react-native";

export const mapDispatchToProps = selectedmember => dispatch => {
  dispatch({ type: ADD_TO_LIST, payload: selectedmember });
};
export const removeItemFromProps = selectedmember => dispatch => {
  dispatch({ type: REMOVE_FROM_LIST, payload: selectedmember });
};
export const filterCriteria = (data, callback) => dispatch => {
  console.log(data);
  const body = data;
  const axios = getaxious();
  const request = axios.post("api/enforcementApp/processSearch", body);
  request
    .then(response => {
      console.log("My Response", response);
    })
    .catch(error => {
      console.log(`this is the error --- ${error}`);
    });
  dispatch({ type: FILTER_RESULT, filteredlist: data });
};
