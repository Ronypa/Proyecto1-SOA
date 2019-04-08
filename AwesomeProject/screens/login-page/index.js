import * as React from "react";
import { Button, Text, TextInput, View, ImageBackground } from "react-native";

import styles from "./styles";
import imageLogin from "../../assets/icons/houseLogin.gif";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      userString: "",
      passwordString: "",
      isLoading: false,
      message: ""
    };
    this.userInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  _onLoginPressed = () => {
    if (this.state.userString == "Yo" && this.state.passwordString == "123") {
      this.setState({ userString: "", passwordString: "", message: "" });
      this.userInput.current.clear();
      this.passwordInput.current.clear();
      this.props.navigation.navigate("Home");
    } else {
      this.setState({
        message: "Usuario o contraseña incorrectos"
      });
    }
  };

  _onPasswordTextChanged = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  _onUserTextChanged = event => {
    this.setState({
      userString: event.nativeEvent.text
    });
  };

  render() {
    return (
      <ImageBackground
        source={imageLogin}
        style={styles.image}
        resizeMode={"cover"}
      >
        <View style={styles.container}>
          <View style={styles.flowRight}>
            <TextInput
              underlineColorAndroid={"transparent"}
              style={styles.searchInput}
              placeholder="Usuario"
              placeholderTextColor="#666666"
              onChange={this._onUserTextChanged}
              ref={this.userInput}
            />

            <TextInput
              underlineColorAndroid={"transparent"}
              style={styles.searchInput}
              placeholder="Contraseña"
              placeholderTextColor="#666666"
              secureTextEntry={true}
              onChange={this._onPasswordTextChanged}
              ref={this.passwordInput}
            />
            <View style={styles.buttonLogin}>
              <Button onPress={this._onLoginPressed} title="Login" />
            </View>

            <Text style={styles.description}>{this.state.message}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
