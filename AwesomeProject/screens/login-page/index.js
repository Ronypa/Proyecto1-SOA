import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";

import styles from "./styles";
import imageLogin from "../../assets/icons/houseLogin.gif";

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  //constructur and State variables
  constructor(props) {
    super(props);
    this.state = {
      userString: "",
      passwordString: "",
      loadingSpinner: null,
      message: "",
      ip: ""
    };
    this.userInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  //method called by the Login Button
  _onLoginPressed = async () => {
    var IP = this.state.ip != "" ? this.state.ip : "http://192.168.1.2:8080"
    this.setState({
      loadingSpinner: <ActivityIndicator size="large" color="#0000ff" />
    });
    const response = await fetch(IP+ "/api/v1/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.userString,
        password: this.state.passwordString
      })
    }).catch(error => {
      Alert.alert("Ocurrió el siguiente error en la operación: " + error);
      this.setState({ loadingSpinner: null });
      return -1;
    });
    var data = await response.json()
    console.log(data)
    this.setState({ loadingSpinner: null });
    if (response.status == 200) {
      this.props.navigation.navigate("Home", {
        userName: this.state.userString, ip: IP, interval: data[0].interval
      });
      this.setState({ userString: "", passwordString: "", message: "" });
      this.userInput.current.clear();
      this.passwordInput.current.clear();
    } else {
      this.setState({
        message: "Usuario o contraseña incorrectos"
      });
    }
  };

  //When the ip InputText changes
  _onIpTextChanged = event => {
    this.setState({
      ip: event.nativeEvent.text
    });
  };

  //When the password InputText changes
  _onPasswordTextChanged = event => {
    this.setState({
      passwordString: event.nativeEvent.text
    });
  };

  //When the user InputText changes
  _onUserTextChanged = event => {
    this.setState({
      userString: event.nativeEvent.text
    });
  };

  //Render Function
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
            <TextInput
              underlineColorAndroid={"transparent"}
              style={styles.searchInput}
              placeholder="Dirección IP"
              placeholderTextColor="#666666"
              onChange={this._onIpTextChanged}
            />
            <View style={styles.buttonLogin}>
              <Button onPress={this._onLoginPressed} title="Login" />
            </View>
            {this.state.loadingSpinner}
            <Text style={styles.description}>{this.state.message}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
