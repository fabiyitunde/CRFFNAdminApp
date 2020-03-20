import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  I18nManager,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  ActivityIndicator
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
import { loadMembersList } from "../../redux/actions/membersAction";
import { connect } from "react-redux";
import Images from "../../Themes/Images";
import ScrollableTabView, {
  ScrollableTabBar
} from "../../UIComponents/react-native-scrollable-tab-view";
class MemberItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isprocessing: false,
      data: [],
      selectedmember: {}
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
  componentDidMount() {
    this.setState({ isprocessing: true });
    this.props.loadMembersList(() => {
      const crffnmasterid = this.props.crffnmasterid;
      this.setState({
        isprocessing: false,
        data: this.props.memberslist,
        selectedmember: this.props.memberslist.find(a => a.Id == crffnmasterid)
      });
    });
  }
  _handleBagNavigation() {
    AsyncStorage.multiSet([["ArrivedFrom", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceMyBag");
  }

  _handleWishListNavigation() {
    AsyncStorage.multiSet([["ArrivedForWishList", "ECommerceMyInformation"]]);
    this.props.navigation.navigate("ECommerceWishList");
  }

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#0e1130", true);
      StatusBar.setTranslucent(true);
    }
    //const { memberslist } = this.props;
    const { selectedmember } = this.state;
    // const crffnmasterid = this.props.crffnmasterid;

    if (this.state.isprocessing == true) {
      return (
        <View style={styles.isloading}>
          <ActivityIndicator size="large" color="#e7ffe6" />
        </View>
      );
    }
    return (
      <Container style={styles.container}>
        <View style={(style = styles.insideContainer)}>
          <View style={styles.mainView}>
            <ImageBackground
              source={Images.userbg}
              style={{ width: "100%", height: "100%" }}
            >
              <View style={styles.imageContent}>
                <Image
                  source={{ uri: selectedmember.picturestring }}
                  style={styles.profileImg}
                />
              </View>
            </ImageBackground>
            <View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow2}>
                <ImageBackground
                  source={Images.listbg}
                  style={{ width: "100%" }}
                >
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>CRFFN Number</Text>
                    <Text style={[styles.infoText, { color: "#83f8ff" }]}>
                      {selectedmember.MembershipNumber}
                    </Text>
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow2}>
                <ImageBackground
                  source={Images.listbg}
                  style={{ width: "100%" }}
                >
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Name</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {selectedmember.CustomerName}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow2}>
                <ImageBackground
                  source={Images.listbg}
                  style={{ width: "100%" }}
                >
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Email</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {selectedmember.RegistrationUserEmail}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow2}>
                <ImageBackground
                  source={Images.listbg}
                  style={{ width: "100%" }}
                >
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>Category</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {selectedmember.FreightForwaderCategoryDescr}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.mainRow2}>
                <ImageBackground
                  source={Images.listbg}
                  style={{ width: "100%" }}
                >
                  <View style={styles.mainRow}>
                    <Text style={styles.labelText}>PhoneNumber</Text>
                    <Text style={[styles.infoText, { color: "#ffffff" }]}>
                      {selectedmember.CorrespondenceGSM}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.dividerHorizontal} />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    memberslist: state.members.memberslist
  };
}

//Connect everything
export default connect(mapStateToProps, { loadMembersList })(MemberItem);
