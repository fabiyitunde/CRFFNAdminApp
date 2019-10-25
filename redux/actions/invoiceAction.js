import * as firebase from "firebase";
import { LOAD_MEMBERS, LOAD_INVOICE_LIST } from "../actionTypes";

export const loadInvoiceList = callback => dispatch => {
  firebase
    .database()
    .ref("/invoices")
    .on("value", snapshot => {
      if (snapshot.val() == null) return;
      var queryrequestlist = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        queryrequestlist.push(data);
      });
      dispatch({ type: LOAD_INVOICE_LIST, invoicelist: queryrequestlist });
      callback();
    });
};
export const loadMembersList = callback => dispatch => {
  firebase
    .database()
    .ref("/members")
    .on("value", snapshot => {
      if (snapshot.val() == null) return;
      var queryrequestlist = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        queryrequestlist.push(data);
      });
      dispatch({ type: LOAD_MEMBERS, memberslist: queryrequestlist });
      callback();
    });
};

export const loadMemberDetail = (crffnmasterid, callback) => dispatch => {
  const path = `/members/${crffnmasterid}`;
  firebase
    .database()
    .ref(path)
    .on("value", snapshot => {
      if (snapshot.val() == null) return;
      var queryrequestlist = [];
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var data = childSnapshot.val();
        queryrequestlist.push(data);
      });
      const data = {
        crffnmasterid: crffnmasterid,
        memberdetail: queryrequestlist
      };
      dispatch({ type: LOAD_MEMBER_DETAIL, memberdetail: data });
      callback();
    });
};
