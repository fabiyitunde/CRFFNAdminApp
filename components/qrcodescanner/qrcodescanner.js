import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
  BackHandler,
  ScrollView,
  I18nManager,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import {
  Content,
  Container,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
  Segment,
  Label
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../Themes/";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

var screenName = "";

export default class QRCodeScanner extends Component {
  constructor(props) {
    super(props);

    if (this.props.navigation.state.params) {
      const navParams = this.props.navigation.state.params;
      screenName = navParams.name;
    }

    this.state = {
      hasCameraPermission: null,
      scanned: false
    };
  }
  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };
  componentWillMount() {
    var that = this;

    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.goBack(null);
      return true;
    });
  }

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.scrollToFocusedInput(reactNode);
  }

  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceProductDetailsTab"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([
      ["ArrivedForWishList", "ECommerceProductDetailsTab"]
    ]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    const { ArrivedForProductDetailsTab } = this.state;

    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return (
        <Text
          style={{
            textAlign: "center",
            justifyContent: "center",
            marginTop: 100
          }}
        >
          Requesting For Camera Permission
        </Text>
      );
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera </Text>;
    }
    return (
      <Container style={styles.container}>
        <View style={styles.content}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <Button
              first
              style={styles.roundbutton}
              onPress={() => this.setState({ scanned: false })}
            ></Button>
          )}
        </View>
      </Container>
    );
  }
  handleBarCodeScanned = ({ type, data }) => {
    // this.setState({ scanned: true });
    try {
      const json = JSON.parse(data);
      if (json.type == "Invoice") {
        this.props.navigation.navigate("ScannedInvoiceDetails", {
          token: json.id
        });
      } else if (json.type == "Certificate") {
        this.props.navigation.navigate("ScannedIDDetails", {
          token: json.id
        });
      } else {
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      }
    } catch (error) {
      alert(`Error details ${error} data value = ${data}`);
    }
  };
}
