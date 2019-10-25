import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Container, Header, Content, Item, Input, Icon } from "native-base";
import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../Themes/";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
  }
  handleSignout = () => {
    (async () => {
      await AsyncStorage.removeItem("userToken");
    })();
    this.props.navigation.navigate("SignIn");
  };
  handleNavigateToHome = () => {
    this.props.navigation.navigate("Home");
    // this.props.closeDrawer();
  };
  handleNavigateToQRCodeScanner = () => {
    this.props.navigation.navigate("QRCodeScanner");
    // this.props.closeDrawer();
  };
  handleNavigateToCashbook = () => {
    this.props.navigation.navigate("Cashbook");
    this.props.closeDrawer();
  };
  handleNavigateToBudget = () => {
    this.props.navigation.navigate("Budget");
    this.props.closeDrawer();
  };
  handleNavigateToFixedAsset = () => {
    this.props.navigation.navigate("FixedAsset");
    this.props.closeDrawer();
  };
  render() {
    return (
      <ScrollView>
        <ImageBackground source={Images.drawerBG} style={styles.menuimageBg}>
          <View style={styles.menuClose}></View>
          <View style={styles.menuListSec}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.handleNavigateToHome()}>
                <View
                  style={[
                    styles.menuList,
                    { borderBottomWidth: 0.5, borderColor: "#53afe3" }
                  ]}
                >
                  <MaterialCommunityIcons
                    name="file-outline"
                    color="#ffffff"
                    size={20}
                  />
                  <Text style={styles.menuItemText}>Home</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleNavigateToQRCodeScanner()}
              >
                <View
                  style={[
                    styles.menuList,
                    {
                      borderLeftWidth: I18nManager.isRTL ? 0 : 0.5,
                      borderRightWidth: I18nManager.isRTL ? 0.5 : 0,
                      borderBottomWidth: 0.5,
                      borderColor: "#53afe3"
                    }
                  ]}
                >
                  <SimpleLineIcons name="user" color="#ffffff" size={20} />
                  <Text style={styles.menuItemText}>Scan</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.handleNavigateToBudget()}>
                <View
                  style={[
                    styles.menuList,
                    { borderBottomWidth: 0.5, borderColor: "#53afe3" }
                  ]}
                >
                  <MaterialCommunityIcons
                    name="file-outline"
                    color="#ffffff"
                    size={30}
                  />
                  <Text style={styles.menuItemText}>Budget</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.handleNavigateToFixedAsset()}
              >
                <View
                  style={[
                    styles.menuList,
                    {
                      borderLeftWidth: I18nManager.isRTL ? 0 : 0.5,
                      borderRightWidth: I18nManager.isRTL ? 0.5 : 0,
                      borderBottomWidth: 0.5,
                      borderColor: "#53afe3"
                    }
                  ]}
                >
                  <SimpleLineIcons name="user" color="#ffffff" size={30} />
                  <Text style={styles.menuItemText}>Fixed Asset</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.handleSignout()}>
                <View style={styles.menuList}>
                  <View style={styles.msgCountSec}>
                    <Text style={styles.menumsgCount}>3</Text>
                    <SimpleLineIcons name="bubbles" color="#ffffff" size={30} />
                  </View>
                  <Text style={styles.menuItemText}>Sign Out</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleNavigateToCashbook()}>
                <View
                  style={[
                    styles.menuList,
                    {
                      borderLeftWidth: I18nManager.isRTL ? 0 : 0.5,
                      borderRightWidth: I18nManager.isRTL ? 0.5 : 0,
                      borderColor: "#53afe3"
                    }
                  ]}
                >
                  <SimpleLineIcons name="settings" color="#ffffff" size={30} />
                  <Text style={styles.menuItemText}>Cashbook Mgt.</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    );
  }
}
