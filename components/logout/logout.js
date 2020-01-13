import React, { PropTypes, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  I18nManager
} from "react-native";
import {
  Container,
  Content,
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Screen Styles
import styles from "./styles";
import { connect } from "react-redux";
import { logoutuser } from "../../redux/actions/authActions";
import { Images, Fonts, Metrics, Colors } from "../../Themes/";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    //this.props.navigation.navigate("Login");
    this.props.logoutuser(() => {
      this.props.navigation.navigate("SignIn");
    });
  };
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("HomePage");
      return true;
    });
  }

  render() {
    return (
      <Container>
        <ImageBackground style={styles.imgContainer} source={Images.logoutbg}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <FontAwesome
                  name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Logout</Text>
            </Body>
            <Right style={styles.right} />
          </Header>

          <Content style={styles.content}>
            <View style={styles.logoSec}>
              <Image
                style={styles.imageLogoMountify}
                source={Images.crffnlogo}
              />
            </View>

            <Text style={styles.textForgotPsssword}>
              Are you sure you want to signout?
            </Text>

            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={() => this.handleLogout()}
            >
              <Text style={styles.signInText}>Sign Out</Text>
            </TouchableOpacity>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {};
}

//Connect everything
export default connect(mapStateToProps, { logoutuser })(Logout);
