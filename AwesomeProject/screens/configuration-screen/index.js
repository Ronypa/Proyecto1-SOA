import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Modal,
  Alert
} from "react-native";
import Spinner from "react-native-number-spinner";

import styles from "./styles";

export default class Configuration extends React.Component {
  static navigationOptions = {
    title: "Configuración"
  };

  //constructur and State variables
  constructor(props) {
    super(props);
    this.userName = this.props.navigation.state.params.userName;
    this.state = {
      userString: "",
      userStringConfirm: "",
      passwordString: "",
      newPasswordString: "",
      modalLoading: false,
      message: "",
      interval: "",
      ip: this.props.navigation.state.params.ip
    };
    this.passwordInput = React.createRef();
    this.newPasswordInput = React.createRef();
    this.intervalInput = React.createRef();
  }

  //method to change interval of request messages status
  _onChangeItervalPressed = async () => {
    this.setState({ modalLoading: true });
    const response = await fetch(this.state.ip + "/api/v1/user/interval", {
      //send the request
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.userName,
        interval: parseInt(this.state.interval)
      })
    }).catch(error => {
      Alert.alert("Ocurrió el siguiente error en la operación: " + error);
      this.setState({ modalLoading: false });
      return -1;
    });
    this.setState({ modalLoading: false });
    console.log(response)
    if (response.status != 200) {
      //is something went wrong
      return;
    }
    this.intervalInput.current.clear();
    this.setState({interval:""})
    Alert.alert(
      "Solicitud realizada con éxito. Los cambios se aplicarán en el siguiente inicio de sesión"
    );
  };

  //method to send the requests
  _onChangePasswordPressed = async () => {
    this.setState({ modalLoading: true });
    const response = await fetch(this.state.ip + "/api/v1/user/password", {
      //send the request
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.userName,
        password: this.state.passwordString,
        newPassword: this.state.newPasswordString
      })
    }).catch(error => {
      Alert.alert("Ocurrió el siguiente error en la operación: " + error);
      this.setState({ modalLoading: false });
      return -1;
    });
    this.setState({ modalLoading: false });
    var data = await response.json();
    if (data.message == "Old password incorrect") {
      //if current password wrong
      Alert.alert("Contraseña actual incorrecta");
      return;
    } else if (response.status != 200) {
      //is something went wrong
      return;
    }
    this.newPasswordInput.current.clear();
    this.passwordInput.current.clear();
    this.setState({passwordString:"",newPasswordString:""})
    Alert.alert("Contraseña cambiada con éxito");
  };

  //when the interval input changes
  _onIntervalTextChanged = event => {
    var interval =
      parseInt(parseInt(event.nativeEvent.text)) >= 30 ||
      parseInt(parseInt(event.nativeEvent.text)) <= 3600
        ? event.nativeEvent.text
        : this.state.interval;
    console.log(interval)
    this.setState({ interval: interval });
  };

  //When the new password InputText changes
  _onNewPasswordTextChanged = event => {
    this.setState({
      newPasswordString: event.nativeEvent.text
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
      <View style={styles.container}>
        {/* Modal for Loading Spinner */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalLoading}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalLoadingContainer}>
              <ActivityIndicator size={80} color="#0000ff" />
            </View>
          </View>
        </Modal>
        {/* Change Password Inputs */}
        <View style={styles.flowRight}>
          <Text style={styles.tittles}>Cambiar contraseña</Text>
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.searchInput}
            placeholder="Contraseña actual"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            onChange={this._onPasswordTextChanged}
            ref={this.passwordInput}
          />
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.searchInput}
            placeholder="Contraseña nueva"
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            onChange={this._onNewPasswordTextChanged}
            ref={this.newPasswordInput}
          />
          <View style={styles.buttonsContainer}>
            <Button
              disabled={
                this.state.passwordString == "" ||
                this.state.newPasswordString == ""
              }
              onPress={this._onChangePasswordPressed}
              title="Cambiar contraseña"
            />
          </View>
        </View>
        {/* Change interval  */}
        <View style={styles.flowRight}>
          <Text style={styles.tittles}>
            Cambiar intervalo (segundos) de solicitud de mensajes de seguridad
          </Text>
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.searchInput}
            placeholder="Mínimo: 30. Máximo: 3600"
            placeholderTextColor="#aaaaaa"
            keyboardType="numeric"
            onChange={this._onIntervalTextChanged}
            value = {this.state.interval}
            ref={this.intervalInput}
          />
          <View style={styles.buttonsContainer}>
            <Button
              onPress={this._onChangeItervalPressed}
              disabled = {this.state.interval == ""}
              title="Cambiar intervalo"
            />
          </View>
        </View>
      </View>
    );
  }
}
