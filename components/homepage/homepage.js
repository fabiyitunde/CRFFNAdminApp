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
import NFCScanner from "../nfcscanner/nfcscanner";
import Dashboard from "../dashboard/dashboard";
import Logout from "../logout/logout";

import App from "react-native-nfc-manager/example/App";
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
      selectedTab: "Dashboard",
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
  componentDidMount() {}

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Drawer");
      return true;
    });
  }
  componentWillUnmount() {
    this.setState({ selectedTab: "Dashboard" });
  }

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "Dashboard":
        return (
          <View>
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
                    <TouchableOpacity
                      onPress={() => this.setState({ selectedTab: "Home" })}
                    >
                      <View style={styles.box}>
                        <Icon name="contact" style={styles.icon} />
                        <Text style={styles.iconDescription}>
                          Practitioners
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.columntwo}>
                    <TouchableOpacity
                      onPress={() => this.setState({ selectedTab: "Invoices" })}
                    >
                      <View style={styles.box}>
                        <Icon name="list" style={styles.icon} />

                        <Text style={styles.iconDescription}>Invoice List</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.rowView}>
                  <View style={styles.columnone}>
                    <TouchableOpacity
                      onPress={() => this.setState({ selectedTab: "ScanCode" })}
                    >
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
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ selectedTab: "FilterMembers" })
                      }
                    >
                      <View style={styles.box}>
                        <Icon name="mail" style={styles.icon} />

                        <Text style={styles.iconDescription}>Messages</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        );
        break;
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
        return <Dashboard {...this.props} />;
        break;
      case "NFCScanner":
        return <NFCScanner {...this.props} />;
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
              onPress={() => this.setState({ selectedTab: "Dashboard" })}
            >
              {this.state.selectedTab == "Dashboard" ? (
                <Image source={Images.activeHome} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalHome} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "Dashboard"
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
            {/* <Button
              vertical
              onPress={() => this.setState({ selectedTab: "NFCScanner" })}
            >
              {this.state.selectedTab == "NFCScanner" ? (
                <Image source={Images.activeScan} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalScan} style={styles.tabIcon} />
              )}
              <Text
                style={
                  this.state.selectedTab == "NFCScanner"
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
                NFC Scan
              </Text>
            </Button> */}
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
                <Image source={Images.activeLogout} style={styles.tabIcon} />
              ) : (
                <Image source={Images.normalLogout} style={styles.tabIcon} />
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
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
