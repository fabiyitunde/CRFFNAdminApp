import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Fonts, Metrics, Colors } from "../../Themes/";

import {
  ActivityIndicator,
  TouchableHighlight,
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
  ScrollView,
  Dimensions
} from "react-native";
import * as linq from "linq";
import {
  Content,
  Input,
  Container,
  Right,
  Header,
  Picker,
  Left,
  Body,
  Button,
  Title,
  Item
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
import { SearchBar } from "react-native-elements";
import { loadMembersList } from "../../redux/actions/membersAction";
import { mapDispatchToProps } from "../../redux/actions/selectedmembersAction";

import { filterCriteria } from "../../redux/actions/selectedmembersAction";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class FilterMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: [],

      category: "",
      email: "",
      gsmnumber: "",
      crffnNumber: "",
      pagesize: 10,
      pagenumber: 1,
      name: "",
      filtereddata: [],
      searchtext: ""
    };
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
  handleOnSearch() {
    const item = {};
    var {
      name,
      email,
      category,
      pagesize,
      pagenumber,
      crffnNumber,
      gsmnumber
    } = this.state;
    item.name = name;
    item.category = parseInt(category, 10);
    item.gsmnumber = parseInt("00009877");
    item.email = email;
    item.pagesize = pagesize;
    item.pagenumber = pagenumber;
    item.crffnNumber = crffnNumber;

    this.props.filterCriteria(item);
  }
  handleOnAdd() {
    console.log("j");
    console.log("ju");
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }
  componentDidMount() {
    this.setState({ isprocessing: true });
    this.props.loadMembersList(() => {
      this.setState({
        isprocessing: false,
        data: this.props.memberslist,
        filtereddata: this.props.memberslist
      });
    });
  }
  SearchFilterFunction = text => {
    this.setState({ searchtext: text });
    const { data } = this.state;

    if (data == null || data == undefined) {
      this.setState({ filtereddata: [] });
      return;
    }
    if (text == "") {
      this.setState({ filtereddata: data });
      return;
    }

    var filteredlist = linq
      .from(data)
      .where(
        a =>
          a.CustomerName.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          a.MembershipNumber.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          a.FreightForwaderCategoryDescr.toLowerCase().indexOf(
            text.toLowerCase()
          ) !== -1
      )
      .toArray();

    this.setState({ filtereddata: filteredlist });
  };
  viewSelectedMembers() {
    this.props.navigation.navigate("SelectedMembersList");
  }
  transformDataForDisplay = serverdata => {
    const returndata = {
      id: Number(serverdata.Id),
      profileImage: serverdata.picturestring,
      name: `${serverdata.CustomerName} - [${serverdata.MembershipNumber}] `,
      post: serverdata.FreightForwaderCategoryDescr,
      isSelected: false
    };

    return returndata;
  };
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#04920b", true);
      StatusBar.setTranslucent(true);
    }
    if (this.state.isprocessing == true || !this.state.data)
      return <ActivityIndicator size="large" color="#0000ff" />;

    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={"#04920b"} style={styles.header}>
          <Left style={styles.left}></Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Search Practitioner</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Drawer")}
              style={styles.backArrow}
            >
              <Text
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(11,142,20,0.8)",
                  color: "white",
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  right: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2000
                }}
              >
                {this.props.selectedmembers.length}
              </Text>

              <Ionicons name="ios-person" size={30} color="#ffffff" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.container}>
          <View style={styles.view2}>
            <ImageBackground source={Images.bghome} style={styles.view4}>
              <Item underline style={styles.itememail}>
                <SimpleLineIcons name="user" color="#c9b0c1" size={17} />
                <Picker
                  selectedValue={this.state.category}
                  style={styles.inputemail}
                  onValueChange={(category, itemIndex) =>
                    this.setState({ category: category })
                  }
                >
                  <Picker.Item label="Individual" value="1" />
                  <Picker.Item label="Company" value="2" />
                </Picker>
              </Item>
              <Item underline style={styles.itememail}>
                <SimpleLineIcons name="user" color="#c9b0c1" size={17} />
                <Input
                  placeholderTextColor={Colors.hintblue}
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  placeholder="Full Name"
                  style={styles.inputemail}
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
              <Item underline style={styles.itememail}>
                <MaterialIcons name="mail-outline" color="#c9b0c1" size={17} />
                <Input
                  placeholderTextColor={Colors.hintblue}
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  placeholder="Email"
                  onChangeText={email => this.setState({ email })}
                  style={styles.inputemail}
                />
              </Item>
              <Item underline style={styles.itememail}>
                <SimpleLineIcons name="lock-open" color="#c9b0c1" size={17} />
                <Input
                  placeholderTextColor={Colors.hintblue}
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  placeholder="GSM Number"
                  onChangeText={gsmnumber => this.setState({ gsmnumber })}
                  style={styles.inputemail}
                />
              </Item>
            </ImageBackground>
          </View>
          <TouchableOpacity
            info
            style={styles.buttondialogsignup}
            onPress={() => this.handleOnSearch()}
          >
            <Text autoCapitalize="words" style={styles.buttonsignin}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    memberslist: state.members.memberslist,
    selectedmembers: state.selectedmembers.selectedmemberslist,
    selectedmembers: state.selectedmembers.filteredlist
  };
}

//Connect everything
export default connect(
  mapStateToProps,

  { mapDispatchToProps, loadMembersList, filterCriteria }
)(FilterMembers);
