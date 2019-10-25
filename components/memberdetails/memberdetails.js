import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Platform,
  BackHandler,
  I18nManager,
  AsyncStorage,
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
import Images from "../../Themes/Images";
import { connect } from "react-redux";
import MemberInvoiceList from "../memberinvoicelist/memberinvoicelist";
import ScrollableTabView, {
  ScrollableTabBar
} from "../../UIComponents/react-native-scrollable-tab-view";
class MemberDetails extends Component {
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
      StatusBar.setBackgroundColor("#04920b", true);
      StatusBar.setTranslucent(true);
    }
    const { memberslist } = this.props;
    const crffnmasterid = this.props.navigation.getParam("crffnmasterid", "");
    const selectedmember = memberslist.find(a => a.Id == crffnmasterid);
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#04920b"} style={styles.header}>
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
            <Text style={styles.textTitle}>Member Details</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <ScrollableTabView
          initialPage={0}
          tabBarBackgroundColor={"white"}
          tabBarActiveTextColor={"#04920b"}
          tabBarInactiveTextColor={"#789079"}
          tabBarUnderlineStyle={{ backgroundColor: "#036408" }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="Details">
            <View style={styles.mainView}>
              <ImageBackground
                source={Images.bghome}
                style={{ width: "100%", height: "50%" }}
              >
                <View style={styles.mainRow}>
                  <Image
                    source={{ uri: selectedmember.picturestring }}
                    style={styles.profileImg}
                  />
                  <View style={styles.infoRow}>
                    <Text style={[styles.labelHeaderText]}>
                      {selectedmember.CustomerName}
                    </Text>
                  </View>
                  <View style={styles.infoRow}></View>
                </View>
              </ImageBackground>
              <View style={styles.secondRow}>
                <View style={styles.mainRow}>
                  <Text style={styles.labelText}>CRFFN Number</Text>
                  <Text style={[styles.infoText, { color: "#04920b" }]}>
                    {selectedmember.MembershipNumber}
                  </Text>
                </View>
                <View style={styles.dividerHorizontal} />
                <View style={styles.dividerHorizontal} />
                <View style={styles.mainRow}>
                  <Text style={styles.labelText}>Email</Text>
                  <Text style={[styles.infoText, { color: "#0e1130" }]}>
                    {selectedmember.RegistrationUserEmail}
                  </Text>
                </View>
                <View style={styles.dividerHorizontal} />
                <View style={styles.mainRow}>
                  <Text style={styles.labelText}>Category</Text>
                  <Text style={[styles.infoText, { color: "#0e1130" }]}>
                    {selectedmember.FreightForwaderCategoryDescr}
                  </Text>
                </View>
                <View style={styles.dividerHorizontal} />
                <View style={styles.mainRow}>
                  <Text style={styles.labelText}>PhoneNumber</Text>
                  <Text style={[styles.infoText, { color: "#0e1130" }]}>
                    {selectedmember.CorrespondenceGSM}
                  </Text>
                </View>
                <View style={styles.dividerHorizontal} />
              </View>
            </View>
          </View>
          <View tabLabel="InvoiceList">
            <MemberInvoiceList
              crffnmasterid={crffnmasterid}
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
    memberslist: state.members.memberslist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  {}
)(MemberDetails);
