import React, { PropTypes, Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  I18nManager,
  ActivityIndicator,
  Animated
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
import { Images, Fonts, Metrics, Colors } from "../../Themes/";
// Screen Styles
import styles from "./styles";
import { connect } from "react-redux";
import { loginuser, reloadlogin } from "../../redux/actions/authActions";
import * as Animatable from "react-native-animatable";

class Login extends Component {
  state = {
    errorHandler: "",
    email: "",
    password: "",
    isloading: false
  };
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  loading = () => {
    if (
      this.state.isloading == true &&
      JSON.stringify(this.props.errorMessage) === "{}"
    ) {
      return <ActivityIndicator size="large"></ActivityIndicator>;
    }

    if (JSON.stringify(this.props.errorMessage) !== "{}") {
      return (
        <Text
          style={{
            justifyContent: "center",
            textAlign: "center",
            color: "red"
          }}
        >
          Invalid Username/Email or Password
        </Text>
      );
    }
  };

  handleLogin() {
    this.props.reloadlogin();
    this.setState({ isloading: true });
    if (JSON.stringify(this.props.errorMessage) !== "{}") {
      this.props.errorMessage = {};
      console.log(JSON.stringify(this.props.errorMessage));
    }
    this.props.loginuser(this.state.email, this.state.password, () => {
      this.props.navigation.navigate("HomePage");
    });
  }
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
        <ImageBackground style={styles.imgContainer} source={Images.loginbg}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate("Dashboard")}
              >
                <FontAwesome
                  name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Sign In</Text>
            </Body>
            <Right style={styles.right} />
          </Header>

          <Content>
            <View style={styles.logoSec}>
              <Image
                style={styles.imageLogoMountify}
                source={Images.crffnlogo}
              />
            </View>
            <View>{this.loading()}</View>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor="#b7b7b7"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              textAlign={I18nManager.isRTL ? "right" : "left"}
              keyboardType="email-address"
              onChangeText={text => {
                this.setState({ email: text });
              }}
              value={this.state.email}
            />

            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="#b7b7b7"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              textAlign={I18nManager.isRTL ? "right" : "left"}
              keyboardType="default"
              onChangeText={text => {
                this.setState({ password: text });
              }}
              value={this.state.password}
            />

            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={() => this.handleLogin()}
            >
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </Content>

          <Text
            style={styles.textForgotPsssword}
            onPress={() => alert("Forgot Password")}
          >
            Forgot your password?
          </Text>
        </ImageBackground>
      </Container>
    );
  }
}
function mapStateToProps(state, props) {
  return {
    logininfo: state.auth.logininfo,
    errorMessage: state.auth.errorMessage
  };
}

//Connect everything
export default connect(mapStateToProps, { loginuser, reloadlogin })(Login);
