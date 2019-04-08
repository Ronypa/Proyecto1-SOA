import React from "react";
import {
  Modal,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
import doorImageClosed from "../../assets/icons/locked.png";
import doorImageOpened from "../../assets/icons/unlocked.png";
import messageImage from "../../assets/icons/message.png";
import cameraImage from "../../assets/icons/camera.png";

export default class HouseScreen extends React.Component {
  static navigationOptions = {
    title: "Smart Home"
  };

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      uri: require("../../assets/icons/camera.png"),

      styleContainerGridItems: styles.GridViewContainer,
      GridListItems: [
        {
          key: doorImageClosed,
          styleImag: styles.imageDoor,
          text: "Puerta principal"
        },
        {
          key: doorImageOpened,
          styleImag: styles.imageDoor,
          text: "Puerta baño"
        },
        { key: cameraImage, styleImag: styles.imageCamera, text: "camera" },
        { key: messageImage, styleImag: styles.imageMessage, text: "message" }
      ]
    };
  }

  _closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  _executeQuery = async query => {
    try {
      console.log(3);
      const response = await fetch(query);
      const json = await response.json();
      Alert.alert(JSON.stringify(json));
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  _onPressFunctions = itemPressed => {
    //if(doorPressed == "Front"){
    if (itemPressed == "Puerta principal") {
      var GridListItemsTmp = this.state.GridListItems;

      if (this.state.GridListItems[0].key == doorImageClosed) {
        GridListItemsTmp[0].key = doorImageOpened;
      } else {
        GridListItemsTmp[0].key = doorImageClosed;
      }
      this.setState({ GridListItems: GridListItemsTmp });
    } else if (itemPressed == "Puerta baño") {
      var GridListItemsTmp = this.state.GridListItems;

      if (this.state.GridListItems[1].key == doorImageClosed) {
        GridListItemsTmp[1].key = doorImageOpened;
      } else {
        GridListItemsTmp[1].key = doorImageClosed;
      }
      this.setState({ GridListItems: GridListItemsTmp });
    } else {
      this.setState({ modalVisible: true });
    }
    //}
  };

  _showTextDoors = element => {
    if (element == "Puerta baño" || element == "Puerta principal") {
      return <Text style={styles.textUnderLocksIcons}>{element}</Text>;
    } else {
      return null;
    }
  };

  _renderItem = ({ item, index }) => {
    var styleGridItems;
    if (index == 0 || index == 3) {
      styleGridItems = styles.GridViewContainer;
    } else {
      styleGridItems = styles.GridViewContainer2;
    }
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this._onPressFunctions(item.text);
          }}
          style={styleGridItems}
        >
          <Image source={item.key} style={item.styleImag} />
          {this._showTextDoors(item.text)}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this._closeModal}
        >
          <View style={styles.cointainerModal}>
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
              <Image style={styles.modalImage} source={doorImageOpened} />
            </View>
          </View>
        </Modal>

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
