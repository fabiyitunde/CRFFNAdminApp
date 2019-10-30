import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  logininfo: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        logininfo: action.logininfo
      };
    case LOGOUT:
      return {
        ...state
      };

    default:
      return state;
  }
}
