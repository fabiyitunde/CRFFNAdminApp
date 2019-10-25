import React, { Component } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
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

const SelectedMembersIcon = props => (
  <TouchableOpacity
    onPress={() => this.props.navigation.navigate("Drawer")}
    style={styles.backArrow}
  >
    {I18nManager.isRTL ? (
      <Ionicons name="ios-arrow-round-forward" size={30} color="#ffffff" />
    ) : (
      <Ionicons name="ios-arrow-round-back" size={30} color="#ffffff" />
    )}
  </TouchableOpacity>
);

export default SelectedMembersIcon;
