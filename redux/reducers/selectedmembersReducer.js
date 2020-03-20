import selectedmemberslist from "../../components/selectedmemberslist/selectedmemberslist";
import { FILTER_RESULT, RELOADLIST, ERROR_MESSAGE } from "../actionTypes";
const initialState = {
  selectedmemberslist: [],
  filteredlist: [],
  errorMessage: ""
};
export default function(state = initialState, action) {
  var selectedlist = [...state.selectedmemberslist];
  switch (action.type) {
    case "ADD_TO_LIST":
      var existingrec = selectedlist.find(
        a => a.crffnMasterid == action.payload.crffnMasterid
      );
      if (existingrec == null) {
        selectedlist.push(action.payload);
      } else {
        const index = selectedlist.indexOf(existingrec);
        selectedlist[index] = action.payload;
      }

      return {
        ...state,
        selectedmemberslist: selectedlist
      };
    case FILTER_RESULT:
      //  var processedlist = JSON.stringify(action.filteredlist);
      var processedlist = action.filteredlist;
      return { ...state, filteredlist: processedlist };
    case RELOADLIST:
      return {
        ...state,
        filteredlist: initialState.filteredlist,
        errorMessage: initialState.errorMessage
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    case "REMOVE_FROM_LIST":
      var copyoflist = [...state.selectedmemberslist];
      var newlist = copyoflist.filter(
        copyoflist => copyoflist !== action.payload
      );
      return { ...state, selectedmemberslist: newlist };
  }
  return state;
}
