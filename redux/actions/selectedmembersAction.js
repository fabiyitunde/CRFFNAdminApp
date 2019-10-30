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
    const url = `api/enforcementApp/processSearch`;
    const body = data;
    console.log(headers);
    console.log(body);

    axios
<<<<<<< HEAD
      .post(url, headers, body)
=======
      .post(url, body, { headers })
>>>>>>> 3dfece9b8b611375af026739098368be6dbda8ce
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
