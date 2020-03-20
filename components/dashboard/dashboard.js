import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  I18nManager,
  AsyncStorage,
  ScrollView
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title
} from "native-base";
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0
  }
};
import { Images, Fonts, Metrics, Colors } from "../../Themes/";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Drawer from "react-native-drawer";
import MyControlPanel from "./ControlPanel";
import tweens from "./tweens";
import styles from "./styles";
import { connect } from "react-redux";

import { loadloginuserInfo } from "../../redux/actions/authActions";

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: "DashboardHome",
      drawerType: "static",
      openDrawerOffset: 200,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: "linear",
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      side: "top"
    };
  }
  componentDidMount() {
    this.props.loadloginuserInfo();
  }
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Drawer");
      return true;
    });
  }
  setDrawerType(type) {
    this.setState({
      drawerType: type
    });
  }
  handlePractitioner = () => {
    this.props.navigation.navigate("Home");
  };
  handleInvoice = () => {
    this.props.navigation.navigate("Invoicelist");
  };
  handleScan = () => {
    this.props.navigation.navigate("QRCodeScanner");
  };
  handleMessage = () => {
    this.props.navigation.navigate("FilterMembers");
  };
  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }

  noopChange() {
    this.setState({
      changeVal: Math.random()
    });
  }

  openDrawer() {
    this.props.navigation.openDrawer();
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    return (
      <Container>
        <ImageBackground
          style={styles.imgContainer}
          source={Images.dashboardBG}
        >
          <Header androidStatusBarColor={"#04920b"} style={styles.header}>
            <Text style={styles.textTitle}>Dashboard</Text>
          </Header>
          <View>
            <View style={styles.rowView}>
              <View style={styles.columnone}>
                <TouchableOpacity onPress={() => this.handlePractitioner()}>
                  <View style={styles.box}>
                    <Icon name="contact" style={styles.icon} />
                    <Text style={styles.iconDescription}>Practitioners</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.columntwo}>
                <TouchableOpacity onPress={() => this.handleInvoice()}>
                  <View style={styles.box}>
                    <Icon name="list" style={styles.icon} />

                    <Text style={styles.iconDescription}>Invoice List</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowView}>
              <View style={styles.columnone}>
                <TouchableOpacity onPress={() => this.handleScan()}>
                  <View style={styles.box}>
                    <Icon
                      type="FontAwesome"
                      name="camera"
                      style={styles.icon}
                    />
                    <Text style={styles.iconDescription}>Scan</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.columntwo}>
                <TouchableOpacity onPress={() => this.handleMessage()}>
                  <View style={styles.box}>
                    <Icon name="mail" style={styles.icon} />

                    <Text style={styles.iconDescription}>Messages</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}

//Connect everything
export default connect(mapStateToProps, { loadloginuserInfo })(Dashboard);
