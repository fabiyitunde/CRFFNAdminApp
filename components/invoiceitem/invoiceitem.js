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
  ImageBackground,
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
import MemberItem from "../memberitem/memberitem";
import MemberInvoiceList from "../memberinvoicelist/memberinvoicelist";
import ScrollableTabView, {
  ScrollableTabBar
} from "../../UIComponents/react-native-scrollable-tab-view";
class InvoiceItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangePasswordClick() {
    this.props.navigation.navigate("ECommerceChangePassword");
  }

  onBackClick() {
    this.props.navigation.navigate("HomePage");
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("HomePage");
      return true;
    });
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0c0811", true);
      StatusBar.setTranslucent(true);
    }
    const { invoicelist } = this.props;
    const crffnmasterid = this.props.navigation.getParam("crffnmasterid", "");
    const invoiceid = this.props.navigation.getParam("invoiceid", "");
    const selectedinvoice = invoicelist.find(
      a => a.invoiceheader.id == invoiceid
    );
    const {
      invoiceheader,
      lineitems,
      paymentrequestlist,
      remitatranslist
    } = selectedinvoice;

    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#0c0811"} style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={this.onBackClick.bind(this)}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={30}
                color="white"
                style={{ paddingRight: 20 }}
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Invoice Item</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#0c0811"}
          tabBarActiveTextColor={"white"}
          tabBarInactiveTextColor={"rgba(255,255,255,0.4)"}
          tabBarUnderlineStyle={{ backgroundColor: "#ffffff" }}
          tabBarTextStyle={styles.tabText}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="Details">
            <View style={styles.mainView}>
              <ScrollView>
                <ImageBackground
                  source={Images.invoiceHeader}
                  style={styles.ImageBG}
                >
                  <View>
                    <Text style={styles.itemHeader2}>Invoice Header</Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Name</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {invoiceheader.payername}
                    </Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Category</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {invoiceheader.category}
                    </Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Narration</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {invoiceheader.narration}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.card}>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Total Invoice Amount</Text>
                    <Text style={[styles.infoText, { color: "#0e1130" }]}>
                      {invoiceheader.totalinvoiceamount}
                    </Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Status</Text>
                    <Text style={[styles.infoText, { color: "#ff0000" }]}>
                      {invoiceheader.status}
                    </Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Ref Date</Text>
                    <Text style={[styles.infoText, { color: "#0e1130" }]}>
                      {invoiceheader.refdate}
                    </Text>
                  </View>
                </View>
                <View style={styles.card}>
                  <View>
                    <Text style={styles.itemHeader}>Line Items</Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View>
                    {lineitems.map((item, key) => (
                      <View key={key}>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Unit Amout</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.unitamount}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Quantity</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.quantity}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Amount</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.amount}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Narration</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.narration}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Category</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.category}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.card}>
                  <View style={styles.dividerHorizontal} />
                  <View>
                    <Text style={styles.itemHeader}>Payment Details</Text>
                  </View>
                  <View style={styles.dividerHorizontal} />
                  <View>
                    {paymentrequestlist.map((item, key) => (
                      <View key={key}>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Charges</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.charges}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Payment Gateway</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.paymentgateway}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Status</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.status}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>Transaction Date</Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.transdate}
                          </Text>
                        </View>
                        <View style={styles.mainRow}>
                          <Text style={styles.labelText}>
                            Transaction Reference
                          </Text>
                          <Text style={[styles.infoText, { color: "#0e1130" }]}>
                            {item.transref}
                          </Text>
                        </View><View style={styles.mainRow}>
                          <Text style={{color:white}}>
                            end
                          </Text>
                          <Text style={[styles.infoText, { color: "#ffffff" }]}>
                            {item.transref}
                          </Text>
                        </View>
                        <View style={styles.dividerHorizontal} />
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          <View tabLabel="Member Detail">
            <MemberItem
              crffnmasterid={invoiceheader.crffnmasterid}
              navigation={this.props.navigation}
            />
          </View>
        </ScrollableTabView>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    invoicelist: state.invoices.invoicelist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  {}
)(InvoiceItem);
