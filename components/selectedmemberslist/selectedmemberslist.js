import React, { Component } from "react";
import {
  View,
  BackHandler,
  Text,
  ActivityIndicator,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  ImageBackground,
  I18nManager,
  AsyncStorage,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Container,
  Button,
  Right,
  Left,
  ListItem,
  Content,
  Body,
  Header,
  Title,
  Footer,
  FooterTab,
  Icon
} from "native-base";
import { SearchBar } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0
  }
};
import * as linq from "linq";

import styles from "./styles";
import { connect } from "react-redux";
import { removeItemFromProps } from "../../redux/actions/selectedmembersAction";

class SelectedMembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Social");
      return true;
    });
  }
  handleOnRemoveItem = selecteditem => {
    this.props.removeItemFromProps(selecteditem);
  };
  onBackClick() {
    this.props.navigation.navigate("HomePage");
  }
  componentDidMount() {
    this.selectedmembers;
    this.data = this.props.selectedmembers;
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    // if (this.state.isprocessing == true || !this.state.data)
    //   return <ActivityIndicator size="large" color="#0000ff" />;
    return (
      <Container>
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
            <Text style={styles.textTitle}>Selected Practitioners</Text>
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
        <ScrollView>
          <View>
            <View
              style={styles.listMainView}
              animation="zoomInDown"
              duration={1100}
              delay={1400}
            >
              {this.props.selectedmembers.length > 0 ? (
                <View>
                  {this.props.selectedmembers.map((item, index) => {
                    // const item = this.transformDataForDisplay(serveritem);
                    // console.log(item);
                    return (
                      <View style={styles.rowBg} key={index}>
                        <View style={styles.rowView}>
                          <View style={styles.namePostView}>
                            <Text style={styles.rowNameTxt}>{item.name}</Text>
                            <Text style={styles.rowDesignationTxt}>
                              {item.post}
                            </Text>
                          </View>

                          <View style={{ justifyContent: "center" }}>
                            <TouchableOpacity
                              onPress={() => this.handleOnRemoveItem(item)}
                            >
                              <Ionicons
                                name="ios-close-circle"
                                size={30}
                                style={{ marginLeft: 23 }}
                                color="#ff0909"
                              />
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
              ) : (
                <Text
                  style={{
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 17,
                    marginTop: 50
                  }}
                >
                  No Items Selected
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    selectedmembers: state.selectedmembers.selectedmemberslist
  };
}

//Connect everything
export default connect(
  mapStateToProps,
  { removeItemFromProps }
)(SelectedMembersList);
