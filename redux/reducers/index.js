import { combineReducers } from "redux";
import authReducer from "./authReducer";
import membersReducer from "./membersReducer";
import invoiceReducer from "./invoiceReducer";
import selectedmembersReducer from "./selectedmembersReducer";
export default combineReducers({
  auth: authReducer,
  members: membersReducer,
  invoices: invoiceReducer,
  selectedmembers: selectedmembersReducer
});
