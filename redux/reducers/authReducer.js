import { LOGIN, LOGOUT, RELOADLOGIN } from "../actionTypes";

const initialState = {
  logininfo: {},
  errorMessage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logininfo: action.logininfo,
        errorMessage: action.errorMessage
      };
    case RELOADLOGIN:
      console.log("RELOADLOGIN");
      return {
        ...state,

        errorMessage: {}
      };
    case LOGOUT:
      return {
        ...state,
        logininfo: initialState.logininfo,
        errorMessage: initialState.errorMessage
      };

    default:
      return state;
  }
}
