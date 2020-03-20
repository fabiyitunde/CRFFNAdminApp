import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  FILTER_RESULT,
  RELOADLIST,
  ERROR_MESSAGE
} from "../actionTypes";
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
export const reloadlist = () => dispatch => {
  dispatch({ type: RELOADLIST });
};
export const filterCriteria = data => dispatch => {
  const axios = getaxious();
  getauthorizationheaderconfig().then(headers => {
    const url = `api/enforcementApp/processSearch`;
    const body = data;
    console.log(body);
    axios
      .post(url, body, { headers })
      .then(response => {
        var responselist = [];

        response.data.forEach(function(element) {
          responselist.push(element);
        });

        dispatch({
          type: FILTER_RESULT,
          filteredlist: responselist
        });
      })
      .catch(error => {
        dispatch({
          type: ERROR_MESSAGE,
          errorMessage: error
        });
      });
  });
};
