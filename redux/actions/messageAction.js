import { FILTER_RESULT } from "../actionTypes";

import {
  getauthorizationheaderconfig,
  getaxious
} from "../../services/axiosService";
import { AsyncStorage } from "react-native";

export const sendMessage = data => dispatch => {
  const axios = getaxious();
  getauthorizationheaderconfig().then(headers => {
    const url = `api/enforcementApp/sendBroadcast`;
    const body = data;
    console.log(body);
    axios
      .post(url, body, { headers })
      .then(response => {
        var responselist = [];

        console.log(`this is the response --- ${response}`);
        dispatch({ type: FILTER_RESULT, filteredlist: responselist });
      })
      .catch(error => {
        console.log(`this is the error --- ${error}`);
      });
  });
};
