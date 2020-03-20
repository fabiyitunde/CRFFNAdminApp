import * as firebase from "firebase";
import { LOGIN, LOGOUT, RELOADLOGIN } from "../actionTypes";
import { getaxious } from "../../services/axiosService";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Alert
} from "react-native";
import { webapibaseurl } from "../../constants/global";
export const loginuser2 = (username, password, successcallback) => dispatch => {
  const logindetail = {
    userName: username,
    access_token: "shshd182828293smssskskks22333"
  };
  (async () => {
    await AsyncStorage.setItem("userToken", JSON.stringify(logindetail));
  })();
  dispatch({ type: LOGIN, logininfo: logindetail });
  successcallback();
};
export const loginuser = (username, password, successcallback) => dispatch => {
  const url = `${webapibaseurl}token`;
  const data = {
    grant_type: "password",
    username,
    password
  };
  const body = encodeParams(data);

  console.log(`${url} ${body}`);
  const axios = getaxious();
  const request = axios.post("/token", body);
  request
    .then(response => {
      (async () => {
        await AsyncStorage.setItem("userToken", JSON.stringify(response.data));
      })();
      const logindetail = {
        userName: response.data.userName,
        access_token: response.data.access_token
      };
      console.log(logindetail.access_token);

      successcallback();
      dispatch({ type: LOGIN, logininfo: logindetail });
    })
    .catch(error => {
      dispatch({ type: LOGIN, errorMessage: error });
    });
};
export const reloadlogin = () => dispatch => {
  dispatch({ type: RELOADLOGIN });
};
export const loadloginuserInfo = () => dispatch => {
  (async () => {
    const jsonstring = await AsyncStorage.getItem("userToken");
    const json = JSON.parse(jsonstring);
    const logindetail = {
      userName: json.userName,
      access_token: json.access_token
    };
    dispatch({ type: LOGIN, logininfo: logindetail });
  })();
};

export const logoutuser = successcallback => dispatch => {
  (async () => {
    await AsyncStorage.setItem("userToken", "");
  })();
  dispatch({ type: LOGOUT });
  successcallback();
  console.log("Signed Out Successfull");
};
encodeParams = params => {
  let body = "";
  for (let key in params) {
    if (body.length) {
      body += "&";
    }
    body += key + "=";
    body += encodeURIComponent(params[key]);
  }
  return body;
};
