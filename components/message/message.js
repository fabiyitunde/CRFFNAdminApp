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
  Textarea,
  Button,
  Title,
  Form,
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
import { sendMessage } from "../../redux/actions/messageAction";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class MessageHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: [],

      messagetype: "",

      title: "",
      body: "",
      filtereddata: [],
      searchtext: ""
    };
  }

  onChangePasswordClick() {
    this.props.navigation.navigate("ECommerceChangePassword");
  }

  onBackClick() {
    this.props.navigation.navigate("SelectedMembersList");
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("HomePage");
      return true;
    });
  }
  sendMessage() {
    const item = {};
    var { title, body, data, messagetype } = this.state;
    var sendtolist = data.map(a => ({
      crffnMasterid: a.crffnMasterid,
      name: a.name
    }));

    item.title = title;
    item.messagetype = messagetype;
    item.body = body;
    item.sendtolist = sendtolist;
    this.props.sendMessage(item);

    console.log(item);
  }
  handleOnAdd(item) {
    this.props.mapDispatchToProps(item);
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
    this.state.data = this.props.selectedmembers;
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
            <Text style={styles.textTitle}>Message</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity
              onPress={() => this.viewSelectedMembers()}
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
          <View>
            <Item underline style={styles.itememail}>
              <Picker
                selectedValue={this.state.messagetype}
                style={styles.inputemail}
                onValueChange={(messagetype, itemIndex) =>
                  this.setState({ messagetype: messagetype })
                }
              >
                <Picker.Item
                  style={{ color: "#000000" }}
                  label="--Select Message Type--"
                  value=""
                />
                <Picker.Item label="SMS" value="1" />
                <Picker.Item label="Email" value="2" />
                <Picker.Item label="Notification" value="3" />
              </Picker>
            </Item>
            <Item underline style={styles.itememail}>
              <Input
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Title"
                onChangeText={title => this.setState({ title })}
              />
            </Item>
            <Form underline style={styles.itememail}>
              <Textarea
                rowSpan={12}
                bordered
                placeholder="Message"
                onChangeText={body => this.setState({ body })}
              />
            </Form>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity
              info
              style={styles.buttondialogsignup}
              onPress={() => this.sendMessage()}
            >
              <Text autoCapitalize="words" style={styles.buttonsignin}>
                Send Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    // memberslist: state.members.memberslist,
    selectedmembers: state.selectedmembers.selectedmemberslist,
    filteredlist: state.selectedmembers.filteredlist
  };
}

//Connect everything
export default connect(
  mapStateToProps,

  { mapDispatchToProps, sendMessage, filterCriteria }
)(MessageHome);
