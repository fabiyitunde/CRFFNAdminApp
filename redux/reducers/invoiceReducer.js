import {
  LOAD_MEMBERS,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_ITEM,
  LOAD_MEMBER_DETAIL
} from "../actionTypes";

const initialState = {
  invoicelist: [],
  memberslist: [],
  memberdetail: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_INVOICE_LIST:
      return {
        ...state,
        invoicelist: action.invoicelist
      };

    case LOAD_INVOICE_ITEM:
      var copyoflist = [...state.invoicelist];
      var existingrec = copyoflist.find(
        a => a.crffnmasterid == action.invoicelist.crffnmasterid
      );
      if (existingrec == null) {
        copyoflist.push(action.invoicelist);
      } else {
        const index = copyoflist.indexOf(existingrec);
        copyoflist[index] = action.invoicelist;
      }
      return {
        ...state,
        invoicelist: copyoflist
      };
    case LOAD_MEMBERS:
      var copyoflist = [...state.memberslist];
      var existingrec = copyoflist.find(
        a => a.crffnmasterid == action.memberslist.crffnmasterid
      );
      if (existingrec == null) {
        copyoflist.push(action.memberslist);
      } else {
        const index = copyoflist.indexOf(existingrec);
        copyoflist[index] = action.memberslist;
      }
      return {
        ...state,
        memberslist: copyoflist
      };
    case LOAD_MEMBER_DETAIL:
      var copyoflist = [...state.memberslist];
      var existingrec = copyoflist.find(
        a => a.crffnmasterid == action.memberslist.crffnmasterid
      );
      if (existingrec == null) {
        copyoflist.push(action.memberslist);
      } else {
        const index = copyoflist.indexOf(existingrec);
        copyoflist[index] = action.memberslist;
      }
      return {
        ...state,
        memberdetail: copyoflist
      };
    default:
      return state;
  }
}
