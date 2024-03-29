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
  List,
  ListItem,
  Thumbnail,
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

import {
  filterCriteria,
  reloadlist,
  mapDispatchToProps
} from "../../redux/actions/selectedmembersAction";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class FilterMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      isprocessing: false,
      data: [],
      errorswitch: Boolean,
      category: "",
      email: "",
      gsmnumber: "",
      crffnNumber: "",
      pagesize: 5,
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
  loadingList = () => {
    {
      if (
        this.state.isloading == true &&
        this.props.filteredlist.length == 0 &&
        this.props.errorMessage == ""
      ) {
        return <ActivityIndicator size="large"></ActivityIndicator>;
      }
    }
    if (
      this.props.errorMessage == "Error: Request failed with status code 400"
    ) {
      return (
        <Text style={styles.errortext}>Please Select a Valid Category!</Text>
      );
    }
  };
  isloading = () => {
    if (this.state.isprocessing == true || !this.state.data) {
      return (
        <View style={styles.isloading}>
          <ActivityIndicator size="large" color="#e7ffe6" />
        </View>
      );
    }
  };
  handleOnSearch() {
    this.props.reloadlist();
    this.setState({ isloading: true });
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
    item.gsmnumber = gsmnumber;
    item.email = email;
    item.pagesize = pagesize;
    item.pagenumber = pagenumber;
    item.crffnNumber = crffnNumber;

    this.props.filterCriteria(item);
    this.setState({
      filtereddata: this.props.filteredlist
    });
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
    this.setState({ isprocessing: true });
    this.props.loadMembersList(() => {
      this.setState({
        isprocessing: false,
        data: this.props.memberslist
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
      profileImage: serverdata.picture,
      name: `${serverdata.name} - [${serverdata.crffnMasterid}] `,
      post: serverdata.category,
      isSelected: false
    };
    console.log(returndata);
    return returndata;
  };
  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#04920b", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <View>
        <View>{this.isloading()}</View>

        <Container
          style={
            this.state.isprocessing == true || !this.state.data
              ? styles.container2
              : styles.container
          }
        >
          <Header androidStatusBarColor={"#04920b"} style={styles.header}>
            <Left style={styles.left}></Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Search Practitioner</Text>
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
          <View
            style={
              this.state.isprocessing == true || !this.state.data
                ? styles.container2
                : styles.container
            }
          >
            <View style={{ flex: 1 }}>
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
                      <Picker.Item
                        style={{ color: "#e3e3e3" }}
                        label="--Select Category--"
                        value=""
                      />
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
                    <MaterialIcons
                      name="mail-outline"
                      color="#c9b0c1"
                      size={17}
                    />
                    <Input
                      placeholderTextColor={Colors.hintblue}
                      textAlign={I18nManager.isRTL ? "right" : "left"}
                      placeholder="Email"
                      onChangeText={email => this.setState({ email })}
                      style={styles.inputemail}
                    />
                  </Item>
                  <Item underline style={styles.itememail}>
                    <SimpleLineIcons
                      name="lock-open"
                      color="#c9b0c1"
                      size={17}
                    />
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

            <View>
              <View>{this.loadingList()}</View>

              <ScrollView>
                {this.state.filtereddata.length !== 0 ||
                this.props.filteredlist !== undefined ||
                this.props.filteredlist !== null ? (
                  this.props.filteredlist.map((item, index) => {
                    return (
                      <List key={index} style={styles.listItems}>
                        <ListItem thumbnail>
                          <Left>
                            <Thumbnail
                              source={
                                item.picture == "data:image/png;base64,"
                                  ? Images.noavatar
                                  : { uri: item.picture }
                              }
                            />
                          </Left>
                          <Body>
                            <Text style={styles.rowNameTxt}>{item.name}</Text>
                            <Text note numberOfLines={1}>
                              {item.email == null
                                ? "no emails provided"
                                : item.email}
                            </Text>
                            <Text
                              style={{ color: "#41c21d" }}
                              note
                              numberOfLines={1}
                            >
                              {item.gsmnumber == null
                                ? "no phone contact provided"
                                : item.gsmnumber}
                            </Text>
                          </Body>
                          <Right>
                            <TouchableOpacity
                              style={styles.followBgSelected}
                              onPress={() => this.handleOnAdd(item)}
                            >
                              <Text style={styles.followTxtSelected}>Add</Text>
                            </TouchableOpacity>
                          </Right>
                        </ListItem>
                      </List>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: 17,
                      marginTop: 50
                    }}
                  >
                    Select Practitioners
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </Container>
      </View>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    memberslist: state.members.memberslist,
    selectedmembers: state.selectedmembers.selectedmemberslist,
    filteredlist: state.selectedmembers.filteredlist,
    errorMessage: state.selectedmembers.errorMessage
  };
}

//Connect everything
export default connect(
  mapStateToProps,

  { mapDispatchToProps, loadMembersList, filterCriteria, reloadlist }
)(FilterMembers);
