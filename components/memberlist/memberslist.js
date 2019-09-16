import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  TextInput,
  BackHandler,
  I18nManager
} from "react-native";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Icon,
  Title
} from "native-base";
import { SearchBar } from "react-native-elements";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";

import * as linq from "linq";
import { connect } from "react-redux";
import { loadMembersList } from "../../redux/actions/membersAction";
/**
 *  Profile Screen
 */

class MembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: [],
      filtereddata: [],
      searchtext: ""
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Social");
      return true;
    });
  }
  handleOnViewDetail = selecteditem => {
    this.props.navigation.navigate("MemberDetails", {
      crffnmasterid: selecteditem.id
    });
  };
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
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    if (this.state.isprocessing == true || !this.state.data)
      return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <View>
        <View androidStatusBarColor={"#0e1130"} style={styles.header}>
          <SearchBar
            style={styles.searcbarstyle}
            round //To make the searchbar corner round (default square)
            searchIcon={{ size: 24 }} //Size of the search icon
            onChangeText={text => this.SearchFilterFunction(text)}
            onClear={text => this.SearchFilterFunction("")}
            placeholder="Member Search..."
            value={this.state.searchtext}
          />
        </View>
        <View
          style={styles.listMainView}
          animation="zoomInDown"
          duration={1100}
          delay={1400}
        >
          {this.state.filtereddata.map((serveritem, index) => {
            const item = this.transformDataForDisplay(serveritem);
            return (
              <View style={styles.rowBg} key={index}>
                <View style={styles.rowView}>
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.profileImg}
                  />
                  <View style={styles.namePostView}>
                    <Text style={styles.rowNameTxt}>{item.name}</Text>
                    <Text style={styles.rowDesignationTxt}>{item.post}</Text>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                    <TouchableOpacity
                      style={styles.followBgSelected}
                      onPress={() => this.handleOnViewDetail(item)}
                    >
                      <Text style={styles.followTxtSelected}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={
                    index === this.state.data.length - 1
                      ? null
                      : styles.dividerHorizontal
                  }
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
  _fnChangeItem(listId) {
    // const newArray = this.state.data;
    const newArray = this.state.data;

    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == listId) {
        // alert(listId + ' prag ' +this.state.data[i].id)
        const newArray1 = [];

        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].id == listId) {
            newArray1.push({
              id: this.state.data[i].id,
              profileImage: this.state.data[i].profileImage,
              name: this.state.data[i].name,
              post: this.state.data[i].post,
              isSelected: !this.state.data[i].isSelected
            });
          } else {
            newArray1.push({
              id: this.state.data[i].id,
              profileImage: this.state.data[i].profileImage,
              name: this.state.data[i].name,
              post: this.state.data[i].post,
              isSelected: this.state.data[i].isSelected
            });
          }
        }

        this.setState({ data: newArray1 });
        console.log("pragnesh");
        console.log(newArray1);
      }
    }
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
  { loadMembersList }
)(MembersList);
