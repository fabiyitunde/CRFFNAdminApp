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
          tabBarBackgroundColor={"#181818"}
          tabBarActiveTextColor={"#04de0f"}
          tabBarInactiveTextColor={"#a1cfa3"}
          tabBarUnderlineStyle={{ backgroundColor: "#04de0f" }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="Details">
            <View style={styles.mainView}>
              <ImageBackground
                source={Images.loginbg}
                style={{ width: "100%", height: "100%" }}
              >
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
                  <ImageBackground
                    source={Images.listBackground}
                    style={{ width: "100%" }}
                  >
                    <View style={styles.mainRow}>
                      <Text style={styles.labelText}>CRFFN Number</Text>
                      <Text style={[styles.infoText, { color: "#00e74c" }]}>
                        {selectedmember.MembershipNumber}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.dividerHorizontal} />
                  <View style={styles.dividerHorizontal} />
                  <ImageBackground
                    source={Images.listBackground}
                    style={{ width: "100%" }}
                  >
                    <View style={styles.mainRow}>
                      <Text style={styles.labelText}>Email</Text>
                      <Text style={[styles.infoText, { color: "#ffffff" }]}>
                        {selectedmember.RegistrationUserEmail}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.dividerHorizontal} />
                  <ImageBackground
                    source={Images.listBackground}
                    style={{ width: "100%" }}
                  >
                    <View style={styles.mainRow}>
                      <Text style={styles.labelText}>Category</Text>
                      <Text style={[styles.infoText, { color: "#ffffff" }]}>
                        {selectedmember.FreightForwaderCategoryDescr}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.dividerHorizontal} />
                  <ImageBackground
                    source={Images.listBackground}
                    style={{ width: "100%" }}
                  >
                    <View style={styles.mainRow}>
                      <Text style={styles.labelText}>Phone Number</Text>
                      <Text style={[styles.infoText, { color: "#ffffff" }]}>
                        {selectedmember.CorrespondenceGSM}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.dividerHorizontal} />
                </View>
              </ImageBackground>
            </View>
          </View>
          <View tabLabel="Invoice List">
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
export default connect(mapStateToProps, {})(MemberDetails);
