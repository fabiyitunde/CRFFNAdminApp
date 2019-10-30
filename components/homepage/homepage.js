import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ListView,
  View,
  TextInput,
  BackHandler
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
  Title,
  Footer,
  FooterTab,
  Icon
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Fonts, Metrics, Colors } from "../../Themes/";
// Screen Styles
import styles from "./styles";
import Images from "../../Themes/Images";
import Home from "../home/home";
import Drawer from "react-native-drawer";
import MyControlPanel from "./ControlPanel";
import Invoicelist from "../invoicelist/invoicelist";
import FilterMembers from "../filtermembers/filtermembers";
import QRCodeScanner from "../qrcodescanner/qrcodescanner";
import Logout from "../logout/logout";
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0
  }
};
/**
 *  Profile Screen
 */
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Home",
      drawerType: "static",

      openDrawerOffset: 50,
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
      tapToClose: true,
      negotiatePan: false,
      side: "left"
    };
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Drawer");
      return true;
    });
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "Home":
        return <Home {...this.props} />;
        break;
      case "ScanCode":
        return <QRCodeScanner {...this.props} />;
        break;
      case "Invoices":
        return <Invoicelist {...this.props} />;
        break;
      case "FilterMembers":
        return <FilterMembers {...this.props} />;
        break;
      case "Profile":
        return <Home {...this.props} />;
        break;
      case "Logout":
        return <Logout {...this.props} />;
        break;
      default:
    }
  }

  render() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#FFFFFF", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        <Content>{this.renderSelectedTab()}</Content>

        <Footer>
          <FooterTab style={styles.footerTabBg}>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Home" })}
            >
              {this.state.selectedTab == "Home" ? (
                <Image source={Images.activeHome} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalHome} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Home"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Home
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "ScanCode" })}
            >
              {this.state.selectedTab == "ScanCode" ? (
                <Image source={Images.activeScan} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalScan} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "ScanCode"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Scan Code
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Invoices" })}
            >
              {this.state.selectedTab == "Invoices" ? (
                <Image source={Images.activeInvoice} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalInvoice} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Invoices"
                    ? styles.activeTabText
                    : styles.normalTabText
                }
              >
                Invoices
              </Text>
            </Button>
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "FilterMembers" })}
            >
              {this.state.selectedTab == "FilterMembers" ? (
                <Image source={Images.activeMessage} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalMessage} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "FilterMembers"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Message
              </Text>
            </Button>

            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Logout" })}
            >
              {this.state.selectedTab == "Logout" ? (
                <Image source={Images.logoutIcon} style={styles.tabIcon} />
              ) : (
                <Image source={Images.logoutIcon} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Logout"
                    ? [
                        styles.activeTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                    : [
                        styles.normalTabText,
                        { marginTop: Metrics.WIDTH * 0.01 }
                      ]
                }
              >
                Logout
              </Text>
            </Button>
            {/* 
            <Button
              vertical
              onPress={() => this.setState({ selectedTab: "Profile" })}
            >
              {this.state.selectedTab == "Profile" ? (
                <EvilIcons name="user" size={30} color="#00bff3" />
              ) : (
                <EvilIcons name="user" size={30} color="#929292" />
              )}
              <Text
                style={
                  this.state.selectedTab == "Profile"
                    ? styles.activeTabText
                    : styles.normalTabText
                }
              >
                Profile
              </Text>
            </Button> */}
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
