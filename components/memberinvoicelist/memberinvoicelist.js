import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  I18nManager,
  AsyncStorage,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  Content,
  Container,
  Right,
  Header,
  Left,
  Body,
  Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import styles from "./styles";
import { Images, Fonts, Metrics, Colors } from "../../Themes/";
import { connect } from "react-redux";
import { loadMemberInvoiceList } from "../../redux/actions/membersAction";
class MemberInvoiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: []
    };
  }
  componentDidMount() {
    const { crffnmasterid } = this.props;
    this.setState({ isprocessing: true });
    this.props.loadMemberInvoiceList(crffnmasterid, () => {
      const { membersinvoicelist } = this.props;
      const selectedrecord = membersinvoicelist.find(
        a => a.crffnmasterid == crffnmasterid
      );
      this.setState({ isprocessing: false, data: selectedrecord.invoicelist });
    });
  }
  transformDataForDisplay = serverdata => {
    const returndata = {
      id: Number(serverdata.invoiceheader.id),
      OrderID: serverdata.invoiceheader.category,
      Date: serverdata.invoiceheader.refdate,
      Product: serverdata.invoiceheader.narration,
      Price: serverdata.invoiceheader.totalinvoiceamount,
      Status: serverdata.invoiceheader.status
    };
    return returndata;
  };
  onBackClick() {
    this.props.navigation.navigate("ECommerceMyAccount");
  }

  componentWillMount() {
    var that = this;
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceOrderHistory"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceOrderHistory"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    if (this.state.isprocessing == true || !this.state.data)
      return (
        <View style={styles.isloading}>
          <ActivityIndicator size="large" color="#e7ffe6" />
        </View>
      );
    return (
      <ScrollView>
        {this.state.data.map((serveritem, index) => {
          const item = this.transformDataForDisplay(serveritem);
          console.log(item);
          return (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("InvoiceDetails", {
                  invoiceid: item.id
                })
              }
              key={index}
            >
              <View
                style={
                  (item.id === 1
                    ? [styles.rowBg, { marginTop: Metrics.WIDTH * 0.05 }]
                    : styles.rowBg,
                  { backgroundColor: "#e3e3e3" })
                }
              >
                <View
                  style={{
                    backgroundColor: "#ffffff",
                    margin: 12,
                    borderRadius: 5
                  }}
                >
                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}>Type</Text>
                    <Text style={styles.fieldDescriptionTxt2}>
                      {item.OrderID}
                    </Text>
                  </View>
                  <View style={styles.rowListDivider} />

                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}>Date</Text>
                    <Text style={styles.fieldDescriptionTxt}>{item.Date}</Text>
                  </View>
                  <View style={styles.rowListDivider} />

                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}>Narration</Text>
                    <Text numberOfLines={1} style={styles.fieldDescriptionTxt}>
                      {item.Product}
                    </Text>
                  </View>
                  <View style={styles.rowListDivider} />

                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}>Amount</Text>
                    <Text style={styles.fieldDescriptionTxt}>{item.Price}</Text>
                  </View>
                  <View style={styles.rowListDivider} />

                  <View style={styles.rowField}>
                    <Text style={styles.fieldLabelTxt}>Status</Text>
                    <Text
                      style={
                        item.Status == "Paid"
                          ? [
                              styles.fieldDescriptionTxt,
                              { color: "#00ff22", fontWeight: "bold" }
                            ]
                          : [
                              styles.fieldDescriptionTxt,
                              { color: "#ff0000", fontWeight: "bold" }
                            ]
                      }
                    >
                      {item.Status}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    membersinvoicelist: state.members.membersinvoicelist
  };
}

//Connect everything
export default connect(mapStateToProps, { loadMemberInvoiceList })(
  MemberInvoiceList
);
