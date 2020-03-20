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
        var responseMessage = JSON.stringify(response);
        console.log(`this is the response --- ${responseMessage}`);
        dispatch({
          type: FILTER_RESULT,
          filteredlist: responselist,
          selectedmemberslist: responselist
        });
      })
      .catch(error => {
        var errorMessage = JSON.stringify(error);
        console.log(`this is the error from message --- ${errorMessage}`);
      });
  });
};
