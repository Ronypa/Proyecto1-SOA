import React from "react";
import {
  Modal,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/FontAwesome";

import update from "immutability-helper";

import styles from "./styles";
import doorImageClosed from "../../assets/icons/locked.png";
import doorImageOpened from "../../assets/icons/unlocked.png";
import messageImage from "../../assets/icons/message.png";
import cameraImage from "../../assets/icons/camera.png";

export default class HouseScreen extends React.Component {
  static navigationOptions = {
    title: "Smart Home"
  };

  //contructor and State variables
  constructor(props) {
    super(props);
    this.ip = this.props.navigation.state.params.ip;
    this.userName = this.props.navigation.state.params.userName;
    setInterval(this._requestMessages, this.props.navigation.state.params.interval*1000);
    this._requestDoorsState();
    this.state = {
      modalVisible: false,
      modalLoading: false,
      userLockIconColor: "#aaaaaa",
      imageTook: "",
      newMessageWarning: false,
      GridListItems: [
        {
          key: null,
          styleImag: styles.imageDoor,
          text: "Puerta principal",
          Function: this._onPressDoorFront,
          styleTouchItem: styles.TouchableButton
        },
        {
          key: null,
          styleImag: styles.imageDoor,
          text: "Puerta baño",
          Function: this._onPressDoorBath,
          styleTouchItem: styles.TouchableButton2
        },
        {
          key: cameraImage,
          styleImag: styles.imageCamera,
          text: "camera",
          Function: this._onPressCamera,
          styleTouchItem: styles.TouchableButton2
        },
        {
          key: messageImage,
          styleImag: styles.imageMessage,
          text: "message",
          Function: this._onPressMessage,
          styleTouchItem: styles.TouchableButton
        }
      ]
    };
  }

  //request if there are messages of movement detectec
  _requestMessages = async () => {
    var data;
    console.log(this.ip);
    try {
      const response = await fetch(this.ip + "/api/v1/house/intruder");
      data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    if (data.state == 1) {
      this.setState({
        newMessageWarning: (
          <Icon2
            name="warning"
            color="#fe440c"
            size={40}
            style={{ position: "absolute" }}
          />
        )
      });
    }
  };

  //method called by the button of "close" in the modal of the image
  _closeModal = () => {
    this.setState({
      modalVisible: false,
      modalLoading: false,
      imageTook: ""
    });
  };

  //when the camera button es pressed
  _onPressCamera = async () => {
    var data;
    this.setState({ modalLoading: true });
    try {
      const response = await fetch(this.ip + "/api/v1/house/camera");
      data = await response.json();
      console.log(data);
    } catch (error) {
      Alert.alert("No fue posible obtener la fotografía debido a: " + error);
      this.setState({ modalLoading: false });
      return -1;
    }
    this.setState({ modalLoading: false });
    this.setState({ imageTook: data.image });
    this.setState({ modalVisible: true });
  };

  //when the bath door button es pressed
  _onPressDoorBath = async () => {
    this.setState({ modalLoading: true });
    var stateDoor = this.state.GridListItems[1].key == doorImageClosed ? 1 : 0;
    //send request
    if ((await this._resquestChangeDoorState("bath", stateDoor)) != 200) {
      this.setState({ modalLoading: false });
      return;
    }
    this.setState({ modalLoading: false });
    if (this.state.GridListItems[1].key == doorImageClosed) {
      //chage Icon to close/open
      this.setState({
        GridListItems: update(this.state.GridListItems, {
          1: { key: { $set: doorImageOpened } }
        })
      });
    } else {
      this.setState({
        GridListItems: update(this.state.GridListItems, {
          1: { key: { $set: doorImageClosed } }
        })
      });
    }
  };

  //when the front door button es pressed
  _onPressDoorFront = async () => {
    this.setState({ modalLoading: true });
    var stateDoor = this.state.GridListItems[0].key == doorImageClosed ? 1 : 0;
    if ((await this._resquestChangeDoorState("front", stateDoor)) != 200) {
      //send request
      this.setState({ modalLoading: false });
      return;
    }
    this.setState({ modalLoading: false });
    if (this.state.GridListItems[0].key == doorImageClosed) {
      //chage Icon to close/open
      this.setState({
        GridListItems: update(this.state.GridListItems, {
          0: { key: { $set: doorImageOpened } }
        })
      });
    } else {
      this.setState({
        GridListItems: update(this.state.GridListItems, {
          0: { key: { $set: doorImageClosed } }
        })
      });
    }
  };

  //request to the server lock the state of a especific door
  _onPressLockDoor = async () => {
    this.setState({ modalLoading: true });
    var state = this.state.GridListItems[1].key == doorImageClosed ? 0 : 1
    const response = await fetch(this.ip + "/api/v1/house/doorLock", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "bath",
        state: state,
        lockedBy: this.userName,
        locked: true
      })
    }).catch(error => {
      this.setState({ modalLoading: false });
      Alert.alert("Ocurrió el siguiente error en la operación: " + error);
      return -1;
    });
    console.log(response)
    this.setState({ modalLoading: false });
    this.setState({userLockIconColor:"#a50000"})
  };

  //when the message button es pressed
  _onPressMessage = () => {
    if (this.state.newMessageWarning != false) {
      this.setState({ newMessageWarning: false });
      Alert.alert(
        "Mensaje nuevo",
        "Se ha detectado movimiento. ¿Desea tomar una fotografía?",
        [
          {
            text: "No",
            style: "cancel"
          },
          { text: "Sí", onPress: this._onPressCamera }
        ],
        { cancelable: false }
      );
    }
  };

  //request to the server update the state of a especific door
  _resquestChangeDoorState = async (_id, _state) => {
    const response = await fetch(this.ip + "/api/v1/house/door", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: _id,
        state: _state,
        username: this.userName,
        locked: false
      })
    }).catch(error => {
      Alert.alert("Ocurrió el siguiente error en la operación: " + error);
      return -1;
    });
    await console.log(response.status);
    return response.status;
  };

  //methos to get the current state of the door
  _requestDoorsState = async () => {
    var data;
    this.setState({ modalLoading: true });
    try {
      const response = await fetch(this.ip + "/api/v1/house/door");
      data = await response.json();
    } catch (error) {
      Alert.alert(
        "No fue posible obtener el estado de las puertas debido a: " + error
      );
      this.setState({ modalLoading: false });
      return -1;
    }
    var GridViewTmp = this.state.GridListItems, lockedColor;
    for (var i = 0; i < data.length; i++) {
      GridViewTmp[i].key =
        data[i].state == 1 ? doorImageOpened : doorImageClosed;
      if( data[i].id=="bath"){
        console.log(data)
        lockedColor = data[i].locked == false ? "#aaaaaa" : "#a50000"
      }
      this.setState({
        GridListItems: GridViewTmp
      });
    }
    this.setState({ modalLoading: false, userLockIconColor: lockedColor });
  };

  //if is necesary put description under the Icon - Only for doors
  _showTextDoors = element => {
    if (element == "Puerta principal" || element == "Puerta baño") {
      return <Text style={styles.textUnderLocksIcons}>{element}</Text>;
    } else {
      return null;
    }
  };

  //if is necesary put icon lock over Icon - Only for bath door
  _showUserLockIcon = element => {
    if (element == "Puerta baño") {
      return (
        <TouchableOpacity
          onPress={this._onPressLockDoor}
          style={styles.buttonLock}
        >
          <Icon
            name="user-lock"
            size={20}
            color={this.state.userLockIconColor}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  //if is necesarry put an icon (warning) over the actual icon - Only for message icon
  _setWarningImage = element => {
    if (element == "message") {
      return this.state.newMessageWarning;
    } else {
      return null;
    }
  };

  //method called to render the items of the FlatList (GridView)
  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.GridViewContainer}>
        {this._showUserLockIcon(item.text)}
        <TouchableOpacity onPress={item.Function} style={item.styleTouchItem} disabled = {true}>
          <Image source={item.key} style={item.styleImag} />
          {this._setWarningImage(item.text)}
          {this._showTextDoors(item.text)}
        </TouchableOpacity>
      </View>
    );
  };

  //Render method
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
        {/* Modal for Image */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalElements}>
              <View style={styles.modalHeaderContainer}>
                <TouchableOpacity
                  onPress={this._closeModal}
                  style={styles.modalCloseButtonContainer}
                >
                  <Icon name="close" size={30} />
                </TouchableOpacity>
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitle}>Imagen Capturada</Text>
                </View>
              </View>
              <Image
                style={styles.modalImage}
                source={{ uri: this.state.imageTook }}
              />
            </View>
          </View>
        </Modal>
        {/* GridView with FlatList */}
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.GridListItems}
            extraData={this.state}
            renderItem={this._renderItem}
            numColumns={2}
          />
        </View>
      </View>
    );
  }
}
