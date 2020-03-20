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
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet
} from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import {
  Content,
  Container,
  Form,
  Textarea,
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

import styles from "./styles";

export default class NFCScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: "Ready...",
      text: "",
      supported: true,
      enabled: false,
      tag: {}
    };
  }
  componentDidMount() {
    // NfcManager.start();
  }
  componentWillUnMount() {
    this.cleanUp();
  }
  cleanUp = () => {};
  onChangeText = text => {
    this.setState({ text });
  };
  onWriteData = () => {
    try {
    } catch (err) {
      this.setState({
        log: err.toString()
      });
      this.cleanUp();
    }
  };

  render() {
    return (
      <Container>
        <SafeAreaView style={styles.container}>
          <Form underline style={styles.writeitem}>
            <Textarea
              rowSpan={5}
              bordered
              placeholder="Write Text"
              onChangeText={text => this.setState({ text })}
            />
          </Form>

          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => this.onWriteData()}
          >
            <Text style={styles.signInText}>Write</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={() => this.onReadData()}
          >
            <Text style={styles.signInText}>Read</Text>
          </TouchableOpacity>
          <View style={styles.log}>
            <Text>{this.state.log}</Text>
          </View>
        </SafeAreaView>
      </Container>
    );
  }
}
